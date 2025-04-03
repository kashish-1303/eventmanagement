// // src/pages/Register.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import RegisterForm from '../components/auth/RegisterForm';

// const Register = () => {
//   return (
//     <div className="container mx-auto py-10 px-4">
//       <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
//         <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
//         <RegisterForm />
//         <div className="mt-4 text-center">
//           <p>Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link></p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Layout from '../components/layout';
// // Correcting the import path - using RegistrationForm instead of RegisterForm
// import RegistrationForm from '../components/auth/RegistrationForm';

// const Register = () => {
//   const { isAuthenticated } = useSelector(state => state.auth);

//   // Redirect if already authenticated
//   if (isAuthenticated) {
//     return <Navigate to="/profile" />;
//   }

//   return (
//     <Layout>
//       <div className="container py-5">
//         <div className="row justify-content-center">
//           <div className="col-md-6">
//             <RegistrationForm />
//             <div className="text-center mt-3">
//               Already have an account? <Link to="/login">Login here</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Register;
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/layout';
// Correcting the import path - using RegistrationForm instead of RegisterForm
import RegistrationForm from '../components/auth/RegistrationForm';

const Register = () => {
  const { isAuthenticated } = useSelector(state => state.auth);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  return (
    <Layout>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <RegistrationForm />
            <div className="text-center mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;