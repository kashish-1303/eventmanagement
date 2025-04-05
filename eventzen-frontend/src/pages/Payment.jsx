// src/pages/Payment.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import PaymentForm from '../components/payment/PaymentForm';
import { Button } from '../components/common';
// import { getBookingDetails } from '../services/booking.service';
import { getBookingById } from '../services/booking.service';
const Payment = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log('Full auth state:', useSelector((state) => state.auth));
  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true);
        const data = await getBookingById(bookingId);
       // First, log the full user object to see its structure
console.log('Full user object:', user);

// Then use a more flexible approach to check authorization
let userIdentifier = user?.user_id || user?.id || user?.userId;
console.log('Using user identifier:', userIdentifier);

if (data.user_id && userIdentifier && data.user_id !== userIdentifier) {
  setError('Unauthorized access to this booking');
  return;
}
        
        setBooking(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch booking details');
      } finally {
        setLoading(false);
      }
    };

    if (bookingId && user) {
      fetchBookingDetails();
    } else if (!user) {
      navigate('/login', { 
        state: { 
          from: `/payment/${bookingId}`,
          message: 'Please log in to access the payment page' 
        } 
      });
    }
  }, [bookingId, user, navigate]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 text-center">
        <p className="text-lg">Loading payment details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-red-600">Error</h1>
          <p className="text-center mb-6">{error}</p>
          <div className="flex justify-center">
            <Button onClick={() => navigate('/profile')} variant="primary">
              Go to My Bookings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Booking Not Found</h1>
          <p className="text-center mb-6">The booking you're trying to pay for does not exist or has been cancelled.</p>
          <div className="flex justify-center">
            <Button onClick={() => navigate('/events')} variant="primary">
              Browse Events
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Complete Your Payment</h1>
        
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Event:</p>
              <p className="font-medium">{booking.event.title}</p>
            </div>
            <div>
              <p className="text-gray-600">Date:</p>
              <p className="font-medium">
                {new Date(booking.event.start_time).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Venue:</p>
              <p className="font-medium">{booking.event.venue.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Status:</p>
              <p className="font-medium">{booking.status}</p>
            </div>
            <div className="md:col-span-2">
              <p className="text-gray-600">Amount Due:</p>
              <p className="text-xl font-bold text-blue-600">
                ${booking.total_amount.toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        
        <PaymentForm booking={booking} />
        
        <div className="mt-6 text-center">
          <button 
            onClick={() => navigate(`/booking/${bookingId}`)}
            className="text-blue-600 hover:underline"
          >
            Back to Booking Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;