// // src/services/api.js
// import axios from 'axios';

// const SPRING_API_URL = process.env.REACT_APP_SPRING_API_URL || 'http://localhost:8080/api';
// const NODE_API_URL = process.env.REACT_APP_NODE_API_URL || 'http://localhost:3001/api';

// // Spring Boot API instance
// export const springApi = axios.create({
//   baseURL: SPRING_API_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Node.js API instance
// export const nodeApi = axios.create({
//   baseURL: NODE_API_URL,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// });

// // Request interceptor to add auth token
// const setupInterceptors = (api) => {
//   api.interceptors.request.use(
//     (config) => {
//       const token = localStorage.getItem('token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
  
//   // Response interceptor to handle errors
//   api.interceptors.response.use(
//     (response) => response,
//     (error) => {
//       if (error.response && error.response.status === 401) {
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         window.location.href = '/login';
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// setupInterceptors(springApi);
// setupInterceptors(nodeApi);

import axios from 'axios';

// Node.js backend API client
export const nodeApi = axios.create({
  baseURL: process.env.REACT_APP_NODE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Spring backend API client (if using both)
export const springApi = axios.create({
  baseURL: process.env.REACT_APP_SPRING_API_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for authentication
const addAuthToken = (config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

nodeApi.interceptors.request.use(addAuthToken);
springApi.interceptors.request.use(addAuthToken);

// Default export for backward compatibility
export default nodeApi;