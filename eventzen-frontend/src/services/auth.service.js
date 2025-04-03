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
import { springApi } from './api';

const AuthService = {
  login: async (credentials) => {
    const response = await springApi.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  },
  
  register: async (userData) => {
    const response = await springApi.post('/auth/register', userData);
    return response.data;
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },
  
  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  
  updateUserProfile: async (userData) => {
    const response = await springApi.put('/auth/profile', userData);
    
    // Update the stored user data if update was successful
    if (response.data && response.data.user) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  },
  
  changePassword: async (passwordData) => {
    const response = await springApi.post('/auth/change-password', passwordData);
    return response.data;
  },
  
  checkAuth: async () => {
    const response = await springApi.get('/auth/check');
    return response.data;
  }
};

export default AuthService;