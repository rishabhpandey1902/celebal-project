import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Paper, Tabs, Tab, Link, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';


const AuthPage = ({ mode }) => {
  const [tab, setTab] = useState(mode === 'register' ? 1 : 0);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');
  const [forgotOpen, setForgotOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMsg, setForgotMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (tab === 0) {
        // Login
        const { data } = await axios.post('/api/auth/login', { email: form.email, password: form.password });
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        // Register
        await axios.post('/api/auth/register', form);
        setTab(0);
        setError('Registration successful! Please check your email.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    }
  };

  const handleForgot = async () => {
    setForgotMsg('');
    try {
      await axios.post('/api/auth/forgot-password', { email: forgotEmail });
      setForgotMsg('Password reset link sent!');
    } catch (err) {
      setForgotMsg(err.response?.data?.message || 'Error');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bgcolor="#f5f6fa">
      <Paper elevation={3} sx={{ p: 4, minWidth: 350 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} centered>
          <Tab label="Login" />
          <Tab label="Register" />
        </Tabs>
        <form onSubmit={handleSubmit}>
          {tab === 1 && (
            <TextField margin="normal" fullWidth label="Name" name="name" value={form.name} onChange={handleChange} />
          )}
          <TextField margin="normal" fullWidth label="Email" name="email" value={form.email} onChange={handleChange} />
          <TextField margin="normal" fullWidth label="Password" name="password" type="password" value={form.password} onChange={handleChange} />
          {tab === 0 && (
            <Box textAlign="right">
              <Link component="button" variant="body2" onClick={() => setForgotOpen(true)}>
                Forgot password?
              </Link>
            </Box>
          )}
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            {tab === 0 ? 'Login' : 'Register'}
          </Button>
          <Button fullWidth variant="outlined" sx={{ mt: 1 }} href="/api/oauth/google">
            Sign in with Google
          </Button>
        </form>
      </Paper>
      <Dialog open={forgotOpen} onClose={() => setForgotOpen(false)}>
        <DialogTitle>Forgot Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={forgotEmail}
            onChange={e => setForgotEmail(e.target.value)}
          />
          {forgotMsg && <Typography color={forgotMsg.includes('sent') ? 'primary' : 'error'}>{forgotMsg}</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setForgotOpen(false)}>Cancel</Button>
          <Button onClick={handleForgot}>Send Reset Link</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AuthPage;
