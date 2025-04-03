// src/services/index.js
import { springApi, nodeApi } from './api';
import authService from './auth.service';
import eventService from './event.service';
import venueService from './venue.service';
import bookingService from './booking.service';
import paymentService from './payment.service';
import feedbackService from './feedback.service';
import dashboardService from './dashboard.service';
import attendeeService from './attendee.service';

export {
  springApi,
  nodeApi,
  authService,
  eventService,
  venueService,
  bookingService,
  paymentService,
  feedbackService,
  dashboardService,
  attendeeService
};