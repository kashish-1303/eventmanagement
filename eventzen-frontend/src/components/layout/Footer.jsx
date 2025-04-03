// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">EventZen</h3>
            <p className="text-gray-300">
              Your one-stop solution for event booking and management.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/events" className="text-gray-300 hover:text-white">Events</Link></li>
              <li><Link to="/venues" className="text-gray-300 hover:text-white">Venues</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-white">Login</Link></li>
              <li><Link to="/register" className="text-gray-300 hover:text-white">Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-gray-300">
              Email: support@eventzen.com<br />
              Phone: (123) 456-7890
            </p>
            <div className="mt-4 flex space-x-4">
              {/* Social Media Icons */}
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-300">
          <p>&copy; {currentYear} EventZen. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;