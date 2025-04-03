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

exports.updatePaymentStatus = async (req, res) => {
  try {
    const { status, transaction_id } = req.body;
    
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
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    // If payment is successful, update booking payment status
    if (status === 'SUCCESS') {
      await Booking.findOneAndUpdate(
        { booking_id: payment.booking_id },
        { payment_status: 'PAID' }
      );
    } else if (status === 'FAILED') {
      await Booking.findOneAndUpdate(
        { booking_id: payment.booking_id },
        { payment_status: 'FAILED' }
      );
    }
    
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating payment status', error: error.message });
  }
};

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