// src/store/slices/feedbackSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import feedbackService from '../../services/feedback.service';

export const submitFeedback = createAsyncThunk(
  'feedback/submitFeedback',
  async (feedbackData, { rejectWithValue }) => {
    try {
      const response = await feedbackService.submitFeedback(feedbackData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to submit feedback');
    }
  }
);

export const fetchFeedbackForEvent = createAsyncThunk(
  'feedback/fetchFeedbackForEvent',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await feedbackService.getFeedbackForEvent(eventId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch feedback');
    }
  }
);

export const fetchUserFeedback = createAsyncThunk(
  'feedback/fetchUserFeedback',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await feedbackService.getUserFeedback(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user feedback');
    }
  }
);

const feedbackSlice = createSlice({
  name: 'feedback',
  initialState: {
    feedbackItems: [],
    loading: false,
    error: null,
    success: false
  },
  reducers: {
    clearFeedbackState: (state) => {
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle submitFeedback
      .addCase(submitFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbackItems.push(action.payload);
        state.success = true;
      })
      .addCase(submitFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Handle fetchFeedbackForEvent
      .addCase(fetchFeedbackForEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeedbackForEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbackItems = action.payload;
      })
      .addCase(fetchFeedbackForEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchUserFeedback
      .addCase(fetchUserFeedback.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserFeedback.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbackItems = action.payload;
      })
      .addCase(fetchUserFeedback.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearFeedbackState } = feedbackSlice.actions;
export default feedbackSlice.reducer;