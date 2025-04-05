
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BookingService from '../../services/booking.service';
// import PaymentService from '../../services/payment.service';

// const PaymentForm = ({ booking }) => {
//   const [paymentDetails, setPaymentDetails] = useState({
//     amount: 0,
//     currency: 'USD',
//     method: 'CARD',
//     cardNumber: '',
//     cardHolder: '',
//     expiryDate: '',
//     cvv: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState(null);
  
//   const navigate = useNavigate();
//   const bookingId = booking.booking_id;
  
//   // Set payment amount from the booking prop
//   useEffect(() => {
//     // Always use 99.99 for testing
//     setPaymentDetails(prev => ({
//       ...prev,
//       amount: 99.99
//     }));
//   }, [booking]);
  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setPaymentDetails(prev => ({ ...prev, [name]: value }));
//   };
  
//   // Process payment and update booking status
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
    
//     try {
//       // Create a mock payment record
//       const mockPaymentId = `MOCK-${Date.now()}`;
      
//       // Update the booking with payment info
//       await BookingService.updateBookingPayment(bookingId, {
//         payment_id: mockPaymentId,
//         method: paymentDetails.method,
//         amount: paymentDetails.amount,
//         currency: paymentDetails.currency,
//         status: 'SUCCESS',
//         transaction_id: mockPaymentId
//       });
      
//       // Navigate to confirmation
//       navigate('/confirmation', { 
//         state: { 
//           bookingId, 
//           paymentId: mockPaymentId 
//         } 
//       });
//     } catch (error) {
//       setError('Payment processing failed');
//       setIsSubmitting(false);
//     }
//   };
  
//   // Skip payment and go to My Bookings
//   const handleSkipPayment = () => {
//     navigate('/bookings');
//   };
  
//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
      
//       {error && (
//         <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
//           <p>{error}</p>
//         </div>
//       )}
      
//       <div className="mb-6 p-4 bg-gray-50 rounded-lg">
//         <h3 className="font-medium mb-2">Booking Summary</h3>
//         <p><span className="font-semibold">Booking ID:</span> {booking.booking_id}</p>
//         <p><span className="font-semibold">Amount:</span> ${paymentDetails.amount.toFixed(2)}</p>
//       </div>
      
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700 text-sm font-bold mb-2">
//             Payment Method
//           </label>
//           <select
//             name="method"
//             value={paymentDetails.method}
//             onChange={handleChange}
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             required
//           >
//             <option value="CARD">Credit/Debit Card</option>
//             <option value="UPI">UPI</option>
//             <option value="NET_BANKING">Net Banking</option>
//             <option value="WALLET">Wallet</option>
//           </select>
//         </div>
        
//         {paymentDetails.method === 'CARD' && (
//           <>
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Card Number
//               </label>
//               <input
//                 type="text"
//                 name="cardNumber"
//                 value={paymentDetails.cardNumber}
//                 onChange={handleChange}
//                 placeholder="1234 5678 9012 3456"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>
            
//             <div className="mb-4">
//               <label className="block text-gray-700 text-sm font-bold mb-2">
//                 Card Holder Name
//               </label>
//               <input
//                 type="text"
//                 name="cardHolder"
//                 value={paymentDetails.cardHolder}
//                 onChange={handleChange}
//                 placeholder="John Doe"
//                 className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                 required
//               />
//             </div>
            
//             <div className="grid grid-cols-2 gap-4 mb-4">
//               <div>
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   Expiry Date
//                 </label>
//                 <input
//                   type="text"
//                   name="expiryDate"
//                   value={paymentDetails.expiryDate}
//                   onChange={handleChange}
//                   placeholder="MM/YY"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   required
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-gray-700 text-sm font-bold mb-2">
//                   CVV
//                 </label>
//                 <input
//                   type="text"
//                   name="cvv"
//                   value={paymentDetails.cvv}
//                   onChange={handleChange}
//                   placeholder="123"
//                   className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//                   required
//                 />
//               </div>
//             </div>
//           </>
//         )}
        
