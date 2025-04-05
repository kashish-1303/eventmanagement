
import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/common';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get booking info from state
  const bookingId = location.state?.bookingId;
  const paymentId = location.state?.paymentId;
  
  // If no booking info, redirect to home
  if (!bookingId) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6 text-red-600">Error</h1>
          <p className="text-center mb-6">No booking information found. The page might have been refreshed or accessed directly.</p>
          <div className="flex justify-center">
            <Button onClick={() => navigate('/profile')} variant="primary">
              Go to My Bookings
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mb-6 text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
        
        <p className="mb-6">Thank you for your payment. Your booking has been confirmed.</p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
          <p className="mb-2"><span className="font-semibold">Booking ID:</span> {bookingId}</p>
          <p><span className="font-semibold">Payment ID:</span> {paymentId}</p>
        </div>
        
        <p className="mb-6 text-sm text-gray-600">
          A confirmation email has been sent to your registered email address.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link to={`/booking/${bookingId}`} className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
            View Booking Details
          </Link>
          
          <Button onClick={() => navigate('/bookings')} variant="secondary">
  Go to My Bookings
</Button>

        </div>
      </div>
    </div>
  );
};

export default Confirmation;