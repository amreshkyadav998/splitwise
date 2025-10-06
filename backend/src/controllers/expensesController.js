const Expense = require('../models/Expense');

async function createExpense(req, res, next) {
  try {
    const { description, amount, paidBy, participants, date } = req.body;
    if (!description || amount == null || !paidBy || !Array.isArray(participants) || participants.length === 0) {
      return res.status(400).json({ message: 'description, amount, paidBy, participants are required' });
    }
    const expense = await Expense.create({ description, amount, paidBy, participants, date });
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
}

async function getExpenses(_req, res, next) {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.json(expenses);
  } catch (err) {
    next(err);
  }
}

async function deleteExpense(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Expense not found' });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
}

module.exports = { createExpense, getExpenses, deleteExpense };


