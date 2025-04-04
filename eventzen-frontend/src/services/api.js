// // src/services/api.js
// import axios from 'axios';

// // Node.js backend API client
// export const nodeApi = axios.create({
//   baseURL: process.env.REACT_APP_NODE_API_URL || 'http://localhost:3001/api',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Spring backend API client
// export const springApi = axios.create({
//   baseURL: process.env.REACT_APP_SPRING_API_URL || 'http://localhost:8080/api',
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Add request interceptor for authentication to both APIs
// const addAuthToken = (config) => {
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// };

// nodeApi.interceptors.request.use(addAuthToken);
// springApi.interceptors.request.use(addAuthToken);
// src/services/api.js
import axios from 'axios';

// Node.js backend API client
export const nodeApi = axios.create({
  baseURL: process.env.REACT_APP_NODE_API_URL || 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Spring backend API client
export const springApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for authentication to both APIs
const addAuthToken = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Response interceptor for handling auth errors
const handleAuthErrors = (error) => {
  if (error.response && error.response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login'; // Redirect to login
  }
  return Promise.reject(error);
};

// Setup interceptors for both APIs
nodeApi.interceptors.request.use(addAuthToken);
springApi.interceptors.request.use(addAuthToken);

nodeApi.interceptors.response.use(response => response, handleAuthErrors);
springApi.interceptors.response.use(response => response, handleAuthErrors);

// Default export for backward compatibility 
export default nodeApi;