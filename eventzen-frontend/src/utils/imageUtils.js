// src/utils/imageUtils.js
export const getEventImageByCategory = (category) => {
    switch (category) {
      case 'TECH':
        return '/images/tech.jpeg';
      case 'CORPORATE':
        return '/images/corporate.jpeg';
      case 'SOCIAL':
        return '/images/social.jpeg';
      case 'SPORTS':
        return '/images/sports.jpeg';
      default:
        return '/images/default.jpeg';
    }
  };