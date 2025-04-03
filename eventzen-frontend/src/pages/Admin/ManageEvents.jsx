// src/pages/Admin/ManageEvents.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await api.get('/admin/events');
        setEvents(response.data);
      } catch (err) {
        setError('Failed to load events. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await api.delete(`/admin/events/${eventId}`);
        setEvents(events.filter(event => event.event_id !== eventId));
      } catch (err) {
        setError('Failed to delete event. Please try again.');
        console.error(err);
      }
    }
  };

  const filteredEvents = events.filter(event => {
    if (filter === 'ALL') return true;
    const now = new Date();
    const endTime = new Date(event.end_time);
    return filter === 'ACTIVE' ? endTime > now : endTime <= now;
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
        <h1 className="text-2xl font-bold">Manage Events</h1>
        <Link 
          to="/admin/events/create" 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Create New Event
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="filter" className="mr-2">Filter Events:</label>
        <select 
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="ALL">All Events</option>
          <option value="ACTIVE">Active Events</option>
          <option value="PAST">Past Events</option>
        </select>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {filteredEvents.length === 0 ? (
            <li className="px-6 py-4 text-center text-gray-500">
              No events found.
            </li>
          ) : (
            filteredEvents.map(event => (
              <li key={event.event_id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(event.start_time).toLocaleDateString()} - {new Date(event.end_time).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category: {event.category}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Link 
                      to={`/admin/events/edit/${event.event_id}`}
                      className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
                    >
                      Edit
                    </Link>
                    <button 
                      onClick={() => handleDeleteEvent(event.event_id)}
                      className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default ManageEvents;