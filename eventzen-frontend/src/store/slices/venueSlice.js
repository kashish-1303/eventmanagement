// src/store/slices/venueSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import venueService from '../../services/venue.service';

export const fetchVenues = createAsyncThunk(
  'venues/fetchVenues',
  async (_, { rejectWithValue }) => {
    try {
      const response = await venueService.getAllVenues();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch venues');
    }
  }
);

export const fetchVenueById = createAsyncThunk(
  'venues/fetchVenueById',
  async (venueId, { rejectWithValue }) => {
    try {
      const response = await venueService.getVenueById(venueId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch venue');
    }
  }
);

const venueSlice = createSlice({
  name: 'venues',
  initialState: {
    venues: [],
    currentVenue: null,
    loading: false,
    error: null
  },
  reducers: {
    clearCurrentVenue: (state) => {
      state.currentVenue = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchVenues
      .addCase(fetchVenues.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVenues.fulfilled, (state, action) => {
        state.loading = false;
        state.venues = action.payload;
      })
      .addCase(fetchVenues.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchVenueById
      .addCase(fetchVenueById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVenueById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentVenue = action.payload;
      })
      .addCase(fetchVenueById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentVenue } = venueSlice.actions;
export default venueSlice.reducer;