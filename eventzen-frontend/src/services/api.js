
// // import axios from 'axios';

// // // Node.js backend API client
// // export const nodeApi = axios.create({
// //   baseURL: process.env.REACT_APP_NODE_API_URL || 'http://localhost:3001/api',
// //   headers: {
// //     'Content-Type': 'application/json'
// //   }
// // });

// // // Spring backend API client
// // export const springApi = axios.create({
// //   baseURL: process.env.REACT_APP_SPRING_API_URL || 'http://localhost:8080/api',
// //   headers: {
// //     'Content-Type': 'application/json'
// //   }
// // });

// // // Add request interceptor for authentication to both APIs
// // const addAuthToken = (config) => {
// //   const token = localStorage.getItem('token');
// //   if (token) {
// //     config.headers.Authorization = `Bearer ${token}`;
// //   }
// //   return config;
// // };

// // // Setup request interceptors for both APIs
// // nodeApi.interceptors.request.use(addAuthToken);
// // springApi.interceptors.request.use(addAuthToken);

// // // TEMPORARILY DISABLE response interceptors that might cause redirect loops
// // // We'll handle auth errors in the components instead

// // // Default export for backward compatibility 
// // export default nodeApi;
// // src/services/api.js
// import axios from 'axios';

// // Track if we're currently refreshing the token to prevent multiple refresh attempts
// let isRefreshing = false;
// // Store pending requests that should be retried after token refresh
// let failedQueue = [];

// const processQueue = (error, token = null) => {
//   failedQueue.forEach(prom => {
//     if (error) {
//       prom.reject(error);
//     } else {
//       prom.resolve(token);
//     }
//   });
  
//   failedQueue = [];
// };

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

// // Response interceptor to handle 401 errors properly
// const handle401Error = (error) => {
//   const originalRequest = error.config;
  
//   // If we get a 401 response
//   if (error.response && error.response.status === 401) {
//     console.log("Received 401 error", originalRequest.url);
    
//     // Check if this is a login or refresh token request to avoid infinite loops
//     if (originalRequest.url.includes('/auth/login') || 
//         originalRequest.url.includes('/auth/refresh-token') ||
//         originalRequest._retry) {
      
//       // Clear auth data if login/refresh fails with 401
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
      
//       // Only redirect if not already on login page
//       if (!window.location.pathname.includes('/login')) {
//         window.location.href = '/login';
//       }
      
//       return Promise.reject(error);
//     }
    
//     // Mark this request as retried to avoid multiple retries
//     originalRequest._retry = true;
    
//     // Check if we're already refreshing the token
//     if (!isRefreshing) {
//       isRefreshing = true;
      
//       // You would implement a token refresh endpoint in your API
//       // For now, we'll just redirect to login
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
      
//       // Process any queued requests with an error
//       processQueue(new Error('Authentication failed'));
      
//       // Only redirect if not already on login page
//       if (!window.location.pathname.includes('/login')) {
//         window.location.href = '/login';
//       }
      
//       // Reset refreshing flag
//       isRefreshing = false;
      
//       return Promise.reject(error);
//     } else {
//       // If we're already refreshing, add this request to the queue
//       return new Promise((resolve, reject) => {
//         failedQueue.push({ resolve, reject });
//       })
//       .then(token => {
//         originalRequest.headers.Authorization = `Bearer ${token}`;
//         return axios(originalRequest);
//       })
//       .catch(err => {
//         return Promise.reject(err);
//       });
//     }
//   }
  
//   // For non-401 errors, just reject as normal
//   return Promise.reject(error);
// };

// // Setup interceptors for both APIs
// nodeApi.interceptors.request.use(addAuthToken);
// springApi.interceptors.request.use(addAuthToken);

// nodeApi.interceptors.response.use(
//   response => response,
//   error => handle401Error(error)
// );

// springApi.interceptors.response.use(
//   response => response,
//   error => handle401Error(error)
// );

// // Default export for backward compatibility 
// export default nodeApi;
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

// Setup request interceptors for both APIs
nodeApi.interceptors.request.use(addAuthToken);
springApi.interceptors.request.use(addAuthToken);

// Simple response interceptor that won't cause redirect loops
nodeApi.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

springApi.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.message);
    return Promise.reject(error);
  }
);

// Default export for backward compatibility 
export default nodeApi;