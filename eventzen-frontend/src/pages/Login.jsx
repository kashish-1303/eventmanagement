// src/pages/Login.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login to EventZen</h1>
        <LoginForm />
        <div className="mt-4 text-center">
          <p>Don't have an account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;