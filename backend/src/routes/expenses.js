const router = require('express').Router();
const { createExpense, getExpenses, deleteExpense } = require('../controllers/expensesController');

router.post('/', createExpense);
router.get('/', getExpenses);
router.delete('/:id', deleteExpense);

module.exports = router;


