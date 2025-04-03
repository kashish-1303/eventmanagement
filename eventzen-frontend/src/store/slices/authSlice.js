// // src/store/slices/authSlice.js
// import { createSlice } from '@reduxjs/toolkit';

// const userString = localStorage.getItem('user');
// const user = userString ? JSON.parse(userString) : null;

// const initialState = {
//   user: user,
//   isLoggedIn: !!user,
//   isLoading: false,
//   error: null
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loginStart: (state) => {
//       state.isLoading = true;
//       state.error = null;
//     },
//     loginSuccess: (state, action) => {
//       state.isLoading = false;
//       state.isLoggedIn = true;
//       state.user = action.payload;
//       state.error = null;
//     },
//     loginFailure: (state, action) => {
//       state.isLoading = false;
//       state.isLoggedIn = false;
//       state.error = action.payload;
//     },
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.user = null;
//     }
//   }
// });

// export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
// export default authSlice.reducer;

// src/store/slices/authSlice.js
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import authService from '../../services/auth.service';

// export const login = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await authService.login(credentials);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Login failed');
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: null,
//     token: localStorage.getItem('token') || null,
//     isLoggedIn: !!localStorage.getItem('token'),
//     loading: false,
//     error: null
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       state.token = null;
//       state.isLoggedIn = false;
//       localStorage.removeItem('token');
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isLoggedIn = true;
//         state.user = action.payload.user;
//         state.token = action.payload.token;
//         localStorage.setItem('token', action.payload.token);
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';

// Async thunks
export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    authService.logout();
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await authService.updateUserProfile(userId, userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
    }
  }
);

// Initial state
const initialState = {
  user: authService.getCurrentUser(),
  isAuthenticated: !!authService.getToken(),
  loading: false,
  error: null
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        // Note: We don't authenticate the user here - they need to login after registration
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Logout cases
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      
      // Update profile cases
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;