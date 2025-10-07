import { useState } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home.jsx";
import AddExpense from "./pages/AddExpense.jsx";
import Balances from "./pages/Balances.jsx";
import Auth from "./pages/Auth.jsx";
import { useAuth } from "./context/AuthContext.jsx";

export default function App() {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur bg-white/80 border-b">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded bg-blue-600" />
            <h1 className="text-xl font-semibold">Splitwise Clone</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-1 items-center">
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              to="/"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              to="/add"
            >
              Add Expense
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              to="/balances"
            >
              Balances
            </NavLink>
            <span className="mx-2 text-gray-300">|</span>
            {user ? (
              <>
                <span className="text-sm text-gray-700 mr-2">{user.name}</span>
                <button
                  className="text-sm text-blue-600 hover:underline"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                to="/auth"
              >
                Login
              </NavLink>
            )}
          </nav>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none"
            >
              {/* Three lines icon */}
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-gray-700"></span>
                <span className="block w-6 h-0.5 bg-gray-700"></span>
                <span className="block w-6 h-0.5 bg-gray-700"></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white border-t px-4 py-2 flex flex-col gap-2">
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              to="/"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              to="/add"
              onClick={() => setMobileMenuOpen(false)}
            >
              Add Expense
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `px-3 py-2 rounded-md text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
              to="/balances"
              onClick={() => setMobileMenuOpen(false)}
            >
              Balances
            </NavLink>
            {user ? (
              <>
                <span className="px-3 py-2 text-sm text-gray-700">{user.name}</span>
                <button
                  className="px-3 py-2 text-sm text-blue-600 hover:underline text-left"
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </NavLink>
            )}
          </nav>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/balances" element={<Balances />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Splitwise Clone
      </footer>
    </div>
  );
}
