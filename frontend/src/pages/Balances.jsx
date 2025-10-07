import { useEffect, useState } from 'react';
import { fetchBalances } from '../lib/api';
import { Card, CardHeader, CardContent } from '../components/Card';
import Badge from '../components/Badge';
import { useAuth } from '../context/AuthContext';

export default function Balances() {
  const { user } = useAuth();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await fetchBalances();
        setRows(data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div>Loading...</div>;

  const displayName = (name) => {
    if (!user || !user.name) return name;
    return name === user.name ? 'You' : name;
  };

  return (
    <Card>
      <CardHeader title="Who owes whom" subtitle="Settlement suggestions based on equal split" />
      <CardContent>
        <ul className="space-y-2">
          {rows.map((r, idx) => (
            <li key={idx} className="bg-gray-50 border rounded px-4 py-3">
              <span className="font-semibold">{displayName(r.from)}</span> owes <span className="font-semibold">{displayName(r.to)}</span> <Badge color="green">${r.amount.toFixed(2)}</Badge>
            </li>
          ))}
        </ul>
        {rows.length === 0 && <div className="text-sm text-gray-600">All settled!</div>}
      </CardContent>
    </Card>
  );
}


