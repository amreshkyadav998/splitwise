import { useState } from 'react';
import { createExpense } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function AddExpense() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ description: '', amount: '', paidBy: '', participants: '' });
  const [submitting, setSubmitting] = useState(false);

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const participants = form.participants.split(',').map((s) => s.trim()).filter(Boolean);
      await createExpense({ description: form.description.trim(), amount: Number(form.amount), paidBy: form.paidBy.trim(), participants });
      navigate('/');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4 bg-white p-6 rounded border">
      <h2 className="text-lg font-semibold">Add Expense</h2>
      <div>
        <label className="block text-sm">Description</label>
        <input className="mt-1 w-full border rounded px-3 py-2" value={form.description} onChange={(e) => update('description', e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm">Amount</label>
        <input type="number" step="0.01" className="mt-1 w-full border rounded px-3 py-2" value={form.amount} onChange={(e) => update('amount', e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm">Paid By (name)</label>
        <input className="mt-1 w-full border rounded px-3 py-2" value={form.paidBy} onChange={(e) => update('paidBy', e.target.value)} required />
      </div>
      <div>
        <label className="block text-sm">Participants (comma separated names)</label>
        <input className="mt-1 w-full border rounded px-3 py-2" value={form.participants} onChange={(e) => update('participants', e.target.value)} required />
      </div>
      <button disabled={submitting} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">{submitting ? 'Submitting...' : 'Create'}</button>
    </form>
  );
}


