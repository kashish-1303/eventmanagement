// src/routes/booking.routes.js
const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware.verifyToken, bookingController.createBooking);
router.get('/', authMiddleware.verifyToken, authMiddleware.isAdmin, bookingController.getBookings);
router.get('/:id', authMiddleware.verifyToken, bookingController.getBookingById);
router.patch('/:id/status', authMiddleware.verifyToken, bookingController.updateBookingStatus);
router.get('/user/:userId', authMiddleware.verifyToken, bookingController.getUserBookings);

module.exports = router;