

// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import authService from '../../services/auth.service';

// // Async thunks
// export const register = createAsyncThunk(
//   'auth/register',
//   async (userData, { rejectWithValue }) => {
//     try {
//       const response = await authService.register(userData);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Registration failed');
//     }
//   }
// );

// export const login = createAsyncThunk(
//   'auth/login',
//   async (credentials, { rejectWithValue }) => {
//     try {
//       const response = await authService.login(credentials);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Login failed');
//     }
//   }
// );

// export const logout = createAsyncThunk(
//   'auth/logout',
//   async () => {
//     authService.logout();
//   }
// );

// export const updateProfile = createAsyncThunk(
//   'auth/updateProfile',
//   async ({ userId, userData }, { rejectWithValue }) => {
//     try {
//       const response = await authService.updateUserProfile(userId, userData);
//       return response;
//     } catch (error) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to update profile');
//     }
//   }
// );

// // Initial state
// const initialState = {
//   user: authService.getCurrentUser(),
//   isAuthenticated: !!authService.getToken(),
//   loading: false,
//   error: null
// };

// // Auth slice
// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       // Register cases
//       .addCase(register.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         state.loading = false;
//         // Note: We don't authenticate the user here - they need to login after registration
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Login cases
//       .addCase(login.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         state.loading = false;
//         state.isAuthenticated = true;
//         state.user = action.payload.user;
//         // state.error = null;
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
      
//       // Logout cases
//       .addCase(logout.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(logout.fulfilled, (state) => {
//         state.loading = false;
//         state.isAuthenticated = false;
//         state.user = null;
//       })
      
//       // Update profile cases
//       .addCase(updateProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = { ...state.user, ...action.payload };
//         // state.error = null;
//       })
//       .addCase(updateProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   }
// });

// export const { clearError } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';

// Debug function
const debugAuth = (message, state) => {
  console.log(`AUTH DEBUG: ${message}`, {
    isAuthenticated: state.isAuthenticated,
    user: state.user,
    token: authService.getToken()
  });
};

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
      console.log("Login response:", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    console.log("Logging out...");
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

console.log("Auth initial state:", initialState);

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
        debugAuth("Register fulfilled", state);
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        debugAuth("Register rejected", state);
      })
      
      // Login cases
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        debugAuth("Login pending", state);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        debugAuth("Login fulfilled", state);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        debugAuth("Login rejected", state);
      })
      
      // Logout cases
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        debugAuth("Logout fulfilled", state);
      })
      
      // Update profile cases
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = { ...state.user, ...action.payload };
        debugAuth("Update profile fulfilled", state);
      });
  }
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;