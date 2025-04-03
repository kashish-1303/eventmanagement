// // src/services/booking.service.js
// import { nodeApi } from './api';

// const BookingService = {
//   createBooking: async (bookingData) => {
//     return await nodeApi.post('/bookings', bookingData);
//   },
  
//   getUserBookings: async (userId) => {
//     return await nodeApi.get(`/bookings/user/${userId}`);
//   },
  
//   getBookingById: async (id) => {
//     return await nodeApi.get(`/bookings/${id}`);
//   },
  
//   updateBookingStatus: async (id, status) => {
//     return await nodeApi.patch(`/bookings/${id}/status`, { status });
//   }
// };

// export default BookingService;
// src/services/booking.service.js
// import { nodeApi } from './api';

// const BookingService = {
//   createBooking: async (bookingData) => {
//     const response = await nodeApi.post('/bookings', bookingData);
//     return response.data;
//   },
  
//   getUserBookings: async (userId = null) => {
//     // If userId is provided, fetch that specific user's bookings
//     // Otherwise, fetch the current authenticated user's bookings
//     const url = userId ? `/bookings/user/${userId}` : '/bookings/user';
//     const response = await nodeApi.get(url);
//     return response.data;
//   },
  
//   getBookingById: async (id) => {
//     const response = await nodeApi.get(`/bookings/${id}`);
//     return response.data;
//   },
  
//   getBookingDetails: async (id) => {
//     const response = await nodeApi.get(`/bookings/${id}/details`);
//     return response.data;
//   },
  
//   updateBookingStatus: async (id, status) => {
//     const response = await nodeApi.patch(`/bookings/${id}/status`, { status });
//     return response.data;
//   },
  
//   cancelBooking: async (id) => {
//     const response = await nodeApi.patch(`/bookings/${id}/cancel`);
//     return response.data;
//   }
// };

// export default BookingService;

// import { nodeApi } from './api';

// const createBooking = async (bookingData) => {
//   const response = await nodeApi.post('/bookings', bookingData);
//   return response.data;
// };

// const getBookings = async (filters) => {
//   const response = await nodeApi.get('/bookings', { params: filters });
//   return response.data;
// };

// const getBookingById = async (id) => {
//   const response = await nodeApi.get(`/bookings/${id}`);
//   return response.data;
// };

// const updateBooking = async (id, updateData) => {
//   const response = await nodeApi.put(`/bookings/${id}`, updateData);
//   return response.data;
// };

// const cancelBooking = async (id) => {
//   const response = await nodeApi.delete(`/bookings/${id}`);
//   return response.data;
// };

// // Add missing getUserBookings function
// const getUserBookings = async (userId) => {
//   const response = await nodeApi.get(`/users/${userId}/bookings`);
//   return response.data;
// };

// // Add missing getBookingDetails function
// const getBookingDetails = async (bookingId) => {
//   const response = await nodeApi.get(`/bookings/${bookingId}/details`);
//   return response.data;
// };

// export {
//   createBooking,
//   getBookings,
//   getBookingById,
//   updateBooking,
//   cancelBooking,
//   getUserBookings,
//   getBookingDetails
// };

// export default {
//   createBooking,
//   getBookings,
//   getBookingById,
//   updateBooking,
//   cancelBooking,
//   getUserBookings,
//   getBookingDetails
// };

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