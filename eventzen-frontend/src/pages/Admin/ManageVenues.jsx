// src/pages/Admin/ManageVenues.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ManageVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/venues');
        setVenues(response.data);
      } catch (err) {
        setError('Failed to load venues. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleStatusChange = async (venueId, newStatus) => {
    try {
      await api.patch(`/admin/venues/${venueId}/status`, { status: newStatus });
      setVenues(venues.map(venue => 
        venue.venue_id === venueId ? { ...venue, status: newStatus } : venue
      ));
    } catch (err) {
      setError('Failed to update venue status. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteVenue = async (venueId) => {
    if (window.confirm('Are you sure you want to delete this venue?')) {
      try {
        await api.delete(`/admin/venues/${venueId}`);
        setVenues(venues.filter(venue => venue.venue_id !== venueId));
      } catch (err) {
        setError('Failed to delete venue. Please try again.');
        console.error(err);
      }
    }
  };

  const filteredVenues = venues.filter(venue => {
    if (filter === 'ALL') return true;
    return venue.status === filter;
  });

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Venues</h1>
        <Link 
          to="/admin/venues/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add New Venue
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filter by Status:</label>
        <select 
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="ALL">All Venues</option>
          <option value="AVAILABLE">Available</option>
          <option value="MAINTENANCE">Maintenance</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Capacity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price Per Hour
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredVenues.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No venues found.
                </td>
              </tr>
            ) : (
              filteredVenues.map(venue => (
                <tr key={venue.venue_id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {venue.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {venue.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${venue.price_per_hour.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={venue.status}
                      onChange={(e) => handleStatusChange(venue.venue_id, e.target.value)}
                      className="border rounded px-2 py-1"
                    >
                      <option value="AVAILABLE">Available</option>
                      <option value="MAINTENANCE">Maintenance</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Link 
                      to={`/admin/venues/edit/${venue.venue_id}`}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDeleteVenue(venue.venue_id)}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageVenues;