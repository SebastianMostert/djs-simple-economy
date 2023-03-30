const mongoose = require('mongoose');

const reqString = {
    type: String,
    required: true,
};

const reqNum = {
    type: Number,
    default: 0,
    required: true,
};
module.exports = mongoose.model(
    'DJS-Simple-Economy-bankSchema',
    new mongoose.Schema({
        guildID: reqString, // This is used as a bankID
        bankName: reqString, // The name of the bank

        balance: reqNum, // The total amount of money this BANK owns

        stocks: [
            {
                stockName: reqString, // The name of the stock
                stockID: reqString, // The ID of the stock

                purchasingPrice: reqString, // The price per unit at the time of purchase
                amount: reqNum, // The amount of stocks puchased
            },
        ], // The stocks this BANK owns

        creditScore: reqNum, // This is used to see how easy it is for this BANK to borrow money FROM a different BANK
        interestRate: reqNum, // The interest USERS have to pay this BANK in order to BORROW money and the amount this BANK PAYS the USER for DEPOSITING in the BANK

        debt: { type: Array }, // An array of all the debt ID's

        // TODO We need to keep track of all the users who have made a deposit to the bank.
    }),
);

/**
 * The Bank is registered in one server, this can be seen as a country so to say
 * The Bank can FOR NOW only lend money to users of the same country
 * The Bank can only store money from users of the same country
 * The Bank can buy stocks from different companies
 * The Bank can NOT borrow money from other banks yet
 * The Bank will gather a credit score, this shows other banks how well a bank is at paying their debt off in time
 * 
 * If the Bank isn't able to pay off their debts, it goes bankrupt
 * What happens after a bank goes bankrupt?
 * Users will receive a maximum of 250.000 coins back
 * The Bank will be bought by either a different bank, or the central bank, this system is not ready at all
 */