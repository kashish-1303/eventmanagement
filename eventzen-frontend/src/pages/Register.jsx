// src/pages/Register.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/auth/RegisterForm';

const Register = () => {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
        <RegisterForm />
        <div className="mt-4 text-center">
          <p>Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;