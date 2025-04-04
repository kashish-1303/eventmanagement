
// import React, { useEffect } from 'react';
// import { Navigate, Outlet, useLocation } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = () => {
//   const { isAuthenticated, user } = useSelector(state => state.auth);
//   const location = useLocation();
  
//   useEffect(() => {
//     console.log("Protected Route Check:", { 
//       path: location.pathname,
//       isAuthenticated,
//       user,
//       hasToken: !!localStorage.getItem('token')
//     });
//   }, [location.pathname, isAuthenticated, user]);
  
//   // If not authenticated, redirect to login
//   if (!isAuthenticated) {
//     console.log("Not authenticated, redirecting to login");
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // If authenticated, render the child routes
//   console.log("Authenticated, rendering protected content");
//   return <Outlet />;
// };

// export default ProtectedRoute;
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  const location = useLocation();
  
  // Check token directly as well as the Redux state
  const hasToken = !!localStorage.getItem('token');
  
  console.log("Protected route check:", { 
    path: location.pathname,
    isAuthenticated,
    hasToken,
    isPathProtected: true
  });
  
  // Only redirect if we have neither the Redux state nor a token
  if (!isAuthenticated && !hasToken) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  
  // If we have a token but Redux doesn't know it yet, still render the content
  // The API interceptor will handle any auth issues if the token is invalid
  return <Outlet />;
};

export default ProtectedRoute;