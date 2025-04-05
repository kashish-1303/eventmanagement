// // src/pages/BookingDetail.jsx
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import BookingService from '../services/booking.service';
// import FeedbackForm from '../components/feedback/FeedbackForm'; // Added for feedback integration

// const BookingDetail = () => {
//   const { bookingId } = useParams();
//   const [booking, setBooking] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   useEffect(() => {
//     const fetchBookingDetails = async () => {
//       try {
//         setLoading(true);
//         const response = await BookingService.getBookingById(bookingId);
//         setBooking(response.data);
//       } catch (err) {
//         setError('Failed to fetch booking details');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     if (bookingId) {
//       fetchBookingDetails();
//     }
//   }, [bookingId]);
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }
  
//   if (error || !booking) {
//     return (
//       <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
//         <p>{error || 'Booking not found'}</p>
//       </div>
//     );
//   }
  
//   return (
//     <div className="container mx-auto py-8 px-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
//           <div className="p-6">
//             <h1 className="text-2xl font-bold mb-2">Booking Details</h1>
            
//             <div className="mt-6 border-t border-gray-200 pt-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h2 className="text-lg font-semibold mb-2">Booking Information</h2>
//                   <p className="mb-1"><span className="font-medium">Booking ID:</span> {booking.booking_id}</p>
//                   <p className="mb-1"><span className="font-medium">Status:</span> <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-800">{booking.status}</span></p>
//                   <p className="mb-1"><span className="font-medium">Booking Date:</span> {new Date(booking.createdAt).toLocaleDateString()}</p>
//                   <p className="mb-1"><span className="font-medium">Attendees:</span> {booking.attendee_count}</p>
//                   <p className="mb-1"><span className="font-medium">Payment Status:</span> <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">{booking.payment_status}</span></p>
//                 </div>
                
//                 <div>
//                   <h2 className="text-lg font-semibold mb-2">Event Information</h2>
//                   <p className="mb-1"><span className="font-medium">Event:</span> {booking.event?.title}</p>
//                   <p className="mb-1"><span className="font-medium">Date:</span> {booking.event ? new Date(booking.event.startTime).toLocaleDateString() : 'N/A'}</p>
//                   <p className="mb-1"><span className="font-medium">Time:</span> {booking.event ? new Date(booking.event.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</p>
//                   <p className="mb-1"><span className="font-medium">Venue:</span> {booking.event?.venue?.name || 'N/A'}</p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Add Feedback Form for completed events */}
//             {booking.status === 'CONFIRMED' && new Date(booking.event?.endTime) < new Date() && (
//               <div className="mt-8 border-t border-gray-200 pt-6">
//                 <h2 className="text-xl font-semibold mb-4">Share Your Feedback</h2>
//                 <FeedbackForm bookingId={bookingId} eventId={booking.event?.id} />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BookingDetail;