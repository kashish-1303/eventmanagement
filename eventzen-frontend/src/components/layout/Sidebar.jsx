// src/components/layout/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useSelector(state => state.auth);
  const isAdmin = user && user.role === 'ADMIN';
  
  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname.startsWith(path) ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100';
  };
  
  return (
    <aside className="w-64 bg-white shadow-md h-screen fixed left-0 top-0 pt-16 overflow-y-auto">
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-6">Navigation</h2>
        
        <nav className="space-y-1">
          <Link 
            to="/" 
            className={`block px-4 py-2 rounded-md ${isActive('/')}`}
          >
            Dashboard
          </Link>
          
          <Link 
            to="/events" 
            className={`block px-4 py-2 rounded-md ${isActive('/events')}`}
          >
            Events
          </Link>
          
          <Link 
            to="/venues" 
            className={`block px-4 py-2 rounded-md ${isActive('/venues')}`}
          >
            Venues
          </Link>
          
          <Link 
            to="/bookings" 
            className={`block px-4 py-2 rounded-md ${isActive('/bookings')}`}
          >
            My Bookings
          </Link>
          
          {isAdmin && (
            <>
              <div className="pt-4 pb-2">
                <h3 className="text-xs uppercase font-medium text-gray-500 tracking-wider">
                  Admin
                </h3>
              </div>
              
              <Link 
                to="/admin/dashboard" 
                className={`block px-4 py-2 rounded-md ${isActive('/admin/dashboard')}`}
              >
                Admin Dashboard
              </Link>
              
              <Link 
                to="/admin/manage-users" 
                className={`block px-4 py-2 rounded-md ${isActive('/admin/manage-users')}`}
              >
                Manage Users
              </Link>
              
              <Link 
                to="/admin/manage-events" 
                className={`block px-4 py-2 rounded-md ${isActive('/admin/manage-events')}`}
              >
                Manage Events
              </Link>
              
              <Link 
                to="/admin/manage-venues" 
                className={`block px-4 py-2 rounded-md ${isActive('/admin/manage-venues')}`}
              >
                Manage Venues
              </Link>
            </>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;