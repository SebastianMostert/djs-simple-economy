const Bank = require('../schemas/bank.model');
const User = require('../schemas/user.model');

async function createUserAccount(userId, startingBalance) {
    try {
        // Create a new User object with the given user ID
        const newUser = new User({ _id: userId });

        // Create a new Bank object if it doesn't exist
        let bank = await Bank.findOne();
        if (!bank) {
            bank = new Bank();
        }

        // Check if the user already has an account in the bank
        const userAccount = bank.users.find((account) => account.user_id.equals(userId));
        if (userAccount) {
            throw new Error('User account already exists');
        }

        // Add the new user account to the bank
        bank.users.push({ user_id: newUser._id, account_balance: startingBalance });

        // Save the bank document to the database
        await bank.save();

        console.log(`Created user account for user ${userId} with starting balance ${startingBalance}`);

        // Return the new user account
        return { user_id: newUser._id, account_balance: startingBalance };
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

/**
 * Checks the balance of a specific user's wallet, creating an account for the user if one doesn't exist.
 * @param {string} userId - The ID of the user whose balance is being checked.
 * @returns {number} - The balance of the user's wallet.
 */
async function checkUserBalance(userId) {
    // Find the user in the database by their ID and retrieve their wallet
    let user = await User.findById(userId);

    // If the user doesn't exist, create a new user account
    if (!user) {
        user = await createUserAccount(userId, 0);
    }

    // Return the user's wallet balance
    return user.wallet.balance;
}

/**
 * Add or remove the specified amount from the user's balance
 * @param {string} userId The ID of the user to modify the balance for
 * @param {number} amount The amount to add or remove from the user's balance (negative amounts can be used to remove money)
 * @returns {Promise} A Promise that resolves with the updated User document
 */
async function addToBalance(userId, amount) {
    try {
        const user = await User.findOneAndUpdate(
            { userId: userId }, // Find the user with the specified ID
            { $inc: { balance: amount } }, // Increment the balance field by the specified amount
            { new: true } // Return the updated document
        );
        return user;
    } catch (error) {
        console.error(`Error adding ${amount} to user ${userId}'s balance: ${error}`);
        throw new Error('Could not add to balance');
    }
}

module.exports = {
    createUserAccount,
    checkUserBalance,
    addToBalance
}