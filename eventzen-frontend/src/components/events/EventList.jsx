
// import { useState } from 'react';
// import EventCard from './EventCard';

// const EventList = ({ events = [] }) => {
//   const [filter, setFilter] = useState('all');
  
//   const filteredEvents = filter === 'all' 
//     ? events 
//     : events.filter(event => event.category === filter);
  
//   return (
//     <div>
//       <div className="mb-8">
//         <div className="flex flex-wrap gap-2">
//           <button
//             onClick={() => setFilter('all')}
//             className={`px-4 py-2 rounded-full ${
//               filter === 'all' 
//                 ? 'bg-blue-600 text-white' 
//                 : 'bg-gray-200 text-gray-700'
//             }`}
//           >
//             All
//           </button>
//           {['SOCIAL', 'CORPORATE', 'SPORTS', 'TECH'].map(category => (
//             <button
//               key={category}
//               onClick={() => setFilter(category)}
//               className={`px-4 py-2 rounded-full ${
//                 filter === category 
//                   ? 'bg-blue-600 text-white' 
//                   : 'bg-gray-200 text-gray-700'
//               }`}
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>
      
//       {filteredEvents.length === 0 ? (
//         <div className="text-center py-10 text-gray-600">
//           No events found.
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredEvents.map(event => (
//             <EventCard key={event.id} event={event} onViewDetails={() => handleViewDetails(event.id)} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventList;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from './EventCard';

const EventList = ({ events = [] }) => {
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  // Define the function here
  const handleViewDetails = (id) => {
    console.log("Navigating to event with ID:", id);
    navigate(`/events/${id}`);
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);
  
  return (
    <div>
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-full ${
              filter === 'all' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            All
          </button>
          {['SOCIAL', 'CORPORATE', 'SPORTS', 'TECH'].map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-full ${
                filter === category 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      
      {filteredEvents.length === 0 ? (
        <div className="text-center py-10 text-gray-600">
          No events found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map(event => (
            <EventCard 
              key={event.id} 
              event={event} 
              onViewDetails={() => handleViewDetails(event.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;
