// src/pages/Confirmation.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from '../components/common';

const Confirmation = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { booking } = useSelector(state => state.bookings);

  useEffect(() => {
    // If no booking in state, redirect to home
    if (!booking && !bookingId) {
      navigate('/');
    }
  }, [booking, bookingId, navigate]);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <div className="text-green-500 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Booking Confirmed!</h1>
        <p className="mb-6">Your booking has been successfully confirmed. A confirmation email has been sent to your registered email address.</p>
        
        <div className="mb-6 p-4 bg-gray-50 rounded text-left">
          <p><strong>Booking ID:</strong> {bookingId || booking?.id}</p>
          <p><strong>Event:</strong> {booking?.eventTitle}</p>
          <p><strong>Date:</strong> {booking?.eventDate}</p>
          <p><strong>Attendees:</strong> {booking?.attendeeCount}</p>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button onClick={() => navigate('/profile')} variant="primary">
            View My Bookings
          </Button>
          <Button onClick={() => navigate('/')} variant="outline">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;