import { useEffect, useState } from 'react';
import { fetchBalances } from '../lib/api';

export default function Balances() {
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

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Who owes whom</h2>
      <ul className="space-y-2">
        {rows.map((r, idx) => (
          <li key={idx} className="bg-white p-4 rounded border">
            <span className="font-medium">{r.from}</span> owes <span className="font-medium">{r.to}</span> ${r.amount.toFixed(2)}
          </li>
        ))}
      </ul>
      {rows.length === 0 && <div className="text-sm text-gray-600">All settled!</div>}
    </div>
  );
}


