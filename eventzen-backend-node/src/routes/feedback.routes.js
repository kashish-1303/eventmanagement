// src/routes/feedback.routes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedback.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.post('/', authMiddleware.verifyToken, feedbackController.submitFeedback);
router.get('/event/:eventId', feedbackController.getEventFeedback);
router.get('/user/:userId', authMiddleware.verifyToken, feedbackController.getUserFeedback);

module.exports = router;