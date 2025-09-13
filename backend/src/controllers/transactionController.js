import Transaction from '../models/Transaction.js';
import User from '../models/User.js';

export const addTransaction = async (req, res) => {
  const { type, amount, category, description, date, peer } = req.body;
  const transaction = await Transaction.create({
    user: req.user._id,
    type,
    amount,
    category,
    description,
    date,
    peer,
  });
  // TODO: Fraud detection, email notification
  res.status(201).json(transaction);
};

export const getTransactions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const transactions = await Transaction.find({ user: req.user._id })
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(Number(limit));
  const count = await Transaction.countDocuments({ user: req.user._id });
  res.json({ transactions, count });
};

export const getInsights = async (req, res) => {
  // TODO: Aggregate by category, week, month
  res.json({});
};
