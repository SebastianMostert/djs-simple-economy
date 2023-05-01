const User = require('../schemas/user.model');

/**
* Transfer funds from one user's bank account to another.
*
* @param {string} senderId - The ID of the sender.
* @param {string} recipientId - The ID of the recipient.
* @param {number} amount - The amount to transfer.
*
* @throws {Error} If either the sender or recipient does not have a bank account, or if the sender does not have enough funds to complete the transfer.
*
* @returns {Promise<Object>} An object containing the updated balances of the sender and recipient.
*/
async function transfer(senderId, recipientId, amount) {
    // Fetch sender and recipient from the database
    const [sender, recipient] = await Promise.all([
        User.findById(senderId).populate('bank_account'),
        User.findById(recipientId).populate('bank_account'),
    ]);

    // Throw an error if either the sender or recipient does not have a bank account
    if (!sender.bank_account) {
        throw new Error('Sender does not have a bank account.');
    }
    if (!recipient.bank_account) {
        throw new Error('Recipient does not have a bank account.');
    }

    // Calculate the new balances
    const senderBalance = sender.bank_account.balance - amount;
    const recipientBalance = recipient.bank_account.balance + amount;

    // Throw an error if the sender does not have enough funds to complete the transfer
    if (senderBalance < 0) {
        throw new Error('Insufficient funds.');
    }

    // Update the sender and recipient balances in the database
    sender.bank_account.balance = senderBalance;
    recipient.bank_account.balance = recipientBalance;
    await Promise.all([sender.bank_account.save(), recipient.bank_account.save()]);

    // Return the updated balances
    return { senderBalance, recipientBalance };
}

module.exports = { transfer }