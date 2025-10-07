const router = require('express').Router();
const { createExpense, getExpenses, deleteExpense } = require('../controllers/expensesController');
const auth = require('../middleware/auth');

router.post('/', auth, createExpense);
router.get('/', getExpenses);
router.delete('/:id', auth, deleteExpense);

module.exports = router;


