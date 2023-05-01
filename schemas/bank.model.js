const mongoose = require('mongoose');

// Sub-schema for transactions
const TransactionSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Sub-schema for loans
const LoanSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    interest_rate: {
        type: Number,
        required: true
    },
    term_length: {
        type: Number,
        required: true
    },
    term_remaining: {
        type: Number,
        required: true
    }
});

// Main schema for the bank
const BankSchema = new mongoose.Schema({
    // Counter for generating unique account numbers
    account_number_counter: {
        type: Number,
        default: 1
    },
    // Array of user documents
    users: [
        {
            // Reference to the user's document in the Users collection
            user_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                unique: true
            },
            // Unique account number for the user
            account_number: {
                type: Number,
                unique: true
            },
            // Current account balance
            account_balance: {
                type: Number,
                default: 0
            },
            // Array of transaction documents for the user
            transactions: [TransactionSchema],
            // Array of loan documents for the user
            loans: [LoanSchema],
            // Array of tax history objects for the user
            tax_history: [
                {
                    // Year the taxes were paid
                    year: {
                        type: Number,
                        required: true
                    },
                    // Amount of taxes paid
                    amount: {
                        type: Number,
                        default: 0
                    }
                }
            ]
        }
    ]
});

module.exports = mongoose.model('Bank', BankSchema);
