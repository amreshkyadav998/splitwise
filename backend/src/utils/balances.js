function calculateBalances(expenses) {
  const net = new Map(); // name -> net amount (positive means others owe them)

  for (const exp of expenses) {
    const participants = exp.participants;
    if (!participants || participants.length === 0) continue;
    const share = exp.amount / participants.length;

    // Payer advances full amount
    net.set(exp.paidBy, (net.get(exp.paidBy) || 0) + exp.amount);

    // Each participant owes their share
    for (const p of participants) {
      net.set(p, (net.get(p) || 0) - share);
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


