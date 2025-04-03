// src/components/venues/VenueList.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VenueCard from './VenueCard';
import { fetchVenues } from '../../store/slices/venueSlice'; // You'll need to create this slice

const VenueList = () => {
  const dispatch = useDispatch();
  const { venues, loading, error } = useSelector((state) => state.venues);
  const [statusFilter, setStatusFilter] = useState('ALL');
  
  useEffect(() => {
    dispatch(fetchVenues());
  }, [dispatch]);
  
  const filteredVenues = venues.filter(venue => {
    if (statusFilter === 'ALL') return true;
    return venue.status === statusFilter;
  });
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-md">
        <p>Error loading venues: {error}</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Available Venues</h2>
        
        <div className="flex items-center space-x-2">
          <label htmlFor="status-filter" className="text-gray-700">Filter by status:</label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-md px-3 py-1"
          >
            <option value="ALL">All</option>
            <option value="AVAILABLE">Available</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>
        </div>
      </div>
      
      {filteredVenues.length === 0 ? (
        <p className="text-gray-600">No venues found with the selected filters.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVenues.map(venue => (
            <VenueCard key={venue.venue_id} venue={venue} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VenueList;