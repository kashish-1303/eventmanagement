// src/models/attendee.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendeeSchema = new Schema({
  attendee_id: {
    type: String,
    required: true,
    unique: true
  },
  booking_id: {
    type: String,
    required: true,
    ref: 'Booking'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Attendee', AttendeeSchema);