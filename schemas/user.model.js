const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    discord_id: {
        type: String,
        required: true,
        unique: true
    },
    currency_balance: {
        type: Number,
        default: 0
    },
    bank_account: {
        account_number: {
            type: Number,
            unique: true
        },
        balance: {
            type: Number,
            default: 0
        },
        loans: [
            {
                loan_id: {
                    type: Number,
                    unique: true
                },
                amount: Number,
                interest_rate: Number,
                term_length: Number,
                term_remaining: Number
            }
        ]
    },
    job: {
        job_name: {
            type: String,
            default: null
        },
        salary: {
            type: Number,
            default: 0
        }
    },
    assets: [
        {
            asset_name: String,
            quantity: Number
        }
    ]
});

module.exports = mongoose.model('User', UserSchema);
