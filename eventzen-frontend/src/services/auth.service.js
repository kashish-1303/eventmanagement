// // src/services/auth.service.js
// import { springApi } from './api';

// const AuthService = {
//   login: async (credentials) => {
//     const response = await springApi.post('/auth/login', credentials);
//     if (response.data.token) {
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//     }
//     return response.data;
//   },
  
//   register: async (userData) => {
//     return await springApi.post('/auth/register', userData);
//   },
  
//   logout: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   },
  
//   getCurrentUser: () => {
//     const userStr = localStorage.getItem('user');
//     return userStr ? JSON.parse(userStr) : null;
//   }
// };

// export default AuthService;

// src/services/auth.service.js
// import { springApi } from './api';

// const AuthService = {
//   login: async (credentials) => {
//     const response = await springApi.post('/auth/login', credentials);
//     if (response.data.token) {
//       localStorage.setItem('token', response.data.token);
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//     }
//     return response.data;
//   },
  
//   register: async (userData) => {
//     const response = await springApi.post('/auth/register', userData);
//     return response.data;
//   },
  
//   logout: () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   },
  
//   getCurrentUser: () => {
//     const userStr = localStorage.getItem('user');
//     return userStr ? JSON.parse(userStr) : null;
//   },
  
//   updateUserProfile: async (userData) => {
//     const response = await springApi.put('/auth/profile', userData);
    
//     // Update the stored user data if update was successful
//     if (response.data && response.data.user) {
//       localStorage.setItem('user', JSON.stringify(response.data.user));
//     }
    
//     return response.data;
//   },
  
//   changePassword: async (passwordData) => {
//     const response = await springApi.post('/auth/change-password', passwordData);
//     return response.data;
//   },
  
//   checkAuth: async () => {
//     const response = await springApi.get('/auth/check');
//     return response.data;
//   }
// };

// export default AuthService;

// import { nodeApi } from './api';

// const register = async (userData) => {
//   const response = await nodeApi.post('/auth/register', userData);
//   return response.data;
// };

// const login = async ({ email, password }) => {
//   const response = await nodeApi.post('/auth/login', { email, password });
//   if (response.data.token) {
//     localStorage.setItem('token', response.data.token);
//     localStorage.setItem('user', JSON.stringify(response.data.user));
//   }
//   return response.data;
// };

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

// export default {
//   register,
//   login,
//   logout,
//   getCurrentUser,
//   getToken,
//   updateUserProfile
// };
import { nodeApi } from './api';

const register = async (userData) => {
  const response = await nodeApi.post('/auth/register', userData);
  return response.data;
};

const login = async ({ email, password }) => {
  const response = await nodeApi.post('/auth/login', { email, password });
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

// Add missing updateUserProfile function
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