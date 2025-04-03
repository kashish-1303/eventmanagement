// src/components/common/Button.jsx
const Button = ({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    className = '',
    disabled = false
  }) => {
    const baseClasses = "px-4 py-2 rounded font-medium focus:outline-none transition";
    
    const variantClasses = {
      primary: "bg-blue-600 text-white hover:bg-blue-700",
      secondary: "bg-gray-600 text-white hover:bg-gray-700",
      success: "bg-green-600 text-white hover:bg-green-700",
      danger: "bg-red-600 text-white hover:bg-red-700",
      outline: "border border-blue-600 text-blue-600 hover:bg-blue-50"
    };
    
    const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";
    
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${baseClasses} ${variantClasses[variant]} ${disabledClasses} ${className}`}
      >
        {children}
      </button>
    );
  };
  
  export default Button;