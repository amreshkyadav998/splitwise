import { useEffect, useState } from 'react';
import { fetchExpenses, deleteExpense } from '../lib/api';

export default function Home() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function onDelete(id) {
    await deleteExpense(id);
    load();
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">All Expenses</h2>
      <ul className="space-y-2">
        {expenses.map((e) => (
          <li key={e._id} className="bg-white p-4 rounded border flex items-start justify-between">
            <div>
              <div className="font-medium">{e.description} - ${e.amount.toFixed(2)}</div>
              <div className="text-sm text-gray-600">Paid by {e.paidBy} on {new Date(e.date).toLocaleDateString()}</div>
              <div className="text-sm text-gray-600">Participants: {e.participants.join(', ')}</div>
            </div>
            <button onClick={() => onDelete(e._id)} className="text-red-600 hover:underline">Delete</button>
          </li>
        ))}
      </ul>
      {expenses.length === 0 && <div className="text-sm text-gray-600">No expenses yet.</div>}
    </div>
  );
}


