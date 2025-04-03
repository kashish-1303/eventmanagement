// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchEvents } from '../store/slices/eventSlice';
import EventCard from '../components/events/EventCard';
import { Button } from '../components/common';

const Home = () => {
  const dispatch = useDispatch();
  const { events, loading } = useSelector((state) => state.events);
  
  useEffect(() => {
    // Fetch only a few featured/upcoming events for the homepage
    dispatch(fetchEvents({ limit: 4 }));
  }, [dispatch]);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find and Book Amazing Events</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover events that match your interests, book tickets securely, and enjoy memorable experiences.
          </p>
          <Link to="/events">
            <Button variant="light" size="large">
              Browse Events
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Events Section */}
      <div className="container mx-auto py-16 px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Featured Events</h2>
          <Link to="/events" className="text-blue-600 hover:underline">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="text-center py-10">
            <p className="text-lg">Loading events...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {events.slice(0, 4).map((event) => (
              <EventCard key={event.event_id} event={event} />
            ))}
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">Browse by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {['SOCIAL', 'CORPORATE', 'SPORTS', 'TECH'].map((category) => (
              <Link 
                to={`/events?category=${category}`} 
                key={category}
                className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{category}</h3>
                <p className="text-gray-600">
                  Browse all {category.toLowerCase()} events
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Find an Event</h3>
            <p className="text-gray-600">
              Search for events based on your interests, location, and availability.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Book Tickets</h3>
            <p className="text-gray-600">
              Secure your spot with our easy booking system and various payment options.
            </p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-600 text-2xl font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Enjoy the Event</h3>
            <p className="text-gray-600">
              Receive confirmation and tickets, then just show up and have a great time!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;