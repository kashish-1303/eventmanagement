// src/pages/Booking.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BookingForm from '../components/bookings/BookingForm';
import { fetchEventDetails } from '../store/slices/eventSlice';
import api from '../services/api';

const Booking = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { event, loading: eventLoading, error: eventError } = useSelector(state => state.events);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  const [venueDetails, setVenueDetails] = useState(null);
  const [venueLoading, setVenueLoading] = useState(false);
  const [venueError, setVenueError] = useState(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/booking/${eventId}` } });
    }
    
    dispatch(fetchEventDetails(eventId));
  }, [dispatch, eventId, isAuthenticated, navigate]);
  
  useEffect(() => {
    if (event && event.venue_id) {
      const fetchVenueDetails = async () => {
        try {
          setVenueLoading(true);
          const response = await api.get(`/venues/${event.venue_id}`);
          setVenueDetails(response.data);
        } catch (err) {
          setVenueError('Failed to load venue details. Please try again.');
          console.error(err);
        } finally {
          setVenueLoading(false);
        }
      };
      
      fetchVenueDetails();
    }
  }, [event]);
  
  if (eventLoading || venueLoading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  if (eventError || venueError) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {eventError || venueError}
        </div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Event not found. Please check the event ID and try again.
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
            <p className="text-gray-600 mb-4">
              {new Date(event.start_time).toLocaleDateString()} at {new Date(event.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
            
            {venueDetails && (
              <div className="mb-6 p-4 bg-gray-50 rounded">
                <h2 className="text-lg font-semibold mb-2">Venue: {venueDetails.name}</h2>
                <p>Capacity: {venueDetails.capacity} people</p>
                <p>Price: ${venueDetails.price_per_hour}/hour</p>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-xl font-semibold mb-4">Book Your Spot</h2>
              <BookingForm eventId={eventId} venueId={event.venue_id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;