// // src/components/auth/RegisterForm.jsx
// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { register } from '../../store/slices/authSlice';
// import { Button, Input } from '../common';

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     confirmPassword: ''
//   });
//   const [errors, setErrors] = useState({});
//   const dispatch = useDispatch();
  
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     // Clear error when user types
//     if (errors[e.target.name]) {
//       setErrors(prev => ({ ...prev, [e.target.name]: '' }));
//     }
//   };
  
//   const validate = () => {
//     const newErrors = {};
    
//     if (!formData.username.trim()) {
//       newErrors.username = 'Username is required';
//     }
    
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }
    
//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters';
//     }
    
//     if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords do not match';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if (validate()) {
//       dispatch(register({
//         username: formData.username,
//         email: formData.email,
//         password: formData.password
//       }));
//     }
//   };
  
//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <Input
//         label="Username"
//         name="username"
//         value={formData.username}
//         onChange={handleChange}
//         error={errors.username}
//         required
//       />
      
//       <Input
//         label="Email"
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleChange}
//         error={errors.email}
//         required
//       />
      
//       <Input
//         label="Password"
//         type="password"
//         name="password"
//         value={formData.password}
//         onChange={handleChange}
//         error={errors.password}
//         required
//       />
      
//       <Input
//         label="Confirm Password"
//         type="password"
//         name="confirmPassword"
//         value={formData.confirmPassword}
//         onChange={handleChange}
//         error={errors.confirmPassword}
//         required
//       />
      
//       <Button type="submit" className="w-full">
//         Register
//       </Button>
//     </form>
//   );
// };

// export default RegisterForm;
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../store/slices/authSlice';
import { Button, Input } from '../common';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear field error when typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        const { confirmPassword, name, ...rest } = formData;
        // Map 'name' to 'username'
        const registerData = { username: name, ...rest };
        await dispatch(register(registerData)).unwrap();
        navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
      } catch (err) {
        // Registration error will be handled by the slice
      }
    }
  };
  

  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Create Account</h2>
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <Input
              label="Full Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
              required
            />
          </div>
          
          <div className="mb-3">
            <Input
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              required
            />
          </div>
          
          <div className="mb-3">
            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              required
            />
          </div>
          
          <div className="mb-3">
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
              required
            />
          </div>
          
          <div className="d-grid">
            <Button 
              type="submit" 
              disabled={loading}
              text={loading ? 'Creating Account...' : 'Register'}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;