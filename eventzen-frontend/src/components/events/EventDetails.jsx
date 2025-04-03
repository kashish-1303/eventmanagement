// src/components/events/EventDetails.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { formatDate, formatTime } from '../../utils/formatters';
import EventService from '../../services/event.service';
import VenueService from '../../services/venue.service';

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const { eventId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);
  
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventResponse = await EventService.getEventById(eventId);
        setEvent(eventResponse.data);
        
        const venueResponse = await VenueService.getVenueById(eventResponse.data.venue_id);
        setVenue(venueResponse.data);
      } catch (err) {
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEventDetails();
  }, [eventId]);
  
  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: `/events/${eventId}/book` } });
    } else {
      navigate(`/events/${eventId}/book`);
    }
  };
  
  if (loading) {
    return <div className="text-center py-10">Loading event details...</div>;
  }
  
  if (error || !event) {
    return (
      <div className="text-center py-10 text-red-600">
        {error || 'Event not found'}
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-64 bg-gray-300 relative">
          {event.image_url ? (
            <img 
              src={event.image_url} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm mb-2">
                {event.category}
              </span>
              <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            </div>
            
            <button
              onClick={handleBookNow}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
            >
              Book Now
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mt-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Event Details</h2>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <svg className="w-5 h-5 mr-3 mt-0.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-medium">Date & Time</p>
                    <p>{formatDate(event.start_time)}</p>
                    <p>{formatTime(event.start_time)} - {formatTime(event.end_time)}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {venue && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Venue Information</h2>
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-lg">{venue.name}</h3>
                  <p className="mt-2">Capacity: {venue.capacity} people</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;