const express = require('express')
const { getTransactions, addTransaction, updateTransaction } = require('../controllers/transactionDetailsController')

const router = express.Router()

router
.get('/api/transactions',getTransactions)
.get('/api/transactions/:id',getTransactions)
.post('/api/transactions',addTransaction)
.put('/api/transactions/:id',updateTransaction)

module.exports = router