// src/models/booking.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  booking_id: {
    type: String,
    required: true,
    unique: true
  },
  user_id: {
    type: String,
    required: true,
    ref: 'User' // Reference to user in Spring Boot (will need API integration)
  },
  event_id: {
    type: String,
    required: true,
    ref: 'Event' // Reference to event in Spring Boot (will need API integration)
  },
  status: {
    type: String,
    enum: ['PENDING', 'CONFIRMED', 'CANCELLED'],
    default: 'PENDING'
  },
  payment_status: {
    type: String,
    enum: ['PAID', 'UNPAID', 'FAILED'],
    default: 'UNPAID'
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Booking', BookingSchema);