import User from '../models/User.js';
import Transaction from '../models/Transaction.js';

export const getWallet = async (req, res) => {
  res.json({ balance: req.user.walletBalance });
};

export const transfer = async (req, res) => {
  const { toEmail, amount } = req.body;
  if (amount <= 0) return res.status(400).json({ message: 'Invalid amount' });
  const recipient = await User.findOne({ email: toEmail });
  if (!recipient) return res.status(404).json({ message: 'Recipient not found' });
  if (req.user.walletBalance < amount) return res.status(400).json({ message: 'Insufficient funds' });
  req.user.walletBalance -= amount;
  recipient.walletBalance += amount;
  await req.user.save();
  await recipient.save();
  await Transaction.create({ user: req.user._id, type: 'transfer', amount, category: 'transfer', peer: recipient._id });
  await Transaction.create({ user: recipient._id, type: 'income', amount, category: 'transfer', peer: req.user._id });
  res.json({ message: 'Transfer successful' });
};
