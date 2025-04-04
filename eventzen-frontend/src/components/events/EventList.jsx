// // // src/components/events/EventList.jsx
// // import { useState, useEffect } from 'react';
// // import { useDispatch, useSelector } from 'react-redux';
// // import EventCard from './EventCard';
// // import { fetchEvents } from '../../store/slices/eventSlice';

// // const EventList = () => {
// //   const [filter, setFilter] = useState('all');
// //   const { events, loading, error } = useSelector(state => state.events);
// //   const dispatch = useDispatch();
  
// //   useEffect(() => {
// //     dispatch(fetchEvents());
// //   }, [dispatch]);
  
// //   const filteredEvents = filter === 'all' 
// //     ? events 
// //     : events.filter(event => event.category === filter);
  
// //   if (loading) {
// //     return <div className="text-center py-10">Loading events...</div>;
// //   }
  
// //   if (error) {
// //     return (
// //       <div className="text-center py-10 text-red-600">
// //         Error loading events: {error}
// //       </div>
// //     );
// //   }
  
// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <div className="mb-8">
// //         <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
        
// //         <div className="flex flex-wrap gap-2">
// //           <button
// //             onClick={() => setFilter('all')}
// //             className={`px-4 py-2 rounded-full ${
// //               filter === 'all' 
// //                 ? 'bg-blue-600 text-white' 
// //                 : 'bg-gray-200 text-gray-700'
// //             }`}
// //           >
// //             All
// //           </button>
// //           {['SOCIAL', 'CORPORATE', 'SPORTS', 'TECH'].map(category => (
// //             <button
// //               key={category}
// //               onClick={() => setFilter(category)}
// //               className={`px-4 py-2 rounded-full ${
// //                 filter === category 
// //                   ? 'bg-blue-600 text-white' 
// //                   : 'bg-gray-200 text-gray-700'
// //               }`}
// //             >
// //               {category}
// //             </button>
// //           ))}
// //         </div>
// //       </div>
      
// //       {filteredEvents.length === 0 ? (
// //         <div className="text-center py-10 text-gray-600">
// //           No events found.
// //         </div>
// //       ) : (
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {filteredEvents.map(event => (
// //             <EventCard key={event.event_id} event={event} />
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default EventList;
// // src/components/events/EventList.jsx
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import EventCard from './EventCard';
// import { fetchEvents } from '../../store/slices/eventSlice';

// const EventList = () => {
//   const dispatch = useDispatch();
//   const { events, loading, error } = useSelector((state) => state.events);
//   const [categoryFilter, setCategoryFilter] = useState('ALL');
  
//   useEffect(() => {
//     dispatch(fetchEvents());
//   }, [dispatch]);
  
//   const filteredEvents = events.filter(event => {
//     if (categoryFilter === 'ALL') return true;
//     return event.category === categoryFilter;
//   });
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-32">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }
  
//   if (error) {
//     return (
//       <div className="bg-red-100 text-red-700 p-4 rounded-md">
//         <p>Error loading events: {error}</p>
//       </div>
//     );
//   }
  
//   return (
//     <div>
//       <div className="mb-6 flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Upcoming Events</h2>
        
//         <div className="flex items-center space-x-2">
//           <label htmlFor="category-filter" className="text-gray-700">Filter by category:</label>
//           <select
//             id="category-filter"
//             value={categoryFilter}
//             onChange={(e) => setCategoryFilter(e.target.value)}
//             className="border rounded-md px-3 py-1"
//           >
//             <option value="ALL">All</option>
//             <option value="SOCIAL">Social</option>
//             <option value="CORPORATE">Corporate</option>
//             <option value="SPORTS">Sports</option>
//             <option value="TECH">Tech</option>
//           </select>
//         </div>
//       </div>
      
//       {filteredEvents.length === 0 ? (
//         <p className="text-gray-600">No events found with the selected filters.</p>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredEvents.map(event => (
//             <EventCard key={event.id} event={event} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default EventList;
// src/components/events/EventList.jsx
import { useState } from 'react';
import EventCard from './EventCard';

const EventList = ({ events = [] }) => {
  const [filter, setFilter] = useState('all');
  
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
            <EventCard key={event.event_id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventList;