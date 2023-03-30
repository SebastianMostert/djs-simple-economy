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
        debtID: reqString, // The ID of the debt
        userID: reqString, // The ID of the user who has to pay the debt

        bankID: reqString, // The id of the BANK this debt is owed too

        debtAmount: reqNum, // The amount of debt without interest
        interestAmount: reqNum, // The amount of interest to pay
        totalAmount: reqNum, // The total amount of the debt, this is initial debt + additional interest
        inerestPercent: reqNum, // The amount of interest this user has to pay to the other BANK in percent

        paidAmount: reqNum, // The amount that has been paid off
        remainingAmount: reqNum, // The amount that the user still has to pay

        dailyAmount: reqNum, // The amount the user pays every day

    }),
);