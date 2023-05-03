const bankAccountManager = require('./managers/bankAccountManager')
const transferManager = require('./managers/transferManager')
const userAccountManager = require('./managers/userAccountManager')
const bankManager = require('./managers/bankManager')


module.exports.EconomySystem = {
    bankAccountManager,
    transferManager,
    userAccountManager,
    bankManager,
}