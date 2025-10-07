import { Routes, Route, NavLink } from 'react-router-dom';
import Home from './pages/Home.jsx';
import AddExpense from './pages/AddExpense.jsx';
import Balances from './pages/Balances.jsx';
import Auth from './pages/Auth.jsx';
import { useAuth } from './context/AuthContext.jsx';

export default function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <header className="sticky top-0 z-10 backdrop-blur bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-blue-600" />
            <h1 className="text-xl font-semibold">Splitwise Clone</h1>
          </div>
          <nav className="flex gap-1 items-center">
            <NavLink className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} to="/">Home</NavLink>
            <NavLink className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} to="/add">Add Expense</NavLink>
            <NavLink className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} to="/balances">Balances</NavLink>
            <span className="mx-2 text-gray-300">|</span>
            {user ? (
              <>
                <span className="text-sm text-gray-700 mr-2">{user.name}</span>
                <button className="text-sm text-blue-600 hover:underline" onClick={logout}>Logout</button>
              </>
            ) : (
              <NavLink className={({ isActive }) => `px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`} to="/auth">Login</NavLink>
            )}
          </nav>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/balances" element={<Balances />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>
      <footer className="border-t py-6 text-center text-sm text-gray-500">© {new Date().getFullYear()} Splitwise Clone</footer>
    </div>
  );
}


