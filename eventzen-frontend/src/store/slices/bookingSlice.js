
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import bookingService from '../../services/booking.service';
// import { nodeApi } from '../../services/api';

// // Async thunks
// export const fetchBookings = createAsyncThunk(
//   'bookings/fetchBookings',
//   async (filters, { rejectWithValue }) => {
//     try {
//       const response = await nodeApi.get('/bookings', { params: filters });
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch bookings');
//     }
//   }
// );

// export const fetchBookingById = createAsyncThunk(
//   'bookings/fetchBookingById',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await nodeApi.get(`/bookings/${id}`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to fetch booking');
//     }
//   }
// );
// export const fetchUserBookings = createAsyncThunk(
//   'booking/fetchUserBookings',
//   async (userId, { rejectWithValue }) => {
//     try {
//       const response = await bookingService.getUserBookings(userId);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
//     }
//   }
// );
// export const createBooking = createAsyncThunk(
//   'bookings/createBooking',
//   async (bookingData, { rejectWithValue }) => {
//     try {
//       const response = await nodeApi.post('/bookings', bookingData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to create booking');
//     }
//   }
// );

// export const updateBooking = createAsyncThunk(
//   'bookings/updateBooking',
//   async ({ id, bookingData }, { rejectWithValue }) => {
//     try {
//       const response = await nodeApi.put(`/bookings/${id}`, bookingData);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to update booking');
//     }
//   }
// );

// export const cancelBooking = createAsyncThunk(
//   'bookings/cancelBooking',
//   async (id, { rejectWithValue }) => {
//     try {
//       const response = await nodeApi.delete(`/bookings/${id}`);
//       return { id };
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Failed to cancel booking');
//     }
//   }
// );

// // Add missing createBookingSuccess action
// export const createBookingSuccess = (booking) => {
//   return {
//     type: 'bookings/createBookingSuccess',
//     payload: booking
//   };
// };

// const initialState = {
//   bookings: [],
//   currentBooking: null,
//   loading: false,
//   error: null,
//   success: false
// };

// // Booking slice
// const bookingSlice = createSlice({
//   name: 'bookings',
//   initialState: {
//     bookings: [],
//     currentBooking: null,
//     loading: false,
//     error: null,
    
//   },
//   reducers: {
//     clearCurrentBooking: (state) => {
//       state.currentBooking = null;
//     },
//     resetBookingState: (state) => {
//       state.error = null;
//       state.success = false;
//   }},
//   extraReducers: (builder) => {
//     builder
//     .addCase(fetchUserBookings.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     })
//     .addCase(fetchUserBookings.fulfilled, (state, action) => {
//       state.loading = false;
//       state.bookings = action.payload;
//     })
//     .addCase(fetchUserBookings.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     })
  
//       // Handle fetchBookings
//       .addCase(fetchBookings.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchBookings.fulfilled, (state, action) => {
//         state.bookings = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(fetchBookings.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle fetchBookingById
//       .addCase(fetchBookingById.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(fetchBookingById.fulfilled, (state, action) => {
//         state.currentBooking = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(fetchBookingById.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Handle other actions...
//       .addCase(createBooking.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(createBooking.fulfilled, (state, action) => {
//         state.bookings.push(action.payload);
//         state.currentBooking = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(createBooking.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateBooking.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(updateBooking.fulfilled, (state, action) => {
//         const index = state.bookings.findIndex(booking => booking.id === action.payload.id);
//         if (index !== -1) {
//           state.bookings[index] = action.payload;
//         }
//         state.currentBooking = action.payload;
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(updateBooking.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(cancelBooking.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(cancelBooking.fulfilled, (state, action) => {
//         state.bookings = state.bookings.filter(booking => booking.id !== action.payload.id);
//         if (state.currentBooking && state.currentBooking.id === action.payload.id) {
//           state.currentBooking = null;
//         }
//         state.loading = false;
//         state.error = null;
//       })
//       .addCase(cancelBooking.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       // Add case for createBookingSuccess action
//       .addCase('bookings/createBookingSuccess', (state, action) => {
//         state.bookings.push(action.payload);
//         state.currentBooking = action.payload;
//         state.loading = false;
//         state.error = null;
//       });
//   }
// });

// export const { resetBookingState } = bookingSlice.actions;
// export const { clearCurrentBooking } = bookingSlice.actions;
// export default bookingSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import bookingService from '../../services/booking.service';

// Async thunks
export const fetchBookings = createAsyncThunk(
  'bookings/fetchBookings',
  async (filters, { rejectWithValue }) => {
    try {
      const response = await bookingService.getBookings(filters);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch bookings');
    }
  }
);

export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await bookingService.getBookingById(id);
      return response;
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
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch bookings');
    }
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await bookingService.createBooking(bookingData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to create booking');
    }
  }
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ id, bookingData }, { rejectWithValue }) => {
    try {
      const response = await bookingService.updateBooking(id, bookingData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to update booking');
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (id, { rejectWithValue }) => {
    try {
      await bookingService.cancelBooking(id);
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
  initialState,
  reducers: {
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    },
    resetBookingState: (state) => {
      state.error = null;
      state.success = false;
    }
  },
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
        state.success = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
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
        state.success = true;
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
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
        state.success = true;
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      // Add case for createBookingSuccess action
      .addCase('bookings/createBookingSuccess', (state, action) => {
        state.bookings.push(action.payload);
        state.currentBooking = action.payload;
        state.loading = false;
        state.error = null;
        state.success = true;
      });
  }
});

export const { resetBookingState, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer;