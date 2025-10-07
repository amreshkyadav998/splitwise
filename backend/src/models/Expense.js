const { Schema, model, Types } = require('mongoose');

const expenseSchema = new Schema(
  {
    description: { type: String, required: true, trim: true },
    amount: { type: Number, required: true, min: 0 },
    paidBy: { type: Types.ObjectId, ref: 'User', required: false },
    participants: { type: [Types.ObjectId], ref: 'User', required: false },
    // For backward compatibility with Level 1, accept names if ids not provided
    paidByName: { type: String, trim: true },
    participantNames: { type: [String] },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = model('Expense', expenseSchema);


