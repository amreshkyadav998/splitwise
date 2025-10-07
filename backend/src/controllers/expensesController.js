const Expense = require('../models/Expense');

const { Types } = require('mongoose');

async function createExpense(req, res, next) {
  try {
    const { description, amount, paidBy, participants, date, paidByName, participantNames } = req.body;
    if (!description || amount == null) {
      return res.status(400).json({ message: 'description and amount are required' });
    }
    // Accept either user ids (Level 2) or names (Level 1)
    const doc = { description, amount, date };

    if (paidBy) {
      if (!Types.ObjectId.isValid(paidBy)) return res.status(400).json({ message: 'Invalid paidBy user id' });
      doc.paidBy = paidBy;
    }
    if (Array.isArray(participants)) {
      for (const id of participants) {
        if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: `Invalid participant id: ${id}` });
      }
      doc.participants = participants;
    }
    if (paidByName) doc.paidByName = paidByName;
    if (Array.isArray(participantNames)) doc.participantNames = participantNames;

    // Minimal requirement: must have either ids or names for payer and participants
    const hasIds = doc.paidBy && Array.isArray(doc.participants) && doc.participants.length > 0;
    const hasNames = doc.paidByName && Array.isArray(doc.participantNames) && doc.participantNames.length > 0;
    if (!hasIds && !hasNames) {
      return res.status(400).json({ message: 'Provide either user ids (paidBy, participants[]) or names (paidByName, participantNames[])' });
    }
    const expense = await Expense.create(doc);
    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
}

async function getExpenses(_req, res, next) {
  try {
    const expenses = await Expense.find()
      .populate('paidBy', 'name email')
      .populate('participants', 'name email')
      .sort({ createdAt: -1 });
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


