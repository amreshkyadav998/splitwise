function getDisplayName(expense, userId, fallbackName) {
  if (fallbackName) return fallbackName;
  if (!userId) return 'Unknown';
  if (expense.paidBy && expense.paidBy._id && expense.paidBy._id.equals && expense.paidBy._id.equals(userId)) return expense.paidBy.name || 'Unknown';
  const found = Array.isArray(expense.participants)
    ? expense.participants.find((p) => p && p._id && p._id.equals && p._id.equals(userId))
    : null;
  return found ? (found.name || 'Unknown') : 'Unknown';
}

function calculateBalances(expenses) {
  const net = new Map(); // name -> net amount (positive means others owe them)

  for (const exp of expenses) {
    // Handle both Level 1 (names) and Level 2 (user objects) data
    const participants = exp.participants && exp.participants.length > 0 ? exp.participants : (exp.participantNames || []);
    
    // Payer advances full amount (resolve display name based on Level 1/2 data)
    const payerName = exp.paidByName || (exp.paidBy && (exp.paidBy.name || exp.paidBy.email)) || 'Unknown';
    
    if (!participants || participants.length === 0) {
      // Personal expense: payer pays for themselves (no net effect on balances)
      continue;
    }
    
    const share = exp.amount / participants.length;
    
    // Payer gets credited the full amount
    net.set(payerName, (net.get(payerName) || 0) + exp.amount);

    // Each participant owes their share
    for (const p of participants) {
      const name = typeof p === 'string' ? p : (p.name || p.email || 'Unknown');
      net.set(name, (net.get(name) || 0) - share);
    }
  }

  // Convert to settlement pairs: who owes whom
  const creditors = [];
  const debtors = [];
  for (const [name, amount] of net.entries()) {
    const rounded = Math.round(amount * 100) / 100;
    if (rounded > 0.01) creditors.push({ name, amount: rounded });
    else if (rounded < -0.01) debtors.push({ name, amount: -rounded });
  }

  creditors.sort((a, b) => b.amount - a.amount);
  debtors.sort((a, b) => b.amount - a.amount);

  const settlements = [];
  let i = 0, j = 0;
  while (i < debtors.length && j < creditors.length) {
    const pay = Math.min(debtors[i].amount, creditors[j].amount);
    settlements.push({ from: debtors[i].name, to: creditors[j].name, amount: Math.round(pay * 100) / 100 });
    debtors[i].amount -= pay;
    creditors[j].amount -= pay;
    if (debtors[i].amount < 0.01) i++;
    if (creditors[j].amount < 0.01) j++;
  }

  return settlements;
}

module.exports = { calculateBalances };


