

// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { formatDate, formatTime } from '../../utils/formatters';
// import { fetchEventById } from '../../store/slices/eventSlice';
// import VenueService from '../../services/venue.service';
// import { getEventImageByCategory } from '../../utils/imageUtils';

// const EventDetails = () => {
//   const [venue, setVenue] = useState(null);
//   const [venueLoading, setVenueLoading] = useState(false);
//   const [venueError, setVenueError] = useState(null);
  
//   const { eventId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const { currentEvent, loading, error } = useSelector(state => state.events);
//   const { isAuthenticated } = useSelector(state => state.auth);
  
//   console.log("EventDetails Component - Event ID:", eventId);
//   console.log("EventDetails Component - Current Event:", currentEvent);
//   console.log("EventDetails Component - Loading State:", loading);
//   console.log("EventDetails Component - Error State:", error);
  
//   // Always fetch the event when this component mounts to ensure fresh data
//   useEffect(() => {
//     console.log("Dispatching fetchEventById with ID:", eventId);
//     if (eventId) {
//       dispatch(fetchEventById(eventId));
//     }
//   }, [eventId, dispatch]);
  
//   useEffect(() => {
//     const fetchVenueDetails = async () => {
//       if (currentEvent && currentEvent.venue_id) {
//         try {
//           setVenueLoading(true);
//           const venueResponse = await VenueService.getVenueById(currentEvent.venue_id);
//           setVenue(venueResponse.data);
//         } catch (err) {
//           console.error("Error fetching venue:", err);
//           setVenueError('Failed to load venue details');
//         } finally {
//           setVenueLoading(false);
//         }
//       }
//     };
    
//     fetchVenueDetails();
//   }, [currentEvent]);
  
//   const handleBookNow = () => {
//     if (!isAuthenticated) {
//       navigate('/login', { state: { redirectTo: `/events/${eventId}/book` } });
//     } else {
//       navigate(`/events/${eventId}/book`);
//     }
//   };
  
//   if (loading) {
//     return <div className="text-center py-10">Loading event details for ID: {eventId}...</div>;
//   }
  
//   if (error) {
//     return (
//       <div className="text-center py-10 text-red-600">
//         Error loading event: {error}
//       </div>
//     );
//   }
  
//   if (!currentEvent) {
//     return (
//       <div className="text-center py-10 text-yellow-600">
//         Event not found with id: {eventId}. Please check the event ID and try again.
//       </div>
//     );
//   }
  
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//         <div className="h-64 bg-gray-300 relative">
//           <img 
//             src={currentEvent.image_url || getEventImageByCategory(currentEvent.category)} 
//             alt={currentEvent.title}
//             className="w-full h-full object-cover"
//             onError={(e) => {
//               e.target.onerror = null;
//               e.target.src = '/images/default.jpg';
//             }}
//           />
//         </div>
        
//         <div className="p-6">
//           <div className="flex justify-between items-start">
//             <div>
//               <span className="inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-sm mb-2">
//                 {currentEvent.category}
//               </span>
//               <h1 className="text-3xl font-bold mb-4">{currentEvent.title}</h1>
//             </div>
            
//             <button
//               onClick={handleBookNow}
//               className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded"
//             >
//               Book Now
//             </button>
//           </div>
          
//           <div className="grid md:grid-cols-2 gap-8 mt-6">
//             <div>
//               <h2 className="text-xl font-semibold mb-4">Event Details</h2>
              
//               <div className="space-y-3">
//                 <div className="flex items-start">
//                   <svg className="w-5 h-5 mr-3 mt-0.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                   </svg>
//                   <div>
//                     <p className="font-medium">Date & Time</p>
//                     <p>{formatDate(currentEvent.startTime)}</p>
//                     <p>{formatTime(currentEvent.startTime)} - {formatTime(currentEvent.endTime)}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {venue && (
//               <div>
//                 <h2 className="text-xl font-semibold mb-4">Venue Information</h2>
//                 <div className="p-4 border border-gray-200 rounded-lg">
//                   <h3 className="font-medium text-lg">{venue.name}</h3>
//                   <p className="mt-2">Capacity: {venue.capacity} people</p>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatTime } from '../../utils/formatters';
import VenueService from '../../services/venue.service';
import { getEventImageByCategory } from '../../utils/imageUtils';

// Convert to receive event as a prop instead of fetching it
const EventDetails = ({ event, isAuthenticated }) => {
  const [venue, setVenue] = useState(null);
  const [venueLoading, setVenueLoading] = useState(false);
  const [venueError, setVenueError] = useState(null);
  
  const navigate = useNavigate();
  
  // Remove all the Redux fetching logic, just fetch venue if needed
  useEffect(() => {
    const fetchVenueDetails = async () => {
      if (event && event.venue_id) {
        try {
          setVenueLoading(true);
          const venueResponse = await VenueService.getVenueById(event.venue_id);
          setVenue(venueResponse.data);
        } catch (err) {
          console.error("Error fetching venue:", err);
          setVenueError('Failed to load venue details');
        } finally {
          setVenueLoading(false);
        }
      }
    };
    
    fetchVenueDetails();
  }, [event]);
  
  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirectTo: `/events/${event.id}/book` } });
    } else {
      navigate(`/events/${event.id}/book`);
    }
  };
  
  if (!event) {
    return null; // Let the parent handle loading states
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="h-64 bg-gray-300 relative">
          <img 
            src={event.image_url || getEventImageByCategory(event.category)} 
            alt={event.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/images/default.jpg';
            }}
          />
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
                    <p>{formatDate(event.startTime)}</p>
                    <p>{formatTime(event.startTime)} - {formatTime(event.endTime)}</p>
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