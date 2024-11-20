const TransactionDetails = require('../models/transactionDetails');
const mongoose = require('mongoose')

module.exports = {
    getTransactions: async (req, res) => {
        try {
            const { user_id } = req.query;
            const { id } = req.params;

            if (id && !mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid transaction ID" });
            }

            if (user_id && !mongoose.Types.ObjectId.isValid(user_id)) {
                return res.status(400).json({ message: "Invalid user ID" });
            }

            if (!id && !user_id) {
                return res.status(400).json({ message: "Invalid request. Provide either a transaction ID or a user ID." });
            }

            if (id) {
                const transaction = await TransactionDetails.findOne({ _id: id });
                console.log(transaction)
                if (!transaction) {
                    return res.status(404).json({ message: "Transaction not found" });
                }

                return res.status(200).json({
                    transaction_id: transaction._id,
                    amount: transaction.amount,
                    transaction_type: transaction.transaction_type,
                    status: transaction.status,
                    user: transaction.user_id,
                    timestamp: transaction.time_stamp,
                });
            }

            if (user_id) {
                const transactions = await TransactionDetails.find({ user_id });
                if (!transactions || transactions.length === 0) {
                    return res.status(404).json({ message: "No transactions found for the user" });
                }

                const formattedTransactions = transactions.map((transaction) => ({
                    transaction_id: transaction._id,
                    amount: transaction.amount,
                    transaction_type: transaction.transaction_type,
                    status: transaction.status,
                    user: transaction.user_id,
                    timestamp: transaction.time_stamp,
                }));

                return res.status(200).json(formattedTransactions);
            }
        } catch (err) {
            return res.status(500).json({ message: "Error Occurred", error: err.message });
        }
    },

    addTransaction: async (req, res) => {
        try {
            const { amount, transaction_type, user_id } = req.body;

            if (!amount || !transaction_type || !user_id ) {
                return res.status(400).json({ message: "All fields (amount, transaction_type, user_id, status) are required." });
            }

            if (!["DEPOSIT", "WITHDRAWAL"].includes(transaction_type)) {
                return res.status(400).json({ message: "Invalid transaction_type. Allowed values: DEPOSIT, WITHDRAWAL." });
            }

            const responseData = await TransactionDetails.create(req.body)
 

            return res.status(201).json({
                transaction_id: responseData._id,
                amount: responseData.amount,
                transaction_type: responseData.transaction_type,
                status: responseData.status,
                user: responseData.user_id,
                timestamp: responseData.time_stamp,
            });
        } catch (err) {
            return res.status(500).json({ message: "Error Occurred", error: err.message });
        }
    },

    updateTransaction: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            if (id && !mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid transaction ID" });
            }

            if (!id) {
                return res.status(400).json({ message: "Transaction ID is required." });
            }

            if (!status) {
                return res.status(400).json({ message: "Status is required." });
            }

            if (!["PENDING", "COMPLETED", "FAILED"].includes(status)) {
                return res.status(400).json({ message: "Invalid status. Allowed values: PENDING, COMPLETED, FAILED." });
            }

            const transaction = await TransactionDetails.findOneAndUpdate(
                { _id: id },
                { status: status },
                { new: true }
            );

            if (!transaction) {
                return res.status(404).json({ message: "Transaction not found." });
            }

            return res.status(200).json({
                transaction_id: transaction._id,
                amount: transaction.amount,
                transaction_type: transaction.transaction_type,
                status: transaction.status,
                user: transaction.user_id,
                timestamp: transaction.time_stamp,
            });
        } catch (err) {
            return res.status(500).json({ message: "Error Occurred", error: err.message });
        }
    },
};
