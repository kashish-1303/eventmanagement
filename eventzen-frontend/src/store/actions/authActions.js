// src/store/actions/authActions.js
import authService from '../../services/auth.service';
import { login, logout } from '../slices/authSlice';

// Note: These are wrapper functions for the thunks created in authSlice.js
// They're useful if you want to dispatch multiple actions or perform side effects

export const loginUser = (credentials) => async (dispatch) => {
  try {
    return dispatch(login(credentials)).unwrap();
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const logoutUser = () => (dispatch) => {
  // Clear any additional data or perform cleanup
  authService.logout(); // Call the service to clear tokens on server if needed
  dispatch(logout());
};

export const registerUser = (userData) => async (dispatch) => {
  try {
    const response = await authService.register(userData);
    // You could automatically log in the user after registration
    if (response.data && response.data.token) {
      dispatch(login({
        email: userData.email,
        password: userData.password
      }));
    }
    return response.data;
  } catch (error) {
    console.error('Registration failed:', error);
    throw error;
  }
};