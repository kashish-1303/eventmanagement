// src/components/bookings/BookingForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createBookingSuccess } from '../../store/slices/bookingSlice';
import BookingService from '../../services/booking.service';
import AttendeeService from '../../services/attendee.service';

const BookingForm = ({ event }) => {
  const [attendees, setAttendees] = useState([{ name: '', email: '' }]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleAddAttendee = () => {
    setAttendees([...attendees, { name: '', email: '' }]);
  };
  
  const handleRemoveAttendee = (index) => {
    const updatedAttendees = [...attendees];
    updatedAttendees.splice(index, 1);
    setAttendees(updatedAttendees);
  };
  
  const handleAttendeeChange = (index, field, value) => {
    const updatedAttendees = [...attendees];
    updatedAttendees[index][field] = value;
    setAttendees(updatedAttendees);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create booking
      const bookingData = {
        user_id: user.id,
        event_id: event.id
      };
      
      const bookingResponse = await BookingService.createBooking(bookingData);
      const booking = bookingResponse.data;
      
      // Add attendees
      const attendeePromises = attendees.map(attendee => 
        AttendeeService.addAttendee({
          booking_id: booking.id,
          name: attendee.name,
          email: attendee.email
        })
      );
      
      await Promise.all(attendeePromises);
      
      dispatch(createBookingSuccess(booking));
      navigate(`/payment/${booking.booking_id}`);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create booking');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Book Event: {event.title}</h2>
      
      {error && (
        <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Attendee Information</h3>
          
          {attendees.map((attendee, index) => (
            <div key={index} className="mb-4 p-4 border border-gray-200 rounded">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">Attendee {index + 1}</h4>
                {attendees.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAttendee(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={attendee.name}
                    onChange={(e) => handleAttendeeChange(index, 'name', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={attendee.email}
                    onChange={(e) => handleAttendeeChange(index, 'email', e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
          
          <button
            type="button"
            onClick={handleAddAttendee}
            className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            + Add Another Attendee
          </button>
        </div>
        
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={() => navigate(`/events/${event.event_id}`)}
            className="mr-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Continue to Payment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;