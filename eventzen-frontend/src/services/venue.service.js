// src/services/venue.service.js
import { springApi } from './api';

const VenueService = {
  getAllVenues: async () => {
    return await springApi.get('/venues');
  },
  
  getVenueById: async (id) => {
    return await springApi.get(`/venues/${id}`);
  },
  
  createVenue: async (venueData) => {
    return await springApi.post('/venues', venueData);
  },
  
  updateVenue: async (id, venueData) => {
    return await springApi.put(`/venues/${id}`, venueData);
  },
  
  deleteVenue: async (id) => {
    return await springApi.delete(`/venues/${id}`);
  }
};

export default VenueService;