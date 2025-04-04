
// import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../store/slices/authSlice';

// const Header = () => {
//   const { user, isAuthenticated } = useSelector(state => state.auth);
//   const dispatch = useDispatch();

//   const handleLogout = () => {
//     dispatch(logout());
//   };

//   return (
//     <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-20">
//       <div className="container mx-auto px-4 py-4 flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center">
//           <Link to="/" className="text-2xl font-bold text-blue-600">
//             EventZen
//           </Link>
//         </div>
//         {/* Navigation Links */}
//         <nav className="flex space-x-6">
//           <Link to="/events" className="text-gray-700 hover:text-blue-600">
//             Events
//           </Link>
//           <Link to="/venues" className="text-gray-700 hover:text-blue-600">
//             Venues
//           </Link>
//           {isAuthenticated && (
//             <>
//               <Link to="/bookings" className="text-gray-700 hover:text-blue-600">
//                 My Bookings
//               </Link>
//               <Link to="/profile" className="text-gray-700 hover:text-blue-600">
//                 Profile
//               </Link>
//             </>
//           )}
//           {isAuthenticated && user && user.role === 'ADMIN' && (
//             <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600">
//               Admin
//             </Link>
//           )}
//         </nav>
//         {/* Authentication Controls */}
//         <div className="flex items-center space-x-4">
//           {isAuthenticated ? (
//             <>
//               <span className="text-gray-700">Welcome, {user.username}</span>
//               <button
//                 onClick={handleLogout}
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               <Link
//                 to="/login"
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/register"
//                 className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
//               >
//                 Register
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
// src/components/layout/Header.jsx
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';

const Header = ({ onToggleSidebar }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo & Hamburger */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onToggleSidebar}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
            aria-label="Toggle sidebar"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
          <Link to="/" className="text-2xl font-bold text-blue-600">
            EventZen
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex space-x-6">
          <Link to="/events" className="text-gray-700 hover:text-blue-600">
            Events
          </Link>
          <Link to="/venues" className="text-gray-700 hover:text-blue-600">
            Venues
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/bookings" className="text-gray-700 hover:text-blue-600">
                My Bookings
              </Link>
              <Link to="/profile" className="text-gray-700 hover:text-blue-600">
                Profile
              </Link>
            </>
          )}
          {isAuthenticated && user?.role === 'ADMIN' && (
            <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600">
              Admin
            </Link>
          )}
        </nav>

        {/* Authentication Controls */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-gray-700">Welcome, {user.username}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
