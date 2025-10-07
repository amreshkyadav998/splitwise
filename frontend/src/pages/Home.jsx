import { useEffect, useState } from 'react';
import { fetchExpenses, deleteExpense } from '../lib/api';
import { Card, CardHeader, CardContent } from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';

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
    <Card>
      <CardHeader title="All Expenses" subtitle="Manage and review your shared costs" />
      <CardContent>
        <ul className="divide-y">
          {expenses.map((e) => (
            <li key={e._id} className="py-4 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-base font-semibold">{e.description}</span>
                  <Badge color="blue">${e.amount.toFixed(2)}</Badge>
                </div>
                <div className="text-sm text-gray-600">
                  Paid by <span className="font-medium">{e.paidByName || (e.paidBy && e.paidBy.name) || 'Unknown'}</span> on {new Date(e.date).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">
                  Participants: {
                    e.participantNames && e.participantNames.length > 0 
                      ? e.participantNames.join(', ') 
                      : e.participants && e.participants.length > 0 
                        ? e.participants.map(p => p.name || p.email || p).join(', ')
                        : 'None'
                  }
                </div>
              </div>
              <Button variant="danger" onClick={() => onDelete(e._id)}>Delete</Button>
            </li>
          ))}
        </ul>
        {expenses.length === 0 && <div className="text-sm text-gray-600">No expenses yet.</div>}
      </CardContent>
    </Card>
  );
}


