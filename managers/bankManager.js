const bankSchema = require("../schemas/bankSchema");

/**
 * @param {object} options The options object
 * @param {string} options.bankName The name of the bank
 * @param {string} options.guildID The guild ID
 * 
 * @returns Data
 */
async function bankCreate(options = {}) {
    const res = await bankExists(options);

    if (res.exists) return res.data;
    else return await bankSchema.create(options);
}

/**
 * @param {object} options The options object
 * @param {string} options.bankName The name of the bank
 * @param {string} options.guildID The guild ID
 */
async function bankExists(options = {}) {
    const { guildID, bankName } = options;

    let data = await bankSchema.findOne({
        bankName,
        guildID
    });

    if (!data) return { exists: false, data: [] };
    return { exists: true, data };
}

/**
 * @param {object} options The options object
 * @param {string} options.bankName The name of the bank
 * @param {string} options.guildID The guild ID
 * @param {number} options.amount The amount of coins to add
 */
async function bankUpdateBalance(options = {}) {
    const { guildID, bankName, amount } = options;
    await bankCreate({ guildID, bankName })

    await bankSchema.findOneAndUpdate(
        {
            bankName,
            guildID
        },
        {
            bankName,
            guildID,

            $inc: {
                wallet: amount,
            }
        }
    );
}

/**
 * @param {object} options The options object
 * @param {string} options.userID The user ID
 * @param {string} options.guildID The guild ID
 * @param {string} options.bankID The bank ID
 * @param {number} options.amount The amount of coins to add
 */
async function guildUserProfileUpdateBank(options = {}) {
    const { guildID, userID, amount, bankID } = options;
    const guildUserData = await guildUserProfileCreate({ guildID, userID })

    const updated = false;
    const banks = guildUserData.banks;
    const newBanks = [];

    // First check if the user already has a deposit in this bank
    for (let i = 0; i < banks.length; i++) {
        const element = banks[i];
        if (element.bankID == bankID) {
            newBanks.push({ bankID: element.bankID, amount: element.amount + amount })
            updated = true;
            continue;
        }
        newBanks.push(element)
    }

    if (!updated) newBanks.push({ bankID: bankID, amount: amount, })

    await guildUserSchema.findOneAndUpdate(
        {
            userID,
            guildID
        },
        {
            userID,
            guildID,

            banks: newBanks,
        }
    );
}

/**
 * @param {object} options The options object
 * @param {string} options.userID The user ID
 * @param {string} options.guildID The guild ID
 */
async function guildUserProfileFetch(options = {}) {
    const { guildID, userID } = options;

    return await guildUserProfileCreate({ guildID, userID });
}

/**
 * @param {object} options The options object
 * @param {string} options.userID The user ID
 * @param {string} options.guildID The guild ID
 */
async function guildUserProfileDelete(options = {}) {
    const { guildID, userID } = options;
    await guildUserProfileCreate({ guildID, userID })

    await guildUserSchema.findOneAndDelete(
        {
            guildID: guildID,
            userID: userID
        }
    );
}

/**
 * @param {object} options The options object
 * @param {string} options.guildID The guild ID
 */
async function guildUserProfileDeleteAll(options = {}) {
    const { guildID } = options;

    await guildUserSchema.deleteMany(
        {
            guildID: guildID,
        }
    );
}

module.exports = {
    guildUserProfileUpdateBank,

    guildUserProfileFetch,

    guildUserProfileDelete,
    guildUserProfileDeleteAll,

    bankUpdateBalance
}