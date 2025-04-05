// src/controllers/payment.controller.js
const Payment = require('../models/payment.model');
const Booking = require('../models/booking.model');
const { v4: uuidv4 } = require('uuid');

exports.createPayment = async (req, res) => {
  try {
    const { booking_id, amount, currency, method } = req.body;
    
    // Check if booking exists
    const booking = await Booking.findOne({ booking_id });
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    const payment = new Payment({
      payment_id: uuidv4(),
      booking_id,
      amount,
      currency,
      method,
      status: 'PENDING'
    });
    
    const savedPayment = await payment.save();
    
    // Simulate payment processing
    // In a real application, you would integrate with a payment gateway here
    
    res.status(201).json(savedPayment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment', error: error.message });
  }
};
// Modified section of updatePaymentStatus in payment.controller.js
exports.updatePaymentStatus = async (req, res) => {
  try {
    console.log('⭐️ Payment status update requested:', {
      paymentId: req.params.id,
      newStatus: req.body.status,
      transactionId: req.body.transaction_id
    });
    
    const { status, transaction_id } = req.body;
    
    // Check if payment exists before update
    const existingPayment = await Payment.findOne({ payment_id: req.params.id });
    console.log('⭐️ Existing payment found:', existingPayment ? 'YES' : 'NO');
    
    const payment = await Payment.findOneAndUpdate(
      { payment_id: req.params.id },
      { 
        status,
        transaction_id,
        ...(status === 'SUCCESS' && { receipt_url: `receipts/${req.params.id}.pdf` })
      },
      { new: true }
    );
    

    
    if (!payment) {
      console.log('❌ Payment not found:', req.params.id);
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    console.log('✅ Payment updated successfully:', payment);
    
    // If payment is successful, update booking payment status
    if (status === 'SUCCESS') {
      console.log('⭐️ Attempting to update booking:', payment.booking_id);
      
      // Check if booking exists
      const existingBooking = await Booking.findOne({ booking_id: payment.booking_id });
      console.log('⭐️ Existing booking found:', existingBooking ? 'YES' : 'NO');
      
      if (existingBooking) {
        try {
          const updatedBooking = await Booking.findOneAndUpdate(
            { booking_id: payment.booking_id },
            { 
              payment_status: 'PAID',
              status: 'CONFIRMED'  // Also update the booking status
            },
            { new: true }
          );
          
          console.log('✅ Booking updated successfully:', updatedBooking);
        } catch (bookingError) {
          console.error('❌ Failed to update booking:', bookingError);
        }
      } else {
        console.error('❌ Booking not found for payment:', payment.booking_id);
      }
    }
    
    res.status(200).json(payment);
  } catch (error) {
    console.error('❌ Error in updatePaymentStatus:', error);
    res.status(500).json({ message: 'Error updating payment status', error: error.message });
  }
};

// exports.updatePaymentStatus = async (req, res) => {
//   try {
//     const { status, transaction_id } = req.body;
    
//     const payment = await Payment.findOneAndUpdate(
//       { payment_id: req.params.id },
//       { 
//         status,
//         transaction_id,
//         ...(status === 'SUCCESS' && { receipt_url: `receipts/${req.params.id}.pdf` })
//       },
//       { new: true }
//     );
    
//     if (!payment) {
//       return res.status(404).json({ message: 'Payment not found' });
//     }
    
//     // If payment is successful, update booking payment status
//    // If payment is successful, update booking payment status AND status
// if (status === 'SUCCESS') {
//   try {
//     const updatedBooking = await Booking.findOneAndUpdate(
//       { booking_id: payment.booking_id },
//       { 
//         payment_status: 'PAID',
//         status: 'CONFIRMED' 
//       },
//       { new: true }
//     );
//     console.log('Booking updated successfully:', updatedBooking);
//   } catch (bookingError) {
//     console.error('Failed to update booking after payment:', bookingError);
//     // Consider sending an error response here
//   }
// }
    
//     res.status(200).json(payment);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating payment status', error: error.message });
//   }
// };

exports.getPaymentByBooking = async (req, res) => {
  try {
    const payment = await Payment.findOne({ booking_id: req.params.bookingId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found for this booking' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment', error: error.message });
  }
};