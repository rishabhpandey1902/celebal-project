export const validateTransaction = (data) => {
  if (!data.type || !['expense', 'income', 'transfer'].includes(data.type)) return 'Invalid type';
  if (!data.amount || typeof data.amount !== 'number' || data.amount <= 0) return 'Invalid amount';
  if (!data.category || typeof data.category !== 'string') return 'Invalid category';
  return null;
};
