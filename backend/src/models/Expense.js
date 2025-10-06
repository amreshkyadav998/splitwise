const { Schema, model } = require('mongoose');

const expenseSchema = new Schema(
  {
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    paidBy: { type: String, required: true, trim: true }, // Level 1: store name
    participants: { type: [String], required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model('Expense', expenseSchema);


