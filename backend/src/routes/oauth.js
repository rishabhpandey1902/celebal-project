import express from 'express';
import passport from '../middleware/oauth.js';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false }), (req, res) => {
  // Generate JWT and send to frontend
  const token = req.user.generateJWT();
  res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
});

export default router;
