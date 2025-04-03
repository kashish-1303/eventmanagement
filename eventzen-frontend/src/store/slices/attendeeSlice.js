// src/store/slices/attendeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import attendeeService from '../../services/attendee.service';

export const addAttendee = createAsyncThunk(
  'attendees/addAttendee',
  async (attendeeData, { rejectWithValue }) => {
    try {
      const response = await attendeeService.addAttendee(attendeeData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to add attendee');
    }
  }
);

export const fetchAttendeesByBookingId = createAsyncThunk(
  'attendees/fetchAttendeesByBookingId',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await attendeeService.getAttendeesByBookingId(bookingId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch attendees');
    }
  }
);

export const removeAttendee = createAsyncThunk(
  'attendees/removeAttendee',
  async (attendeeId, { rejectWithValue }) => {
    try {
      await attendeeService.removeAttendee(attendeeId);
      return attendeeId;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to remove attendee');
    }
  }
);

const attendeeSlice = createSlice({
  name: 'attendees',
  initialState: {
    attendees: [],
    loading: false,
    error: null
  },
  reducers: {
    clearAttendees: (state) => {
      state.attendees = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle addAttendee
      .addCase(addAttendee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addAttendee.fulfilled, (state, action) => {
        state.loading = false;
        state.attendees.push(action.payload);
      })
      .addCase(addAttendee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchAttendeesByBookingId
      .addCase(fetchAttendeesByBookingId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendeesByBookingId.fulfilled, (state, action) => {
        state.loading = false;
        state.attendees = action.payload;
      })
      .addCase(fetchAttendeesByBookingId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle removeAttendee
      .addCase(removeAttendee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeAttendee.fulfilled, (state, action) => {
        state.loading = false;
        state.attendees = state.attendees.filter(
          attendee => attendee.attendee_id !== action.payload
        );
      })
      .addCase(removeAttendee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearAttendees } = attendeeSlice.actions;
export default attendeeSlice.reducer;