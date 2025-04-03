// src/controllers/feedback.controller.js
const Feedback = require('../models/feedback.model');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

// Configuration for Spring Boot API
const SPRING_API_URL = process.env.SPRING_API_URL || 'http://localhost:8080/api';

exports.submitFeedback = async (req, res) => {
  try {
    const { event_id, user_id, rating, comment } = req.body;
    
    // Validate that event exists via Spring Boot API
    try {
      const eventResponse = await axios.get(`${SPRING_API_URL}/events/${event_id}`);
      if (!eventResponse.data) {
        return res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      return res.status(404).json({ message: 'Event not found or service unavailable' });
    }
    
    const feedback = new Feedback({
      feedback_id: uuidv4(),
      event_id,
      user_id,
      rating,
      comment
    });
    
    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback', error: error.message });
  }
};

exports.getEventFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ event_id: req.params.eventId });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};

exports.getUserFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({ user_id: req.params.userId });
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user feedback', error: error.message });
  }
};