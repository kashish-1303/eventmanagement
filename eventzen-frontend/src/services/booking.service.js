// src/services/booking.service.js
import { nodeApi } from './api';

const BookingService = {
  createBooking: async (bookingData) => {
    return await nodeApi.post('/bookings', bookingData);
  },
  
  getUserBookings: async (userId) => {
    return await nodeApi.get(`/bookings/user/${userId}`);
  },
  
  getBookingById: async (id) => {
    return await nodeApi.get(`/bookings/${id}`);
  },
  
  updateBookingStatus: async (id, status) => {
    return await nodeApi.patch(`/bookings/${id}/status`, { status });
  }
};

export default BookingService;