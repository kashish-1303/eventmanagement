// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// src/App.js
// import React from 'react';
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Header from './components/layout/Header';
// import Footer from './components/layout/Footer';
// import Home from './pages/Home';
// import Events from './pages/Events';
// import EventDetail from './pages/EventDetail';
// import Booking from './pages/Booking';
// import Payment from './pages/Payment';
// import Confirmation from './pages/Confirmation';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Profile from './pages/Profile';
// import Dashboard from './pages/Admin/Dashboard';
// import ManageEvents from './pages/Admin/ManageEvents';
// import ManageVenues from './pages/Admin/ManageVenues';
// import NotFound from './pages/NotFound';
// import './App.css';

// const PrivateRoute = ({ children }) => {
//   const { isLoggedIn } = useSelector(state => state.auth);
//   return isLoggedIn ? children : <Navigate to="/login" />;
// };

// const AdminRoute = ({ children }) => {
//   const { isLoggedIn, user } = useSelector(state => state.auth);
//   return isLoggedIn && user?.role === 'ADMIN' ? children : <Navigate to="/" />;
// };

// function App() {
//   return (
//     <BrowserRouter>
//       <div className="flex flex-col min-h-screen">
//         <Header />
//         <main className="flex-grow container mx-auto px-4 py-6">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/events" element={<Events />} />
//             <Route path="/events/:id" element={<EventDetail />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
            
//             <Route path="/events/:id/book" element={
//               <PrivateRoute>
//                 <Booking />
//               </PrivateRoute>
//             } />
            
//             <Route path="/bookings/:bookingId/payment" element={
//               <PrivateRoute>
//                 <Payment />
//               </PrivateRoute>
//             } />
            
//             <Route path="/bookings/confirmation" element={
//               <PrivateRoute>
//                 <Confirmation />
//               </PrivateRoute>
//             } />
            
//             <Route path="/profile" element={
//               <PrivateRoute>
//                 <Profile />
//               </PrivateRoute>
//             } />
            
//             <Route path="/admin" element={
//               <AdminRoute>
//                 <Dashboard />
//               </AdminRoute>
//             } />
            
//             <Route path="/admin/events" element={
//               <AdminRoute>
//                 <ManageEvents />
//               </AdminRoute>
//             } />
            
//             <Route path="/admin/venues" element={
//               <AdminRoute>
//                 <ManageVenues />
//               </AdminRoute>
//             } />
            
//             <Route path="*" element={<NotFound />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </BrowserRouter>
//   );
// }

// export default App;

// src/App.js (updated)
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Layout components
import { Header, Footer } from './components/layout';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Admin pages
import Dashboard from './pages/Admin/Dashboard';
import ManageEvents from './pages/Admin/ManageEvents';
import ManageVenues from './pages/Admin/ManageVenues';
import ManageUsers from './pages/Admin/ManageUsers';

// Route guard
import ProtectedRoute from './components/common/ProtectedRoute';
import AdminRoute from './components/common/AdminRoute';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              
              {/* Protected routes for authenticated users */}
              <Route element={<ProtectedRoute />}>
                <Route path="/booking/:eventId" element={<Booking />} />
                <Route path="/payment/:bookingId" element={<Payment />} />
                <Route path="/profile" element={<Profile />} />
              </Route>
              
              {/* Admin routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin" element={<Dashboard />} />
                <Route path="/admin/events" element={<ManageEvents />} />
                <Route path="/admin/venues" element={<ManageVenues />} />
                <Route path="/admin/users" element={<ManageUsers />} />
              </Route>
              
              {/* Auth routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* 404 route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;