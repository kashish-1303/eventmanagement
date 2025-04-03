// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import eventReducer from './slices/eventSlice';
import bookingReducer from './slices/bookingSlice';
// Import additional reducers as you create them
import venueReducer from './slices/venueSlice';
import feedbackReducer from './slices/feedbackSlice';
import paymentReducer from './slices/paymentSlice';
import attendeeReducer from './slices/attendeeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
    bookings: bookingReducer,
    // Add other reducers as you create them
    venues: venueReducer,
    feedback: feedbackReducer,
    payments: paymentReducer,
    attendees: attendeeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['your-non-serializable-action-type'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['items.dates'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;