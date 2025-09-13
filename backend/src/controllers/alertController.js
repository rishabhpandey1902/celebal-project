import Alert from '../models/Alert.js';

export const getAlerts = async (req, res) => {
  const alerts = await Alert.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(alerts);
};

export const markRead = async (req, res) => {
  const alert = await Alert.findOne({ _id: req.params.id, user: req.user._id });
  if (!alert) return res.status(404).json({ message: 'Alert not found' });
  alert.read = true;
  await alert.save();
  res.json(alert);
};
