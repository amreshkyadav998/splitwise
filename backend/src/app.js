const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const expensesRouter = require('./routes/expenses');
const balancesRouter = require('./routes/balances');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();

// ✅ CORS Configuration
const allowedOrigins = [
  'https://splitwise-f1e7.vercel.app',
  'http://localhost:5173', // optional for dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true });
});

app.use('/api/expenses', expensesRouter);
app.use('/api/balances', balancesRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

// Basic error handler
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const payload = { message: err.message || 'Server error' };
  if (process.env.NODE_ENV !== 'production') {
    payload.stack = err.stack;
  }
  res.status(status).json(payload);
});

module.exports = app;
