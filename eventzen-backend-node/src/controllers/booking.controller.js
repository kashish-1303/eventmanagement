// src/controllers/booking.controller.js
const Booking = require('../models/booking.model');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

// Configuration for Spring Boot API
const SPRING_API_URL = process.env.SPRING_API_URL || 'http://localhost:8080/api';

exports.createBooking = async (req, res) => {
  try {
    const { user_id, event_id } = req.body;
    
    // Validate that event exists via Spring Boot API
    try {
      const eventResponse = await axios.get(`${SPRING_API_URL}/events/${event_id}`);
      if (!eventResponse.data) {
        return res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      return res.status(404).json({ message: 'Event not found or service unavailable' });
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
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
};

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