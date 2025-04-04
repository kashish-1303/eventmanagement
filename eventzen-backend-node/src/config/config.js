// eventzen-backend-node/src/config/config.js
require('dotenv').config();

module.exports = {
  springBootApiUrl: process.env.SPRING_BOOT_API_URL || 'http://localhost:8080',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key'
};