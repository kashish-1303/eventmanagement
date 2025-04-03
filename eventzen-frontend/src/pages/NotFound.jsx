// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-2xl mb-6">Page not found</p>
        <p className="mb-8 text-gray-600">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button variant="primary">Return to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;