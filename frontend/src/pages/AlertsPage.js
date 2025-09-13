import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Button } from '@mui/material';
import axios from 'axios';

const AlertsPage = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get('/api/alerts', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => setAlerts(res.data));
  }, []);

  const markRead = async (id) => {
    await axios.put(`/api/alerts/${id}/read`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setAlerts(alerts.map(a => a._id === id ? { ...a, read: true } : a));
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Alerts</Typography>
      <Paper sx={{ p: 2 }}>
        <List>
          {alerts.length === 0 && <Typography>No alerts</Typography>}
          {alerts.map(alert => (
            <ListItem key={alert._id} secondaryAction={
              !alert.read && <Button onClick={() => markRead(alert._id)}>Mark as read</Button>
            }>
              <ListItemText
                primary={alert.message}
                secondary={new Date(alert.createdAt).toLocaleString()}
                style={{ opacity: alert.read ? 0.5 : 1 }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default AlertsPage;
