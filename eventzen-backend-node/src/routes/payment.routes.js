// src/routes/payment.routes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware.verifyToken, paymentController.createPayment);
router.patch('/:id/status', authMiddleware.verifyToken, paymentController.updatePaymentStatus);
router.get('/booking/:bookingId', authMiddleware.verifyToken, paymentController.getPaymentByBooking);

module.exports = router;