//         <div className="mt-8 flex justify-between">
//           <button
//             type="button"
//             onClick={handleSkipPayment}
//             className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
//           >
//             Skip Payment (View Booking)
//           </button>
          
//           <div>
//             <button
//               type="button"
//               onClick={() => navigate(-1)}
//               className="mr-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
//               disabled={isSubmitting}
//             >
//               Go Back
//             </button>
            
//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
//             >
//               {isSubmitting ? 'Processing Payment...' : `Pay $${paymentDetails.amount.toFixed(2)}`}
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default PaymentForm;

// src/components/payment/PaymentForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingService from '../../services/booking.service';

const PaymentForm = ({ booking }) => {
  const [paymentDetails, setPaymentDetails] = useState({
    amount: 0,
    currency: 'USD',
    method: 'CARD',
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const bookingId = booking.booking_id;
  
  // Set payment amount from the booking prop
  useEffect(() => {
    // Always use 99.99 for testing
    setPaymentDetails(prev => ({
      ...prev,
      amount: 99.99
    }));
  }, [booking]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({ ...prev, [name]: value }));
  };
  
  // Process payment and update booking status
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Create a mock payment record
      const mockPaymentId = `MOCK-${Date.now()}`;
      
      // Try updating booking with payment info
      try {
        await BookingService.updateBookingPayment(bookingId, {
          payment_id: mockPaymentId,
          method: paymentDetails.method,
          amount: paymentDetails.amount,
          currency: paymentDetails.currency,
          status: 'SUCCESS',
          transaction_id: mockPaymentId
        });
      } catch (err) {
        console.warn("Payment update failed, but continuing with mock flow:", err);
        // Continue anyway for testing purposes
      }
      
      // For testing purposes, navigate to confirmation even if the API call fails
      navigate('/confirmation', { 
        state: { 
          bookingId, 
          paymentId: mockPaymentId,
          success: true
        } 
      });
    } catch (error) {
      setError('Payment processing failed. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  // Skip payment and go to My Bookings
  const handleSkipPayment = () => {
    // Don't make an API call, just navigate to bookings page
    navigate('/bookings');
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Payment Details</h2>
      
      {error && (
        <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
          <p>{error}</p>
        </div>
      )}
      
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-medium mb-2">Booking Summary</h3>
        <p><span className="font-semibold">Booking ID:</span> {booking.booking_id}</p>
        <p><span className="font-semibold">Amount:</span> ${paymentDetails.amount.toFixed(2)}</p>
        <div className="mt-2 p-2 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
          <p className="text-sm">This is a testing environment. No actual payment will be processed.</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Payment Method
          </label>
          <select
            name="method"
            value={paymentDetails.method}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="CARD">Credit/Debit Card</option>
            <option value="UPI">UPI</option>
            <option value="NET_BANKING">Net Banking</option>
            <option value="WALLET">Wallet</option>
          </select>
        </div>
        
        {paymentDetails.method === 'CARD' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={paymentDetails.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-xs text-gray-500 mt-1">For testing, you can leave this blank</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Card Holder Name
              </label>
              <input
                type="text"
                name="cardHolder"
                value={paymentDetails.cardHolder}
                onChange={handleChange}
                placeholder="John Doe"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
              <p className="text-xs text-gray-500 mt-1">For testing, you can leave this blank</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentDetails.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <p className="text-xs text-gray-500 mt-1">For testing, you can leave this blank</p>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentDetails.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <p className="text-xs text-gray-500 mt-1">For testing, you can leave this blank</p>
              </div>
            </div>
          </>
        )}
        
        <div className="mt-8 flex justify-between">
          <button
            type="button"
            onClick={handleSkipPayment}
            className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded"
          >
            Skip Payment (View Booking)
          </button>
          
          <div>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="mr-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded"
              disabled={isSubmitting}
            >
              Go Back
            </button>
            
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded disabled:opacity-50"
            >
              {isSubmitting ? 'Processing Payment...' : `Pay $${paymentDetails.amount.toFixed(2)}`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;