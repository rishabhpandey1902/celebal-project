import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['expense', 'income', 'transfer'], required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  peer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // for transfers
  isFlagged: { type: Boolean, default: false },
  flaggedReason: String
}, { timestamps: true });

export default mongoose.model('Transaction', transactionSchema);
