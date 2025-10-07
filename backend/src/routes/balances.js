const router = require('express').Router();
const Expense = require('../models/Expense');
const { calculateBalances } = require('../utils/balances');
const auth = require('../middleware/auth');

router.get('/', async (_req, res, next) => {
  try {
    const expenses = await Expense.find()
      .populate('paidBy', 'name email')
      .populate('participants', 'name email');
    const settlements = calculateBalances(expenses);
    res.json(settlements);
  } catch (err) {
    next(err);
  }
});

module.exports = router;


