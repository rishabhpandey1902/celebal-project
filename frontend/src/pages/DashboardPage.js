import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid } from '@mui/material';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const DashboardPage = () => {
  const [insights, setInsights] = useState({});
  useEffect(() => {
    axios.get('/api/transactions/insights', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    }).then(res => setInsights(res.data));
  }, []);

  // Placeholder data for charts
  const barData = {
    labels: insights.weekly?.labels || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Spending',
        data: insights.weekly?.data || [120, 90, 100, 80, 150, 200, 170],
        backgroundColor: '#1976d2',
      },
    ],
  };
  const pieData = {
    labels: insights.categories?.labels || ['Food', 'Transport', 'Shopping'],
    datasets: [
      {
        label: 'Categories',
        data: insights.categories?.data || [300, 200, 100],
        backgroundColor: ['#1976d2', '#43a047', '#fbc02d'],
      },
    ],
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Weekly Spending</Typography>
            <Bar data={barData} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Spending by Category</Typography>
            <Pie data={pieData} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
