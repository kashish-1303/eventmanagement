// src/services/payment.service.js
import { nodeApi } from './api';

const PaymentService = {
  createPayment: async (paymentData) => {
    return await nodeApi.post('/payments', paymentData);
  },
  
  getPaymentByBooking: async (bookingId) => {
    return await nodeApi.get(`/payments/booking/${bookingId}`);
  },
  
  updatePaymentStatus: async (id, statusData) => {
    return await nodeApi.patch(`/payments/${id}/status`, statusData);
  }
};

export default PaymentService;