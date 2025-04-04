// src/pages/EventDetail.jsx
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventDetails } from '../store/slices/eventSlice';
import { Button } from '../components/common';
import EventDetails from '../components/events/EventDetails';

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { event, loading, error } = useSelector(state => state.events);
  const { isAuthenticated } = useSelector(state => state.auth);
  
  useEffect(() => {
    dispatch(fetchEventDetails(eventId));
  }, [dispatch, eventId]);
  
  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/events/${eventId}` } });
    } else {
      navigate(`/booking/${eventId}`);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
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
  
  // Check if event is still available for booking
  const now = new Date();
  const eventStartTime = new Date(event.startTime);
  const isEventPast = eventStartTime < now;
  // Add this right after you access the event state
console.log("Event state:", event);
console.log("Event ID from params:", eventId);
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/events" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Events
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <EventDetails event={event} />
          
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-bold">
                  {isEventPast ? 'This event has already started.' : 'Interested in attending?'}
                </p>
              </div>
              <div>
                <Button 
                  onClick={handleBookNow}
                  variant="primary"
                  disabled={isEventPast}
                  className={isEventPast ? 'opacity-50 cursor-not-allowed' : ''}
                >
                  {isEventPast ? 'Event has started' : 'Book Now'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;