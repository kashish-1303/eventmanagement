// src/controllers/attendee.controller.js
const Attendee = require('../models/attendee.model');
const Booking = require('../models/booking.model');
const { v4: uuidv4 } = require('uuid');

exports.addAttendee = async (req, res) => {
  try {
    const { booking_id, name, email } = req.body;
    
    // Check if booking exists
    const booking = await Booking.findOne({ booking_id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    const attendee = new Attendee({
      attendee_id: uuidv4(),
      booking_id,
      name,
      email
    });
    
    const savedAttendee = await attendee.save();
    res.status(201).json(savedAttendee);
  } catch (error) {
    res.status(500).json({ message: 'Error adding attendee', error: error.message });
  }
};

exports.getAttendeesByBooking = async (req, res) => {
  try {
    const attendees = await Attendee.find({ booking_id: req.params.bookingId });
    res.status(200).json(attendees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendees', error: error.message });
  }
};

exports.updateAttendee = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const attendee = await Attendee.findOneAndUpdate(
      { attendee_id: req.params.id },
      { name, email },
      { new: true }
    );
    
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }
    
    res.status(200).json(attendee);
  } catch (error) {
    res.status(500).json({ message: 'Error updating attendee', error: error.message });
  }
};

exports.deleteAttendee = async (req, res) => {
  try {
    const attendee = await Attendee.findOneAndDelete({ attendee_id: req.params.id });
    
    if (!attendee) {
      return res.status(404).json({ message: 'Attendee not found' });
    }
    
    res.status(200).json({ message: 'Attendee removed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting attendee', error: error.message });
  }
};