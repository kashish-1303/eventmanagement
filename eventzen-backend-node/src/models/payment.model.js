// src/models/payment.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
  payment_id: {
    type: String,
    required: true,
    unique: true
  },
  booking_id: {
    type: String,
    required: true,
    ref: 'Booking'
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'USD'
  },
  method: {
    type: String,
    enum: ['CARD', 'UPI', 'NET_BANKING', 'WALLET'],
    required: true
  },
  transaction_id: {
    type: String,
    unique: true,
    sparse: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED', 'REFUNDED'],
    default: 'PENDING'
  },
  receipt_url: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', PaymentSchema);