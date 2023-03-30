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
    'DJS-Simple-Economy-guildSchema',
    new mongoose.Schema({
        guildID: reqString, // The ID of the SERVER

        wallet: reqNum, // The amount of money the SERVER has on them
        banks: [
            {
                bankID: reqString, // The id of the bank
                amount: reqNum, // The amount of money the person has deposited in this bank
            }
        ], // The list of banks in which the SERVER has money deposited

        stocks: [
            {
                stockName: reqString, // The name of the stock
                stockID: reqString, // The ID of the stock

                purchasingPrice: reqString, // The price per unit at the time of purchase
                amount: reqNum, // The amount of stocks puchased
            },
        ], // The stocks this SERVER owns

        creditScore: reqNum, // This is used to see how easy it is for this SERVER to borow money FROM a different BANK

        debt: { type: Array }, // An array of all the debt ID's

        taxPercentage: reqNum, // The amount of taxes users have to pay 
        // This still needs work
        // Do Users pay on profit?
        // On total amount of money?
    }),
);

/**
 * The SERVER can be seen as a country so to say
 * The SERVER can FOR NOW deposit their coins only in their own bank.
 * The SERVER can FOR NOW only borow money from their own banks.
 * The SERVER can buy stocks from different companies
 * The SERVER will gather a credit score, this shows banks how well a SERVER is at paying their debt off in time
 * The SERVER has a tax percentage, this is used to gather money
 */