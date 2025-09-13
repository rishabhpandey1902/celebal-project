// Example fraud detection rules
export const checkFraud = (transaction, user, recentTransactions) => {
  const alerts = [];
  if (transaction.amount > 1000) {
    alerts.push('High-value transaction');
  }
  // Example: flag if spending in a category exceeds $500 in a week
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);
  const categoryTotal = recentTransactions
    .filter(t => t.category === transaction.category && t.date > weekAgo)
    .reduce((sum, t) => sum + t.amount, 0) + transaction.amount;
  if (categoryTotal > 500) {
    alerts.push(`Spending in ${transaction.category} exceeds $500 this week`);
  }
  return alerts;
};
