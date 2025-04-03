// src/store/slices/eventSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  events: [],
  currentEvent: null,
  isLoading: false,
  error: null
};

const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    fetchEventsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchEventsSuccess: (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    },
    fetchEventsFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setCurrentEvent: (state, action) => {
      state.currentEvent = action.payload;
    }
  }
});

export const {
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsFailure,
  setCurrentEvent
} = eventSlice.actions;

export default eventSlice.reducer;