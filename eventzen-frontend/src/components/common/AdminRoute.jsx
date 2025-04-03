import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  
  // If not authenticated or not an admin, redirect
  if (!isAuthenticated || (user && user.role !== 'admin')) {
    return <Navigate to="/" replace />;
  }

  // If admin, render the child routes
  return <Outlet />;
};

export default AdminRoute;