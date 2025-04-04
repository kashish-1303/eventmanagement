// src/pages/Venues.jsx or src/components/Venues.jsx
import React, { useState, useEffect } from 'react';
import { venueService } from '../services';

const Venues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const response = await venueService.getAllVenues();
        setVenues(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load venues');
        setLoading(false);
        console.error(err);
      }
    };

    fetchVenues();
  }, []);

  if (loading) return <div>Loading venues...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Venues</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.length > 0 ? (
          venues.map((venue) => (
            <div key={venue.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {venue.imageUrl && (
                <img 
                  src={venue.imageUrl} 
                  alt={venue.name} 
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{venue.name}</h2>
                <p className="text-gray-600">{venue.address}</p>
                <p className="mt-2">{venue.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No venues available.</p>
        )}
      </div>
    </div>
  );
};

export default Venues;