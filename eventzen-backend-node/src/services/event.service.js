const axios = require('axios');
const config = require('../config/config');

class EventService {
  constructor() {
    this.apiBaseUrl = config.springBootApiUrl;
  }

  async verifyEventExists(eventId, token) {
    try {
      const response = await axios.get(`${this.apiBaseUrl}/api/events/${eventId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      return {
        exists: response.status === 200,
        eventData: response.data
      };
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if (error.response.status === 404) {
          return { exists: false, error: 'Event not found' };
        }
        return { exists: false, error: `Server error: ${error.response.status}` };
      } else if (error.request) {
        // The request was made but no response was received
        return { exists: false, error: 'No response from event service' };
      } else {
        // Something happened in setting up the request
        return { exists: false, error: `Error: ${error.message}` };
      }
    }
  }
}

module.exports = new EventService();