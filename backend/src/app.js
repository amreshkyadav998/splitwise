const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const expensesRouter = require('./routes/expenses');
const balancesRouter = require('./routes/balances');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/expenses', expensesRouter);
app.use('/api/balances', balancesRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// Basic error handler (include stack in development)
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const payload = { message: err.message || 'Server error' };
  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }
  res.status(status).json(payload);
});

module.exports = app;


