// src/store/slices/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookings: [],
  currentBooking: null,
  isLoading: false,
  error: null
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    fetchBookingsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchBookingsSuccess: (state, action) => {
      state.isLoading = false;
      state.bookings = action.payload;
    },
    fetchBookingsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCurrentBooking: (state, action) => {
      state.currentBooking = action.payload;
    },
    createBookingSuccess: (state, action) => {
      state.bookings.push(action.payload);
      state.currentBooking = action.payload;
    },
    updateBookingSuccess: (state, action) => {
      state.bookings = state.bookings.map(booking => 
        booking.booking_id === action.payload.booking_id ? action.payload : booking
      );
      if (state.currentBooking && state.currentBooking.booking_id === action.payload.booking_id) {
        state.currentBooking = action.payload;
      }
    }
  }
});

export const {
  fetchBookingsStart,
  fetchBookingsSuccess,
  fetchBookingsFailure,
  setCurrentBooking,
  createBookingSuccess,
  updateBookingSuccess
} = bookingSlice.actions;

export default bookingSlice.reducer;