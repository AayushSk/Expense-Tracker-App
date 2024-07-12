const mongoose = require('mongoose');

// schema design
const transactionSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: [true, "amount is required"],
    },
    type: {
        type: String,
        required: [true, "type is required"],
    },
    category: {
        type: String,
        required: [true, "category is required"],
    },
    reference: {
        type: String,
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    date: {
        type: Date,
        required: [true, "date is required"],
    }
}, {timestamps: true})

// export
const transactionModel = mongoose.model('transactions', transactionSchema);
module.exports = transactionModel