
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { springApi } from '../../services/api';
import EventService from '../../services/event.service';

// Async thunks
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await springApi.get('/events', { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch events');
    }
  }
);

// export const fetchEventById = createAsyncThunk(
//   'events/fetchEventById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await springApi.get(`/events/${id}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch event');
//     }
//   }
// );

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (id, { rejectWithValue }) => {
    try {
      console.log("Fetching event with ID:", id);
      const response = await springApi.get(`/events/${id}`);
      console.log("API Response for event:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching event:", error);
      // Extract more detailed error information
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          'Failed to fetch event';
      return rejectWithValue(errorMessage);
    }
  }
);

export const fetchEventDetails = createAsyncThunk(
  'events/fetchEventDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await springApi.get(`/events/${id}`); // Remove /details
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch event details');
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await springApi.post('/events', eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create event');
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ id, eventData }, { rejectWithValue }) => {
    try {
      const response = await springApi.put(`/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update event');
    }
  }
);

// Event slice
const eventSlice = createSlice({
  name: 'events',
  initialState: {
    events: [],
    currentEvent: null,
    loading: false,
    error: null
  },
  reducers: {
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
      })
      // .addCase(fetchEventById.fulfilled, (state, action) => {
      //   state.currentEvent = action.payload;
      //   state.loading = false;
      //   state.error = null;
      // })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        console.log("fetchEventById fulfilled with data:", action.payload);
        state.currentEvent = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        console.error("fetchEventById rejected with error:", action.payload);
        state.loading = false;
        state.error = action.payload;
        state.currentEvent = null; // Reset current event on error
      })
      .addCase(fetchEventDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.currentEvent = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.events.push(action.payload);
        state.loading = false;
        state.error = null;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(event => event.id === action.payload.id);
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        state.currentEvent = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearCurrentEvent } = eventSlice.actions;
export default eventSlice.reducer;