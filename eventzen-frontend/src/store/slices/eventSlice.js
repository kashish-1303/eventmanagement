// // src/store/slices/eventSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   events: [],
//   currentEvent: null,
//   isLoading: false,
//   error: null
// };

// const eventSlice = createSlice({
//   name: 'events',
//   initialState,
//   reducers: {
//     fetchEventsStart: (state) => {
//       state.isLoading = true;
//       state.error = null;
//     },
//     fetchEventsSuccess: (state, action) => {
//       state.isLoading = false;
//       state.events = action.payload;
//     },
//     fetchEventsFailure: (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//     setCurrentEvent: (state, action) => {
//       state.currentEvent = action.payload;
//     }
//   }
// });

// export const {
//   fetchEventsStart,
//   fetchEventsSuccess,
//   fetchEventsFailure,
//   setCurrentEvent
// } = eventSlice.actions;

// export default eventSlice.reducer;

// src/store/slices/eventSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import eventService from '../../services/event.service';

// export const fetchEvents = createAsyncThunk(
//   'events/fetchEvents',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await eventService.getAllEvents();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch events');
//     }
//   }
// );

// export const fetchEventById = createAsyncThunk(
//   'events/fetchEventById',
//   async (eventId, { rejectWithValue }) => {
//     try {
//       const response = await eventService.getEventById(eventId);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch event');
//     }
//   }
// );

// export const createEvent = createAsyncThunk(
//   'events/createEvent',
//   async (eventData, { rejectWithValue }) => {
//     try {
//       const response = await eventService.createEvent(eventData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to create event');
//     }
//   }
// );

// export const updateEvent = createAsyncThunk(
//   'events/updateEvent',
//   async ({eventId, eventData}, { rejectWithValue }) => {
//     try {
//       const response = await eventService.updateEvent(eventId, eventData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to update event');
//     }
//   }
// );

// const initialState = {
//   events: [],
//   currentEvent: null,
//   loading: false,
//   error: null
// };

// const eventSlice = createSlice({
//   name: 'events',
//   initialState,
//   reducers: {
//     clearCurrentEvent: (state) => {
//       state.currentEvent = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle fetchEvents
//       .addCase(fetchEvents.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEvents.fulfilled, (state, action) => {
//         state.loading = false;
//         state.events = action.payload;
//       })
//       .addCase(fetchEvents.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle fetchEventById
//       .addCase(fetchEventById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchEventById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentEvent = action.payload;
//       })
//       .addCase(fetchEventById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle createEvent
//       .addCase(createEvent.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createEvent.fulfilled, (state, action) => {
//         state.loading = false;
//         state.events.push(action.payload);
//         state.currentEvent = action.payload;
//       })
//       .addCase(createEvent.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle updateEvent
//       .addCase(updateEvent.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateEvent.fulfilled, (state, action) => {
//         state.loading = false;
//         state.events = state.events.map(event => 
//           event.event_id === action.payload.event_id ? action.payload : event
//         );
//         state.currentEvent = action.payload;
//       })
//       .addCase(updateEvent.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { clearCurrentEvent } = eventSlice.actions;
// export default eventSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { nodeApi } from '../../services/api';

// Async thunks
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await nodeApi.get('/events', { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch events');
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await nodeApi.get(`/events/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch event');
    }
  }
);

// Add the missing fetchEventDetails function
export const fetchEventDetails = createAsyncThunk(
  'events/fetchEventDetails',
  async (id, { rejectWithValue }) => {
    try {
      const response = await nodeApi.get(`/events/${id}/details`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch event details');
    }
  }
);

export const createEvent = createAsyncThunk(
  'events/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await nodeApi.post('/events', eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create event');
    }
  }
);

export const updateEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ id, eventData }, { rejectWithValue }) => {
    try {
      const response = await nodeApi.put(`/events/${id}`, eventData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update event');
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
    error: null,
  },
  reducers: {
    clearCurrentEvent: (state) => {
      state.currentEvent = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchEvents
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
      // Handle fetchEventById
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.currentEvent = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchEventDetails
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
      // Handle other actions...
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