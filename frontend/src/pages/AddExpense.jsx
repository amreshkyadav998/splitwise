import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../components/Card';
import Button from '../components/Button';
import { Input, Label } from '../components/Input';
import { useAuth } from '../context/AuthContext';
import api, { createExpense } from '../lib/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddExpense() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({
    description: '',
    amount: '',
    paidBy: '',
    participants: [],
  });
  const [users, setUsers] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  // Fetch users for selection
  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const { data } = await api.get('/users');
          setUsers(data);
        } catch (err) {
          toast.error("Failed to load users");
        }
      })();
    }
  }, [user]);

  function update(key, value) {
    setForm(f => ({ ...f, [key]: value }));
  }

  function toggleParticipant(userId) {
    setForm(f => ({
      ...f,
      participants: f.participants.includes(userId)
        ? f.participants.filter(id => id !== userId)
        : [...f.participants, userId],
    }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!user) {
      toast.error("You must login to add an expense!");
      return;
    }

    if (!form.participants || form.participants.length === 0) {
      toast.error("Please select at least one participant");
      return;
    }

    setSubmitting(true);
    try {
      await createExpense({
        description: form.description.trim(),
        amount: Number(form.amount),
        paidBy: form.paidBy,
        participants: form.participants,
      });

      toast.success("Expense added successfully!");
      navigate('/');
    } catch (err) {
      toast.error("Failed to add expense");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-50 px-4">
      {/* Slightly below navbar */}
      <div className="mt-6 w-full max-w-2xl">
        <Card className="w-full">
          <CardHeader
            title="Add Expense"
            subtitle="Create a new shared expense"
          />
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Description */}
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={form.description}
                  onChange={e => update('description', e.target.value)}
                  required
                />
              </div>

              {/* Amount + PaidBy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={form.amount}
                    onChange={e => update('amount', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="paidBy">Paid By</Label>
                  {user && users.length > 0 ? (
                    <select
                      id="paidBy"
                      className="mt-1 w-full border rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 border-gray-300"
                      value={form.paidBy}
                      onChange={e => update('paidBy', e.target.value)}
                      required
                    >
                      <option value="">Select user</option>
                      {users.map(u => (
                        <option key={u._id} value={u._id}>
                          {u.name} ({u.email})
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id="paidBy"
                      placeholder="Name"
                      value={form.paidBy}
                      onChange={e => update('paidBy', e.target.value)}
                      required
                    />
                  )}
                </div>
              </div>

              {/* Participants */}
              <div>
                <Label>
                  Participants{' '}
                  {user &&
                    users.length > 0 &&
                    form.participants.length > 0 &&
                    `(${form.participants.length} selected)`}
                </Label>
                {user && users.length > 0 ? (
                  <div className="mt-2 space-y-2 max-h-40 overflow-y-auto border border-gray-300 rounded-md p-3 bg-white">
                    {users.map(u => (
                      <label
                        key={u._id}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      >
                        <input
                          type="checkbox"
                          checked={form.participants.includes(u._id)}
                          onChange={() => toggleParticipant(u._id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-400 focus:ring-2"
                        />
                        <span className="text-sm text-gray-700">
                          {u.name} ({u.email})
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <Input
                    placeholder="Comma separated names"
                    value={form.participants.join(', ')}
                    onChange={e =>
                      update(
                        'participants',
                        e.target.value.split(',').map(s => s.trim())
                      )
                    }
                    required
                  />
                )}
              </div>

              {/* Submit */}
              <div className="pt-2 text-center">
                <Button disabled={submitting} type="submit">
                  {submitting ? 'Submitting...' : 'Create'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={2500} />
    </div>
  );
}
