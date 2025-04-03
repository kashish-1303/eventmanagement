// src/services/dashboard.service.js
import { springApi } from './api';  // Change to nodeApi if dashboard API is on Node backend

const DashboardService = {
  getStats: async () => {
    const response = await springApi.get('/admin/dashboard/stats');
    return response.data;
  },
  
  getRevenueStats: async (period) => {
    const response = await springApi.get('/admin/dashboard/revenue', { params: { period } });
    return response.data;
  },
  
  getUserStats: async () => {
    const response = await springApi.get('/admin/dashboard/users');
    return response.data;
  },
  
  getEventStats: async () => {
    const response = await springApi.get('/admin/dashboard/events');
    return response.data;
  }
};

export default DashboardService;