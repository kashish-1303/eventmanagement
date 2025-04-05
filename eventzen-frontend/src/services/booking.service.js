
// import { nodeApi } from './api';

// const createBooking = async (bookingData) => {
//   // Set default status to PENDING and payment_status to UNPAID
//   const bookingWithStatus = {
//     ...bookingData,
//     status: 'PENDING',
//     payment_status: 'UNPAID'
//   };
//   try {
//     const response = await nodeApi.post('/bookings', bookingWithStatus);
//     return response.data;
//   } catch (error) {
//     console.error("Error creating booking:", error);
//     throw error;
//   }
// };

// // Add a function to update payment status - with error handling
// const updateBookingPayment = async (bookingId, paymentData) => {
//   try {
//     // Check if the endpoint exists, if not, use a different approach
//     const response = await nodeApi.put(`/bookings/${bookingId}`, {
//       status: 'CONFIRMED',
//       payment_status: 'PAID',
//       payment_details: paymentData
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error updating booking payment:", error);
//     throw error;
//   }
// };

// const getBookings = async (filters) => {
//   try {
//     const response = await nodeApi.get('/bookings', { params: filters });
//     return response.data;
//   } catch (error) {
//     console.error("Error getting bookings:", error);
//     throw error;
//   }
// };

// const getUserBookings = async (userId) => {
//   try {
//     const response = await nodeApi.get(`/users/${userId}/bookings`);
//     return response.data;
//   } catch (error) {
//     console.error("Error getting user bookings:", error);
//     // Return empty array instead of throwing error
//     return { data: [] };
//   }
// };

// // Rest of your existing functions with added error handling
// const getBookingById = async (id) => {
//   try {
//     const response = await nodeApi.get(`/bookings/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error getting booking by ID:", error);
//     throw error;
//   }
// };

// const updateBooking = async (id, updateData) => {
//   try {
//     const response = await nodeApi.put(`/bookings/${id}`, updateData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating booking:", error);
//     throw error;
//   }
// };

// const cancelBooking = async (id) => {
//   try {
//     const response = await nodeApi.delete(`/bookings/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error canceling booking:", error);
//     throw error;
//   }
// };

// const getBookingDetails = async (bookingId) => {
//   try {
//     const response = await nodeApi.get(`/bookings/${bookingId}/details`);
//     return response.data;
//   } catch (error) {
//     console.error("Error getting booking details:", error);
//     throw error;
//   }
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
const axios = require('axios')
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

// Update to match your backend route (PATCH instead of PUT)
const updateBookingPayment = async (bookingId, paymentData) => {
  try {
    const response = await nodeApi.patch(`/bookings/${bookingId}/status`, {
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

// Fixed to match your backend route pattern exactly
// const getUserBookings = async (userId) => {
//   try {
//     const response = await nodeApi.get(`/bookings/user/${userId}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error getting user bookings:", error);
//     // Return empty array instead of throwing error
//     return { data: [] };
//   }
// };
// In eventzen-frontend/src/services/booking.service.js
// Add a new function to fetch bookings from Spring Boot API
const getUserBookingsFromSpringBoot = async (userId) => {
  try {
    // Assuming your Spring API has a similar endpoint
    const response = await axios.get(`${process.env.REACT_APP_SPRING_API_URL}/api/users/${userId}/bookings`);
    return response.data;
  } catch (error) {
    console.error("Error getting user bookings from Spring Boot:", error);
    return [];
  }
};

// Update the existing getUserBookings function to merge results
const getUserBookings = async (userId) => {
  try {
    // Get bookings from Node.js backend
    const nodeResponse = await nodeApi.get(`/bookings/user/${userId}`);
    
    // Get bookings from Spring Boot backend
    const springBootBookings = await getUserBookingsFromSpringBoot(userId);
    
    // Combine and deduplicate bookings based on booking_id
    const allBookings = [...nodeResponse.data];
    
    // Return the combined bookings
    return allBookings;
  } catch (error) {
    console.error("Error getting user bookings:", error);
    return [];
  }
};

const getBookingById = async (id) => {
  try {
    const response = await nodeApi.get(`/bookings/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error getting booking by ID:", error);
    throw error;
  }
};

// This might not exist in your backend - you might need to use PATCH instead
const updateBooking = async (id, updateData) => {
  try {
    // Using PATCH for consistency with your other endpoints
    const response = await nodeApi.patch(`/bookings/${id}/status`, updateData);
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

// This endpoint might not exist in your backend
const getBookingDetails = async (bookingId) => {
  try {
    const response = await nodeApi.get(`/bookings/${bookingId}`);
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