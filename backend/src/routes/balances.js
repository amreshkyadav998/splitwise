const router = require('express').Router();
const Expense = require('../models/Expense');
const { calculateBalances } = require('../utils/balances');

router.get('/', async (_req, res, next) => {
  try {
    const expenses = await Expense.find();
    const settlements = calculateBalances(expenses);
    res.json(settlements);
  } catch (err) {
    next(err);
  }
});

module.exports = router;


