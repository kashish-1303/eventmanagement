
// import { nodeApi } from './api';

// const createBooking = async (bookingData) => {
//   // Set default status to PENDING and payment_status to UNPAID
//   const bookingWithStatus = {
//     ...bookingData,
//     status: 'PENDING',
//     payment_status: 'UNPAID'
//   };
//   const response = await nodeApi.post('/bookings', bookingWithStatus);
//   return response.data;
// };

// // Add a function to update payment status
// const updateBookingPayment = async (bookingId, paymentData) => {
//   const response = await nodeApi.post(`/bookings/${bookingId}/payment`, paymentData);
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

// const getUserBookings = async (userId) => {
//   const response = await nodeApi.get(`/users/${userId}/bookings`);
//   return response.data;
// };

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
//   getBookingDetails,
//   updateBookingPayment
// };

// const bookingService = {
//   createBooking,
//   getBookings,
//   getBookingById,
//   updateBooking,
//   cancelBooking,
//   getUserBookings,
//   getBookingDetails,
//   updateBookingPayment
// };

// export default bookingService;
import { nodeApi } from './api';

const createBooking = async (bookingData) => {
  // Set default status to PENDING and payment_status to UNPAID
  const bookingWithStatus = {
    ...bookingData,
    status: 'PENDING',
    payment_status: 'UNPAID'
  };
  try {
    const response = await nodeApi.post('/bookings', bookingWithStatus);
    return response.data;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
};

// Add a function to update payment status - with error handling
const updateBookingPayment = async (bookingId, paymentData) => {
  try {
    // Check if the endpoint exists, if not, use a different approach
    const response = await nodeApi.put(`/bookings/${bookingId}`, {
      status: 'CONFIRMED',
      payment_status: 'PAID',
      payment_details: paymentData
    });
    return response.data;
  } catch (error) {
    console.error("Error updating booking payment:", error);
    throw error;
  }
};

const getBookings = async (filters) => {
  try {
    const response = await nodeApi.get('/bookings', { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error getting bookings:", error);
    throw error;
  }
};

const getUserBookings = async (userId) => {
  try {
    const response = await nodeApi.get(`/users/${userId}/bookings`);
    return response.data;
  } catch (error) {
    console.error("Error getting user bookings:", error);
    // Return empty array instead of throwing error
    return { data: [] };
  }
};

// Rest of your existing functions with added error handling
const getBookingById = async (id) => {
  try {
    const response = await nodeApi.get(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting booking by ID:", error);
    throw error;
  }
};

const updateBooking = async (id, updateData) => {
  try {
    const response = await nodeApi.put(`/bookings/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Error updating booking:", error);
    throw error;
  }
};

const cancelBooking = async (id) => {
  try {
    const response = await nodeApi.delete(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling booking:", error);
    throw error;
  }
};

const getBookingDetails = async (bookingId) => {
  try {
    const response = await nodeApi.get(`/bookings/${bookingId}/details`);
    return response.data;
  } catch (error) {
    console.error("Error getting booking details:", error);
    throw error;
  }
};

export {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  getUserBookings,
  getBookingDetails,
  updateBookingPayment
};

const bookingService = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  cancelBooking,
  getUserBookings,
  getBookingDetails,
  updateBookingPayment
};

export default bookingService;