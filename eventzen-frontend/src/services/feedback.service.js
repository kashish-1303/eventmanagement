// src/services/feedback.service.js
import { nodeApi } from './api';

const FeedbackService = {
  submitFeedback: async (feedbackData) => {
    return await nodeApi.post('/feedback', feedbackData);
  },
  
  getEventFeedback: async (eventId) => {
    return await nodeApi.get(`/feedback/event/${eventId}`);
  },
  
  getUserFeedback: async (userId) => {
    return await nodeApi.get(`/feedback/user/${userId}`);
  }
};

export default FeedbackService;