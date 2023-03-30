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
	'DJS-Simple-Economy-guildUserSchema',
	new mongoose.Schema({
		userID: reqString, // The ID of the user
		guildID: reqString, // The ID of the guild in which this user is registered

		wallet: reqNum, // The amount of money the person has on them
		banks: [
			{
				bankID: reqString, // The id of the bank
				amount: reqNum, // The amount of money the person has deposited in this bank
			}
		], // The list of banks in which the user has money deposited

		stocks: [
			{
				stockName: reqString, // The name of the stock
				stockID: reqString, // The ID of the stock

				purchasingPrice: reqString, // The price per unit at the time of purchase
				amount: reqNum, // The amount of stocks puchased
			},
		], // The stocks this USER owns

		creditScore: reqNum, // This is used to see how easy it is for this USER to borow money FROM a different BANK

		debt: { type: Array } // An array of all the debt ID's
	}),
);

/**
 * The user is registered in one server, this can be seen as a country so to say
 * The user can FOR NOW deposit their coins only in the bank of their country.
 * The user can FOR NOW only borow money from banks of their country.
 * The user can buy stocks from different companies
 * The user will gather a credit score, this shows banks how well a user is at paying their debt off in time
 */