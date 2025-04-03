// src/store/slices/paymentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import paymentService from '../../services/payment.service';

export const createPayment = createAsyncThunk(
  'payments/createPayment',
  async (paymentData, { rejectWithValue }) => {
    try {
      const response = await paymentService.createPayment(paymentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Payment failed');
    }
  }
);

export const fetchPaymentsByBookingId = createAsyncThunk(
  'payments/fetchPaymentsByBookingId',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await paymentService.getPaymentsByBookingId(bookingId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch payments');
    }
  }
);

const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    payments: [],
    currentPayment: null,
    loading: false,
    error: null
  },
  reducers: {
    setCurrentPayment: (state, action) => {
      state.currentPayment = action.payload;
    },
    clearPaymentState: (state) => {
      state.currentPayment = null;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle createPayment
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPayment = action.payload;
        state.payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchPaymentsByBookingId
      .addCase(fetchPaymentsByBookingId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentsByBookingId.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchPaymentsByBookingId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setCurrentPayment, clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;