const express = require('express');
const Transaction = require('../models/transactionModel');
const axios = require('axios');
const router = express.Router();

// API to initialize database
router.get('/initialize', async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        const data = response.data;

        // Clear existing data
        await Transaction.deleteMany({});
        // Insert new data
        await Transaction.insertMany(data);

        res.json({ message: 'Database initialized with data from the external API' });
    } catch (error) {
        console.error('Error initializing database:', error);
        res.status(500).json({ error: 'Failed to initialize database' });
    }
});

// API to get all transactions
router.get('/', async (req, res) => {
    try {
        const transactions = await Transaction.find({});
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

module.exports = router;
