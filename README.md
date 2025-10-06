# Splitwise Clone (MERN + Tailwind)

A level-wise assessment implementation of an expense sharing app.

## Tech Stack
- Backend: Node.js, Express.js, MongoDB, Mongoose, dotenv, cors, morgan
- Frontend: React (Vite), React Router, Axios, Tailwind CSS

## Monorepo Structure
```
.
├─ backend/
│  ├─ src/
│  │  ├─ models/Expense.js
│  │  ├─ controllers/expensesController.js
│  │  ├─ routes/{expenses.js, balances.js}
│  │  ├─ utils/balances.js
│  │  ├─ app.js, server.js
│  ├─ .env.example
│  ├─ package.json
├─ frontend/
│  ├─ src/
│  │  ├─ pages/{Home.jsx, AddExpense.jsx, Balances.jsx}
│  │  ├─ components/Layout.jsx
│  │  ├─ lib/api.js
│  │  ├─ App.jsx, main.jsx, index.css
│  ├─ index.html, vite.config.js, tailwind.config.js, postcss.config.js
│  ├─ .env.example
├─ .gitignore
└─ README.md
```

## Setup
1. Prerequisites: Node 18+, npm, MongoDB running locally
2. Backend
   - Copy `backend/.env.example` to `backend/.env` and adjust values
   - Install deps (already installed if using this repo):
     ```bash
     cd backend
     npm i
     npm run dev
     ```
   - API runs on `http://localhost:5000`
3. Frontend
   - Copy `frontend/.env.example` to `frontend/.env` if needed to change API base
   - Install deps and run:
     ```bash
     cd frontend
     npm i
     npm run dev
     ```
   - App runs on `http://localhost:5173`

## Level 1 Endpoints
- POST `/api/expenses` create expense
- GET `/api/expenses` list expenses
- DELETE `/api/expenses/:id` delete expense
- GET `/api/balances` compute settlements (equal split)

## Notes
- Balances use equal split and a greedy settlement generator.
- Level 2 and 3 can extend models and routes as described in the spec.


