// src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const axios = require('axios');

const SPRING_API_URL = process.env.SPRING_API_URL || 'http://localhost:8080/api';
const JWT_SECRET = process.env.JWT_SECRET;

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token', error: error.message });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Access denied: Admin role required' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: 'Error verifying admin access', error: error.message });
  }
};