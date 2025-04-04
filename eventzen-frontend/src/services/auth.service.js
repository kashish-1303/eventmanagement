
// import { springApi } from './api';

// const register = async (userData) => {
//   const response = await springApi.post('/auth/register', userData);
//   return response.data;
// };

// const login = async ({ email, password }) => {
//   const response = await springApi.post('/auth/login', { email, password });
//   if (response.data.token) {
//     localStorage.setItem('token', response.data.token);
//     localStorage.setItem('user', JSON.stringify(response.data.user));
//   }
//   return response.data;
// };

// // ... rest of the auth service functions

// const logout = () => {
//   localStorage.removeItem('token');
//   localStorage.removeItem('user');
// };

// const getCurrentUser = () => {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// };

// const getToken = () => {
//   return localStorage.getItem('token');
// };

// // Add missing updateUserProfile function
// const updateUserProfile = async (userId, userData) => {
//   const response = await nodeApi.put(`/users/${userId}/profile`, userData);
//   if (response.data) {
//     // Update stored user info
//     const currentUser = getCurrentUser();
//     const updatedUser = { ...currentUser, ...response.data };
//     localStorage.setItem('user', JSON.stringify(updatedUser));
//   }
//   return response.data;
// };

// export { register, login, logout, getCurrentUser, getToken, updateUserProfile };

// // Fix ESLint warning by assigning the object to a variable first
// const authService = {
//   register,
//   login,
//   logout,
//   getCurrentUser,
//   getToken,
//   updateUserProfile
// };

// export default authService;
import { springApi, nodeApi } from './api';

const register = async (userData) => {
  const response = await springApi.post('/auth/register', userData);
  return response.data;
};

const login = async ({ email, password }) => {
  const response = await springApi.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const getToken = () => {
  return localStorage.getItem('token');
};

const updateUserProfile = async (userId, userData) => {
  const response = await nodeApi.put(`/users/${userId}/profile`, userData);
  if (response.data) {
    // Update stored user info
    const currentUser = getCurrentUser();
    const updatedUser = { ...currentUser, ...response.data };
    localStorage.setItem('user', JSON.stringify(updatedUser));
  }
  return response.data;
};

export { register, login, logout, getCurrentUser, getToken, updateUserProfile };

// Fix ESLint warning by assigning the object to a variable first
const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getToken,
  updateUserProfile
};

export default authService;