// // src/pages/EventDetail.jsx
// import React, { useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchEventDetails } from '../store/slices/eventSlice';
// import { Button } from '../components/common';
// import EventDetails from '../components/events/EventDetails';

// const EventDetail = () => {
//   const { eventId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   // const { event, loading, error } = useSelector(state => state.events);
//   const { currentEvent: event, loading, error } = useSelector(state => state.events);
//   useEffect(() => {
//     // Only dispatch if the event isn't already loaded
//     if (!event || event.id !== eventId) {
//       dispatch(fetchEventDetails(eventId));
//     }
//   }, [dispatch, eventId, event]);
//   const { isAuthenticated } = useSelector(state => state.auth);
  
//   useEffect(() => {
//     dispatch(fetchEventDetails(eventId));
//   }, [dispatch, eventId]);
  
//   const handleBookNow = () => {
//     if (!isAuthenticated) {
//       navigate('/login', { state: { from: `/events/${eventId}` } });
//     } else {
//       navigate(`/booking/${eventId}`);
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       </div>
//     );
//   }
  
//   if (!event) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//           Event not found. Please check the event ID and try again.
//         </div>
//       </div>
//     );
//   }
//   else {
//     console.log("Event object:", event);
//   }
  
//   // Check if event is still available for booking
//   const now = new Date();
//   const eventStartTime = new Date(event.startTime);
//   const isEventPast = eventStartTime < now;
//   // Add this right after you access the event state
// console.log("Event state:", event);
// console.log("Event ID from params:", eventId);
//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <Link to="/events" className="text-blue-600 hover:underline mb-4 inline-block">
//           &larr; Back to Events
//         </Link>
        
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           <EventDetails event={event} />
          
//           <div className="p-6 border-t border-gray-200">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-lg font-bold">
//                   {isEventPast ? 'This event has already started.' : 'Interested in attending?'}
//                 </p>
//               </div>
//               <div>
//                 <Button 
//                   onClick={handleBookNow}
//                   variant="primary"
//                   disabled={isEventPast}
//                   className={isEventPast ? 'opacity-50 cursor-not-allowed' : ''}
//                 >
//                   {isEventPast ? 'Event has started' : 'Book Now'}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetail;

// src/pages/EventDetail.jsx
// import React, { useEffect } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchEventById } from '../store/slices/eventSlice'; // Change to fetchEventById
// import { Button } from '../components/common';
// import EventDetails from '../components/events/EventDetails';

// const EventDetail = () => {
//   const { eventId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   // Get state
//   const { currentEvent: event, loading, error } = useSelector(state => state.events);
//   const { isAuthenticated } = useSelector(state => state.auth);
  
//   // Only fetch event once
//   useEffect(() => {
//     if (eventId) {
//       console.log("Dispatching fetchEventById with ID:", eventId);
//       dispatch(fetchEventById(eventId));
//     }
//   }, [dispatch, eventId]); // Don't include event in dependencies
  
//   const handleBookNow = () => {
//     if (!isAuthenticated) {
//       navigate('/login', { state: { from: `/events/${eventId}` } });
//     } else {
//       navigate(`/booking/${eventId}`);
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       </div>
//     );
//   }
  
//   if (!event) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//           Event not found. Please check the event ID and try again.
//         </div>
//       </div>
//     );
//   }
  
//   // Check if event is still available for booking
//   const now = new Date();
//   const eventStartTime = new Date(event.startTime);
//   const isEventPast = eventStartTime < now;
  
//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <Link to="/events" className="text-blue-600 hover:underline mb-4 inline-block">
//           &larr; Back to Events
//         </Link>
        
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Don't pass the event prop if EventDetails is already connected to Redux */}
//           <EventDetails />
          
//           <div className="p-6 border-t border-gray-200">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-lg font-bold">
//                   {isEventPast ? 'This event has already started.' : 'Interested in attending?'}
//                 </p>
//               </div>
//               <div>
//                 <Button 
//                   onClick={handleBookNow}
//                   variant="primary"
//                   disabled={isEventPast}
//                   className={isEventPast ? 'opacity-50 cursor-not-allowed' : ''}
//                 >
//                   {isEventPast ? 'Event has started' : 'Book Now'}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetail;

// import React from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { Button } from '../components/common';
// import EventDetails from '../components/events/EventDetails';

// const EventDetail = () => {
//   const { eventId } = useParams();
//   const navigate = useNavigate();
  
//   // Get state
//   const { currentEvent: event, loading, error } = useSelector(state => state.events);
//   const { isAuthenticated } = useSelector(state => state.auth);
  
//   // We moved the fetch logic to the EventDetails component
//   // No need to dispatch fetchEventById here anymore
  
//   const handleBookNow = () => {
//     if (!isAuthenticated) {
//       navigate('/login', { state: { from: `/events/${eventId}` } });
//     } else {
//       navigate(`/booking/${eventId}`);
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//         </div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//           {error}
//         </div>
//       </div>
//     );
//   }
  
//   if (!event) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
//           Loading event... If this message persists, the event may not exist.
//         </div>
//       </div>
//     );
//   }
  
//   // Check if event is still available for booking
//   const now = new Date();
//   const eventStartTime = new Date(event.startTime);
//   const isEventPast = eventStartTime < now;
  
//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <Link to="/events" className="text-blue-600 hover:underline mb-4 inline-block">
//           &larr; Back to Events
//         </Link>
        
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Let EventDetails handle fetching via Redux */}
//           <EventDetails />
          
//           <div className="p-6 border-t border-gray-200">
//             <div className="flex justify-between items-center">
//               <div>
//                 <p className="text-lg font-bold">
//                   {isEventPast ? 'This event has already started.' : 'Interested in attending?'}
//                 </p>
//               </div>
//               <div>
//                 <Button 
//                   onClick={handleBookNow}
//                   variant="primary"
//                   disabled={isEventPast}
//                   className={isEventPast ? 'opacity-50 cursor-not-allowed' : ''}
//                 >
//                   {isEventPast ? 'Event has started' : 'Book Now'}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventDetail;

import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEventById } from '../store/slices/eventSlice';
import { Button } from '../components/common';
import EventDetails from '../components/events/EventDetails';

const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  console.log("EventDetail Page - Event ID from params:", eventId);
  
  // Directly dispatch the fetch action here to ensure the event is loaded
  useEffect(() => {
    if (eventId) {
      console.log("EventDetail Page - Dispatching fetchEventById with ID:", eventId);
      dispatch(fetchEventById(eventId));
    }
  }, [dispatch, eventId]);
  
  // Get state 
  const { currentEvent: event, loading, error } = useSelector(state => {
    console.log("EventDetail Page - Current Redux events state:", state.events);
    return state.events;
  });
  const { isAuthenticated } = useSelector(state => state.auth);
  
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
        <div className="flex justify-center items-center h-64 flex-col">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600">Loading event data for ID: {eventId}...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>Error: {error}</p>
          <p className="mt-2">Please try refreshing the page or check if the event ID is correct.</p>
        </div>
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="container mx-auto p-6">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          <p>No event data found for ID: {eventId}</p>
          <p className="mt-2">This could be because:
            <ul className="list-disc ml-6 mt-2">
              <li>The event was deleted</li>
              <li>The event ID is incorrect</li>
              <li>There's a temporary server issue</li>
            </ul>
          </p>
          <button 
            onClick={() => dispatch(fetchEventById(eventId))}
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  
  // Check if event is still available for booking
  const now = new Date();
  const eventStartTime = new Date(event.startTime);
  const isEventPast = eventStartTime < now;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/events" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to Events
        </Link>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Let EventDetails handle the display part */}
          <EventDetails />
          
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