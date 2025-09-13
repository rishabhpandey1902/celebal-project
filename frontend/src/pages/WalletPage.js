import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, TextField, Grid } from '@mui/material';
import axios from 'axios';

const WalletPage = () => {
  const [balance, setBalance] = useState(0);
  const [toEmail, setToEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/api/wallet', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => setBalance(res.data.balance));
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await axios.post('/api/wallet/transfer', { toEmail, amount: Number(amount) }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setMessage('Transfer successful!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error');
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Wallet</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="h6">Balance: ${balance}</Typography>
      </Paper>
      <Paper sx={{ p: 2 }}>
        <Typography variant="h6">Transfer to another user</Typography>
        <form onSubmit={handleTransfer}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField label="Recipient Email" fullWidth value={toEmail} onChange={e => setToEmail(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={5}>
              <TextField label="Amount" type="number" fullWidth value={amount} onChange={e => setAmount(e.target.value)} />
            </Grid>
            <Grid item xs={12} md={2}>
              <Button type="submit" variant="contained" fullWidth>Send</Button>
            </Grid>
          </Grid>
        </form>
        {message && <Typography color={message.includes('success') ? 'primary' : 'error'}>{message}</Typography>}
      </Paper>
    </Box>
  );
};

export default WalletPage;
