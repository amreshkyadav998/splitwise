import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AddExpense from './pages/AddExpense.jsx';
import Balances from './pages/Balances.jsx';

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Splitwise Clone</h1>
          <nav className="flex gap-4">
            <NavLink className={({ isActive }) => `hover:underline ${isActive ? 'text-blue-600' : ''}`} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => `hover:underline ${isActive ? 'text-blue-600' : ''}`} to="/add">Add Expense</NavLink>
            <NavLink className={({ isActive }) => `hover:underline ${isActive ? 'text-blue-600' : ''}`} to="/balances">Balances</NavLink>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/balances" element={<Balances />} />
        </Routes>
      </main>
    </div>
  );
}


