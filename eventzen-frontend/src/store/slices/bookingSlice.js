// // src/store/slices/bookingSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   bookings: [],
//   currentBooking: null,
//   isLoading: false,
//   error: null
// };

// const bookingSlice = createSlice({
//   name: 'bookings',
//   initialState,
//   reducers: {
//     fetchBookingsStart: (state) => {
//       state.isLoading = true;
//       state.error = null;
//     },
//     fetchBookingsSuccess: (state, action) => {
//       state.isLoading = false;
//       state.bookings = action.payload;
//     },
//     fetchBookingsFailure: (state, action) => {
//       state.isLoading = false;
//       state.error = action.payload;
//     },
//     setCurrentBooking: (state, action) => {
//       state.currentBooking = action.payload;
//     },
//     createBookingSuccess: (state, action) => {
//       state.bookings.push(action.payload);
//       state.currentBooking = action.payload;
//     },
//     updateBookingSuccess: (state, action) => {
//       state.bookings = state.bookings.map(booking => 
//         booking.booking_id === action.payload.booking_id ? action.payload : booking
//       );
//       if (state.currentBooking && state.currentBooking.booking_id === action.payload.booking_id) {
//         state.currentBooking = action.payload;
//       }
//     }
//   }
// });

// export const {
//   fetchBookingsStart,
//   fetchBookingsSuccess,
//   fetchBookingsFailure,
//   setCurrentBooking,
//   createBookingSuccess,
//   updateBookingSuccess
// } = bookingSlice.actions;

// export default bookingSlice.reducer;

// src/store/slices/bookingSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import bookingService from '../../services/booking.service';

// export const fetchBookings = createAsyncThunk(
//   'bookings/fetchBookings',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await bookingService.getUserBookings();
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch bookings');
//     }
//   }
// );

// export const fetchBookingById = createAsyncThunk(
//   'bookings/fetchBookingById',
//   async (bookingId, { rejectWithValue }) => {
//     try {
//       const response = await bookingService.getBookingById(bookingId);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch booking');
//     }
//   }
// );

// export const createBooking = createAsyncThunk(
//   'bookings/createBooking',
//   async (bookingData, { rejectWithValue }) => {
//     try {
//       const response = await bookingService.createBooking(bookingData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to create booking');
//     }
//   }
// );

// export const updateBooking = createAsyncThunk(
//   'bookings/updateBooking',
//   async ({bookingId, bookingData}, { rejectWithValue }) => {
//     try {
//       const response = await bookingService.updateBooking(bookingId, bookingData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to update booking');
//     }
//   }
// );

// export const cancelBooking = createAsyncThunk(
//   'bookings/cancelBooking',
//   async (bookingId, { rejectWithValue }) => {
//     try {
//       const response = await bookingService.cancelBooking(bookingId);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to cancel booking');
//     }
//   }
// );

// const initialState = {
//   bookings: [],
//   currentBooking: null,
//   loading: false,
//   error: null
// };

// const bookingSlice = createSlice({
//   name: 'bookings',
//   initialState,
//   reducers: {
//     clearCurrentBooking: (state) => {
//       state.currentBooking = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Handle fetchBookings
//       .addCase(fetchBookings.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBookings.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bookings = action.payload;
//       })
//       .addCase(fetchBookings.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle fetchBookingById
//       .addCase(fetchBookingById.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchBookingById.fulfilled, (state, action) => {
//         state.loading = false;
//         state.currentBooking = action.payload;
//       })
//       .addCase(fetchBookingById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle createBooking
//       .addCase(createBooking.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(createBooking.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bookings.push(action.payload);
//         state.currentBooking = action.payload;
//       })
//       .addCase(createBooking.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle updateBooking
//       .addCase(updateBooking.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateBooking.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bookings = state.bookings.map(booking => 
//           booking.booking_id === action.payload.booking_id ? action.payload : booking
//         );
//         state.currentBooking = action.payload;
//       })
//       .addCase(updateBooking.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle cancelBooking
//       .addCase(cancelBooking.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(cancelBooking.fulfilled, (state, action) => {
//         state.loading = false;
//         state.bookings = state.bookings.map(booking => 
//           booking.booking_id === action.payload.booking_id ? action.payload : booking
//         );
//         if (state.currentBooking && state.currentBooking.booking_id === action.payload.booking_id) {
//           state.currentBooking = action.payload;
//         }
//       })
//       .addCase(cancelBooking.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { clearCurrentBooking } = bookingSlice.actions;
// export default bookingSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingService from '../../services/booking.service';
import { nodeApi } from '../../services/api';

// Async thunks
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await nodeApi.get('/bookings', { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch bookings');
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await nodeApi.get(`/bookings/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch booking');
    }
  }
);
export const fetchUserBookings = createAsyncThunk(
  'booking/fetchUserBookings',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await bookingService.getUserBookings(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await nodeApi.post('/bookings', bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create booking');
    }
  }
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ id, bookingData }, { rejectWithValue }) => {
    try {
      const response = await nodeApi.put(`/bookings/${id}`, bookingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update booking');
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (id, { rejectWithValue }) => {
    try {
      const response = await nodeApi.delete(`/bookings/${id}`);
      return { id };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to cancel booking');
    }
  }
);

// Add missing createBookingSuccess action
export const createBookingSuccess = (booking) => {
  return {
    type: 'bookings/createBookingSuccess',
    payload: booking
  };
};

const initialState = {
  bookings: [],
  currentBooking: null,
  loading: false,
  error: null,
  success: false
};

// Booking slice
const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    currentBooking: null,
    loading: false,
    error: null,
    
  },
  reducers: {
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    resetBookingState: (state) => {
      state.error = null;
      state.success = false;
  }},
  extraReducers: (builder) => {
    builder
    .addCase(fetchUserBookings.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchUserBookings.fulfilled, (state, action) => {
      state.loading = false;
      state.bookings = action.payload;
    })
    .addCase(fetchUserBookings.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
  
      // Handle fetchBookings
      .addCase(fetchBookings.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.bookings = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle fetchBookingById
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.currentBooking = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle other actions...
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.bookings.push(action.payload);
        state.currentBooking = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
        if (index !== -1) {
          state.bookings[index] = action.payload;
        }
        state.currentBooking = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.bookings = state.bookings.filter(booking => booking.id !== action.payload.id);
        if (state.currentBooking && state.currentBooking.id === action.payload.id) {
          state.currentBooking = null;
        }
        state.loading = false;
        state.error = null;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add case for createBookingSuccess action
      .addCase('bookings/createBookingSuccess', (state, action) => {
        state.bookings.push(action.payload);
        state.currentBooking = action.payload;
        state.loading = false;
        state.error = null;
      });
  }
});

export const { resetBookingState } = bookingSlice.actions;
export const { clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;