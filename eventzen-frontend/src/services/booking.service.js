

import { nodeApi } from './api';

const createBooking = async (bookingData) => {
  const response = await nodeApi.post('/bookings', bookingData);
  return response.data;
};

const getBookings = async (filters) => {
  const response = await nodeApi.get('/bookings', { params: filters });
  return response.data;
};

const getBookingById = async (id) => {
  const response = await nodeApi.get(`/bookings/${id}`);
  return response.data;
};

const updateBooking = async (id, updateData) => {
  const response = await nodeApi.put(`/bookings/${id}`, updateData);
  return response.data;
};

const cancelBooking = async (id) => {
  const response = await nodeApi.delete(`/bookings/${id}`);
  return response.data;
};

// Add missing getUserBookings function
const getUserBookings = async (userId) => {
  const response = await nodeApi.get(`/users/${userId}/bookings`);
  return response.data;
};

// Add missing getBookingDetails function
const getBookingDetails = async (bookingId) => {
  const response = await nodeApi.get(`/bookings/${bookingId}/details`);
  return response.data;
};

export {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  getUserBookings,
  getBookingDetails
};

// Fix ESLint warning by assigning the object to a variable first
const bookingService = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  getUserBookings,
  getBookingDetails
};

export default bookingService;