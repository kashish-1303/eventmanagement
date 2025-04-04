// // src/store/index.js
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from './slices/authSlice';
// import eventReducer from './slices/eventSlice';
// import bookingReducer from './slices/bookingSlice';
// // Import additional reducers as you create them
// import venueReducer from './slices/venueSlice';
// import feedbackReducer from './slices/feedbackSlice';
// import paymentReducer from './slices/paymentSlice';
// import attendeeReducer from './slices/attendeeSlice';

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     events: eventReducer,
//     bookings: bookingReducer,
//     // Add other reducers as you create them
//     venues: venueReducer,
//     feedback: feedbackReducer,
//     payments: paymentReducer,
//     attendees: attendeeReducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         // Ignore these action types
//         ignoredActions: ['your-non-serializable-action-type'],
//         // Ignore these field paths in all actions
//         ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
//         // Ignore these paths in the state
//         ignoredPaths: ['items.dates'],
//       },
//     }),
//   devTools: process.env.NODE_ENV !== 'production',
// });

// export default store;
// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';



// Import your reducers
import authReducer from './slices/authSlice';
import eventReducer from './slices/eventSlice';
import venueReducer from './slices/venueSlice';
import bookingReducer from './slices/bookingSlice';
import attendeeReducer from './slices/attendeeSlice';
import feedbackReducer from './slices/feedbackSlice';
import paymentReducer from './slices/paymentSlice';

// Configuration for auth persistence
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['isAuthenticated', 'user'] // Only persist these fields
};

// Create the store with persistedReducers
// ... other imports

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    events: eventReducer,
    venues: venueReducer,
    bookings: bookingReducer,
    attendees: attendeeReducer,
    feedback: feedbackReducer,
    payments: paymentReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in these actions
        ignoredActions: ['persist/PERSIST']
      }
    })
});


export const persistor = persistStore(store);
export default store;