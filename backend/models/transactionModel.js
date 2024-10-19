const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    dateOfSale: String, // Using String for simplicity
    category: String,
});

module.exports = mongoose.model('Transaction', transactionSchema);
