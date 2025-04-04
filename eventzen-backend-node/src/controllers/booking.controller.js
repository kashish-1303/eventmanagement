// // src/controllers/booking.controller.js
// const Booking = require('../models/booking.model');
// const { v4: uuidv4 } = require('uuid');
// const axios = require('axios');

// // Configuration for Spring Boot API
// const SPRING_API_URL = process.env.SPRING_API_URL || 'http://localhost:8080/api';

// exports.createBooking = async (req, res) => {
//   try {
//     const { user_id, event_id } = req.body;
    
//     // Validate that event exists via Spring Boot API
//     try {
//       const eventResponse = await axios.get(`${SPRING_API_URL}/events/${event_id}`);
//       if (!eventResponse.data) {
//         return res.status(404).json({ message: 'Event not found' });
//       }
//     } catch (error) {
//       return res.status(404).json({ message: 'Event not found or service unavailable' });
//     }
    
//     // Create booking
//     const booking = new Booking({
//       booking_id: uuidv4(),
//       user_id,
//       event_id,
//       status: 'PENDING',
//       payment_status: 'UNPAID'
//     });
    
//     const savedBooking = await booking.save();
//     res.status(201).json(savedBooking);
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating booking', error: error.message });
//   }
// };

// exports.getBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find();
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching bookings', error: error.message });
//   }
// };

// exports.getBookingById = async (req, res) => {
//   try {
//     const booking = await Booking.findOne({ booking_id: req.params.id });
//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }
//     res.status(200).json(booking);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching booking', error: error.message });
//   }
// };

// exports.updateBookingStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
    
//     const booking = await Booking.findOneAndUpdate(
//       { booking_id: req.params.id },
//       { status },
//       { new: true }
//     );
    
//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }
    
//     res.status(200).json(booking);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating booking status', error: error.message });
//   }
// };

// exports.getUserBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ user_id: req.params.userId });
//     res.status(200).json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user bookings', error: error.message });
//   }
// };
// src/controllers/booking.controller.js
const Booking = require('../models/booking.model');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

// Use environment variable from .env
const SPRING_BOOT_API_URL = process.env.SPRING_BOOT_API_URL || 'http://localhost:8080';

exports.createBooking = async (req, res) => {
  try {
    const { user_id, event_id } = req.body;
    
    // Extract token from request header for authorization to Spring Boot API
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }
    
    // Validate that event exists via Spring Boot API
    try {
      const eventResponse = await axios.get(`${SPRING_BOOT_API_URL}/api/events/${event_id}`, {
        headers: {
          'Authorization': token
        }
      });
      
      // If we get here, the event exists
      console.log(`Event verified: ${event_id}`);
      
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 404) {
          return res.status(404).json({ message: 'Event not found' });
        } else if (error.response.status === 401 || error.response.status === 403) {
          return res.status(error.response.status).json({ 
            message: 'Authentication error when verifying event'
          });
        }
        return res.status(error.response.status).json({ 
          message: 'Error verifying event',
          details: error.response.data
        });
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Spring Boot API unavailable:', error.message);
        return res.status(503).json({ message: 'Event service unavailable' });
      } else {
        // Something happened in setting up the request
        console.error('Error setting up request:', error.message);
        return res.status(500).json({ message: 'Internal service error' });
      }
    }
    
    // Create booking
    const booking = new Booking({
      booking_id: uuidv4(),
      user_id,
      event_id,
      status: 'PENDING',
      payment_status: 'UNPAID'
    });
    
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
    
  } catch (error) {
    console.error('Booking creation error:', error);
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

// No changes needed for the other controller methods
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
};

exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({ booking_id: req.params.id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const booking = await Booking.findOneAndUpdate(
      { booking_id: req.params.id },
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking status', error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user_id: req.params.userId });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user bookings', error: error.message });
  }
};