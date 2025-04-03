// src/services/attendee.service.js
import { nodeApi } from './api';

const AttendeeService = {
  addAttendee: async (attendeeData) => {
    return await nodeApi.post('/attendees', attendeeData);
  },
  
  getAttendeesByBooking: async (bookingId) => {
    return await nodeApi.get(`/attendees/booking/${bookingId}`);
  },
  
  updateAttendee: async (id, attendeeData) => {
    return await nodeApi.patch(`/attendees/${id}`, attendeeData);
  },
  
  deleteAttendee: async (id) => {
    return await nodeApi.delete(`/attendees/${id}`);
  }
};

export default AttendeeService;