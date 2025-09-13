export const validate = (validator) => (req, res, next) => {
  const error = validator(req.body);
  if (error) return res.status(400).json({ message: error });
  next();
};
