const guildUserSchema = require("../schemas/guildUserSchema");

/**
 * @param {object} options The options object
 * @param {string} options.userID The user ID
 * @param {string} options.guildID The guild ID
 */
async function guildUserProfileCreate(options = {}) {
    const { guildID, userID } = options;
    const res = await guildUserProfileExists(options);

    if (res.exists) data = res.data;
    else data = await guildUserSchema.create({ userID, guildID });

    return data;
}

/**
 * @param {object} options The options object
 * @param {string} options.userID The user ID
 * @param {string} options.guildID The guild ID
 */
async function guildUserProfileExists(options = {}) {
    const { guildID, userID } = options;

    let data = await guildUserSchema.findOne({
        userID,
        guildID
    });

    if (!data) return { exists: false, data: [] };
    return { exists: true, data };
}

/**
 * @param {object} options The options object
 * @param {string} options.userID The user ID
 * @param {string} options.guildID The guild ID
 * @param {number} options.amount The amount of coins to add
 */
async function guildUserProfileUpdateWallet(options = {}) {
    const { guildID, userID, amount } = options;
    await guildUserProfileCreate()

    await guildUserSchema.findOneAndUpdate(
        {
            userID,
            guildID
        },
        {
            userID,
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
 * @param {number} options.amount The amount of coins to add
 */
async function guildUserProfileUpdateBank(options = {}) {
    const { guildID, userID, amount } = options;
    await guildUserProfileCreate()

    /* FIXME This will not work for the new Bank system
     * It now uses multiple banks, so we need to update the system
    */
    await guildUserSchema.findOneAndUpdate(
        {
            userID,
            guildID
        },
        {
            userID,
            guildID,

            $inc: {
                bank: amount,
            }
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

    return await guildUserProfileCreate();
}

/**
 * @param {object} options The options object
 * @param {string} options.userID The user ID
 * @param {string} options.guildID The guild ID
 */
async function guildUserProfileDelete(options = {}) {
    const { guildID, userID } = options;
    await guildUserProfileCreate()

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
    await guildUserProfileCreate()

    const arrData = await guildUserSchema.find(
        {
            guildID: guildID,
        }
    );

    for (let i = 0; i < arrData.length; i++) {
        const element = arrData[i];
        await element.deleteOne();
    }
}

// TODO Add support for the stocks
// TODO Add support for loans

module.exports = {
    guildUserProfileCreate,
    guildUserProfileExists,

    guildUserProfileUpdateWallet,
    guildUserProfileUpdateBank,

    guildUserProfileFetch,

    guildUserProfileDelete,
    guildUserProfileDeleteAll,
}