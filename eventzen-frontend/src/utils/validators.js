// Email validation
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  // Password validation (minimum 8 characters, at least one uppercase, one lowercase, one number)
  export const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return passwordRegex.test(password);
  };
  
  // Required field validation
  export const isRequired = (value) => {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  };
  
  // Phone number validation
  export const isValidPhone = (phone) => {
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    return phoneRegex.test(phone);
  };
  
  // Form validation helper
  export const validateForm = (formData, validationRules) => {
    const errors = {};
    
    Object.keys(validationRules).forEach(field => {
      const value = formData[field];
      const fieldRules = validationRules[field];
      
      if (fieldRules.required && !isRequired(value)) {
        errors[field] = 'This field is required';
      } else if (fieldRules.email && value && !isValidEmail(value)) {
        errors[field] = 'Please enter a valid email address';
      } else if (fieldRules.password && value && !isValidPassword(value)) {
        errors[field] = 'Password must be at least 8 characters with uppercase, lowercase and numbers';
      } else if (fieldRules.phone && value && !isValidPhone(value)) {
        errors[field] = 'Please enter a valid phone number';
      } else if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
        errors[field] = `Must be at least ${fieldRules.minLength} characters`;
      } else if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
        errors[field] = `Cannot exceed ${fieldRules.maxLength} characters`;
      } else if (fieldRules.match && formData[fieldRules.match] !== value) {
        errors[field] = 'Values do not match';
      }
    });
    
    return errors;
  };