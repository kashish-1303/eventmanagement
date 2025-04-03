// src/services/event.service.js
import { springApi } from './api';

const EventService = {
  getAllEvents: async (params) => {
    return await springApi.get('/events', { params });
  },
  
  getEventById: async (id) => {
    return await springApi.get(`/events/${id}`);
  },
  
  createEvent: async (eventData) => {
    return await springApi.post('/events', eventData);
  },
  
  updateEvent: async (id, eventData) => {
    return await springApi.put(`/events/${id}`, eventData);
  },
  
  deleteEvent: async (id) => {
    return await springApi.delete(`/events/${id}`);
  },
  
  getEventsByCategory: async (category) => {
    return await springApi.get(`/events/category/${category}`);
  }
};

export default EventService;