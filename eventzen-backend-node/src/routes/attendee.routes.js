// src/routes/attendee.routes.js
const express = require('express');
const router = express.Router();
const attendeeController = require('../controllers/attendee.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware.verifyToken, attendeeController.addAttendee);
router.get('/booking/:bookingId', authMiddleware.verifyToken, attendeeController.getAttendeesByBooking);
router.patch('/:id', authMiddleware.verifyToken, attendeeController.updateAttendee);
router.delete('/:id', authMiddleware.verifyToken, attendeeController.deleteAttendee);

module.exports = router;