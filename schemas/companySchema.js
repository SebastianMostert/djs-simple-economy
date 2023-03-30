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
    'DJS-Simple-Economy-companySchema',
    new mongoose.Schema({
        companyName: reqString, // The name of this company
        companyID: reqString, // The ID of this company

        shareID: reqString, // The id of the share
    }),
);

/**
 * 
 */