// // src/services/event.service.js
// import { springApi } from './api';

// const EventService = {
//   getAllEvents: async (params) => {
//     return await springApi.get('/events', { params });
//   },
  
//   getEventById: async (id) => {try {
//     const response = await api.get(`/events/${eventId}`);
//     return response.data;
//   } catch (error) {
//     throw new Error(error.response?.data?.message || 'Failed to fetch event details');
//   }},
  
//   createEvent: async (eventData) => {
//     return await springApi.post('/events', eventData);
//   },
  
//   updateEvent: async (id, eventData) => {
//     return await springApi.put(`/events/${id}`, eventData);
//   },
  
//   deleteEvent: async (id) => {
//     return await springApi.delete(`/events/${id}`);
//   },
  
//   getEventsByCategory: async (category) => {
//     return await springApi.get(`/events/category/${category}`);
//   }
// };

// export default EventService;

// src/services/event.service.js
import { springApi } from './api';

const getEventById = async (id) => {
  try {
    const response = await springApi.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch event details');
  }
};

const EventService = {
  getAllEvents: async (params) => {
    return await springApi.get('/events', { params });
  },
  
  getEventById,
  
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

export { getEventById };
export default EventService;