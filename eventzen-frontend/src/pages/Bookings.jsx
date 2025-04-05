// src/pages/Bookings.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserBookings } from '../store/slices/bookingSlice';
import BookingList from '../components/bookings/BookingList';

const Bookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector(state => state.bookings);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user && user.id) {
      // Fetch bookings when component mounts
      dispatch(fetchUserBookings(user.id));
      
      // Set up interval to refresh bookings every 30 seconds
      const refreshInterval = setInterval(() => {
        dispatch(fetchUserBookings(user.id));
      }, 30000);
      
      // Clean up interval on unmount
      return () => clearInterval(refreshInterval);
    }
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error loading bookings: {error}</p>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
      
      {bookings && bookings.length > 0 ? (
        <BookingList bookings={bookings} />
      ) : (
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <p className="text-gray-600">You don't have any bookings yet.</p>
          <a 
            href="/events" 
            className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Browse Events
          </a>
        </div>
      )}
    </div>
  );
};

export default Bookings;