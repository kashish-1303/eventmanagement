// src/pages/Events.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EventList from '../components/events/EventList';
import { fetchEvents } from '../store/slices/eventSlice';
import { Button } from '../components/common';

const Events = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);
  const [filters, setFilters] = useState({
    category: '',
    searchQuery: ''
  });

  useEffect(() => {
    dispatch(fetchEvents(filters));
  }, [dispatch, filters]);

  const handleCategoryFilter = (category) => {
    setFilters({
      ...filters,
      category
    });
  };

  const handleSearch = (e) => {
    setFilters({
      ...filters,
      searchQuery: e.target.value
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Upcoming Events</h1>
      
      <div className="mb-8">
        <div className="flex flex-wrap items-center mb-4">
          <input
            type="text"
            placeholder="Search events..."
            className="border rounded px-4 py-2 mr-4 mb-2 sm:mb-0 w-full sm:w-auto"
            value={filters.searchQuery}
            onChange={handleSearch}
          />
          
          {/* <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
            {['ALL', 'SOCIAL', 'CORPORATE', 'SPORTS', 'TECH'].map((category) => (
              <Button 
                key={category}
                onClick={() => handleCategoryFilter(category === 'ALL' ? '' : category)}
                variant={filters.category === (category === 'ALL' ? '' : category) ? "primary" : "secondary"}
                className="mb-2 sm:mb-0"
              >
                {category}
              </Button>
            ))}
          </div> */}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">
          <p className="text-lg">Loading events...</p>
        </div>
      ) : error ? (
        <div className="text-center py-10">
          <p className="text-lg text-red-600">{error}</p>
          <Button onClick={() => dispatch(fetchEvents(filters))} className="mt-4">
            Try Again
          </Button>
        </div>
      ) : (
        <EventList events={events} />
      )}
    </div>
  );
};

export default Events;