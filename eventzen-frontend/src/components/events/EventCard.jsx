// // src/components/events/EventCard.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { formatDate } from '../../utils/formatters';

// const EventCard = ({ event }) => {
//   return (
    
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//       <div className="h-48 bg-gray-300 relative">
//         {event.image_url ? (
//           <img 
//             src={event.image_url} 
//             alt={event.title}
//             className="w-full h-full object-cover"
//           />
//         ) : (
//           <div className="w-full h-full flex items-center justify-center bg-gray-200">
//             <span className="text-gray-500">No Image</span>
//           </div>
//         )}
//         <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
//           {event.category}
//         </div>
//       </div>
      
//       <div className="p-4">
//         <h3 className="text-xl font-semibold mb-2 truncate">{event.title}</h3>
        
//         <div className="flex items-center text-gray-600 mb-2">
//           <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//           </svg>
//           <span>{formatDate(event.startTime)}</span>
//         </div>
        
//         <Link 
//           to={`/events/${event.id}`}
//           className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
//         >
//           View Details
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default EventCard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/formatters';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  console.log("Full event object:", event);
  const handleViewDetails = () => {
    // Make sure event.id is defined and correctly passed
    console.log("Navigating to event with ID:", event.id);
    navigate(`/events/${event.id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="h-48 bg-gray-300 relative">
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
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
          {event.category}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 truncate">{event.title}</h3>
        
        <div className="flex items-center text-gray-600 mb-2">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{formatDate(event.startTime)}</span>
        </div>
        
        <button 
          onClick={handleViewDetails}
          className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default EventCard;
