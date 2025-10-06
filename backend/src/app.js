const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const expensesRouter = require('./routes/expenses');
const balancesRouter = require('./routes/balances');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/expenses', expensesRouter);
app.use('/api/balances', balancesRouter);

// Basic error handler
// Note: keep minimal for Level 1
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Server error' });
});

module.exports = app;


