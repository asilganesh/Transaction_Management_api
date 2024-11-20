const mongoose = require('mongoose')

const transactionDetails = new mongoose.Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['PENDING', 'COMPLETED', 'FAILED'],
        default: 'PENDING',
        required: true
    },

    transaction_type: {
        type: String,
        enum: ['WITHDRAWAL', 'DEPOSIT'],
        required: true

    },

    time_stamp: {
        type: Date,
        default: Date.now,
    }

})

module.exports = mongoose.model("TransactionDetails", transactionDetails)