const Bank = require('../schemas/bank.model');
const User = require('../schemas/user.model');
const { createUserAccount } = require('./userAccountManager');

/**
 * Deposits a specified amount of money from a user's wallet to their bank account.
 * @param {string} userId - The ID of the user performing the deposit.
 * @param {number} amount - The amount of money to deposit.
 * @returns {object} - An object with the updated user object and the updated bank object.
 */
async function depositToBankAccount(userId, amount) {
    // Find the user in the database by their ID
    let user = await User.findById(userId);

    // Throw an error if the user doesn't exist
    if (!user) {
        user = await createUserAccount(userId, 0);
    }

    // Check if the user has enough money in their wallet to make the deposit
    if (user.wallet.balance < amount) {
        throw new Error(`User with ID ${userId} does not have enough funds to make the deposit`);
    }

    // Subtract the amount from the user's wallet and add it to their bank account
    user.wallet.balance -= amount;
    user.bank.balance += amount;

    // Save the updated user object in the database
    user = await user.save();

    // Return an object with the updated user object and the updated bank object
    return {
        user,
        bank: user.bank
    };
}

/**
 * Withdraws the specified amount from the user's bank account and adds it to their balance.
 * Throws an error if the user does not exist, does not have a bank account, or does not have enough funds in their bank account.
 * 
 * @param {string} userId - The ID of the user to withdraw from
 * @param {number} amount - The amount to withdraw
 * @returns {Promise<number>} - The user's updated balance
 */
async function withdrawFromBankAccount(userId, amount) {
    const user = await User.findById(userId);
    if (!user) {
        user = await createUserAccount(userId, 0);
    }
    if (!user.bank_account) {
        throw new Error('User does not have a bank account');
    }
    if (user.bank_account.balance < amount) {
        throw new Error('Insufficient funds in bank account');
    }

    // Subtract the amount from the user's bank account
    user.bank_account.balance -= amount;

    // Add the amount to the user's balance
    user.balance += amount;

    // Save the changes to the user document in the database
    await user.save();

    return user.balance;
}

async function getAccountBalance(userId) {
    try {
        // Find the bank document and the user account
        const bank = await Bank.findOne();
        const userAccount = bank.users.find((account) => account.user_id.equals(userId));

        // If the user doesn't have an account, create one with a starting balance of 0
        if (!userAccount) {
            await createUserAccount(userId, 0);
        }

        // Fetch the user's account balance from the bank document
        const accountBalance = bank.users.find((account) => account.user_id.equals(userId)).account_balance;

        return accountBalance;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
}

module.exports = {
    depositToBankAccount,
    withdrawFromBankAccount,
    getAccountBalance
}