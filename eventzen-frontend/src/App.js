
// // src/App.js
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';
// import Layout from './components/layout/Layout';

// // Import your pages
// import Home from './pages/Home';
// import Events from './pages/Events';
// import EventDetail from './pages/EventDetail';
// import Booking from './pages/Booking';
// import Bookings from './pages/Bookings';
// import Payment from './pages/Payment';
// import Profile from './pages/Profile';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import NotFound from './pages/NotFound';
// import Venues from './pages/Venues';

// // Admin pages
// import Dashboard from './pages/Admin/Dashboard';
// import ManageEvents from './pages/Admin/ManageEvents';
// import ManageVenues from './pages/Admin/ManageVenues';
// import ManageUsers from './pages/Admin/ManageUsers';

// // Route guards
// import ProtectedRoute from './components/common/ProtectedRoute';
// import AdminRoute from './components/common/AdminRoute';

// function App() {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//       <Layout>
//                 <Routes>
//                   <Route path="/" element={<Home />} />
//                   <Route path="/events" element={<Events />} />
//                   <Route path="/events/:id" element={<EventDetail />} />
//                   <Route path="/venues" element={<Venues />} />
//                   <Route element={<ProtectedRoute />}>
//                     <Route path="/booking/:eventId" element={<Booking />} />
//                     <Route path="/payment/:bookingId" element={<Payment />} />
//                     <Route path="/bookings" element={<Bookings />} />
//                     <Route path="/profile" element={<Profile />} />
//                   </Route>
//                   <Route element={<AdminRoute />}>
//                     <Route path="/admin/dashboard" element={<Dashboard />} />
//                     <Route path="/admin/manage-events" element={<ManageEvents />} />
//                     <Route path="/admin/manage-venues" element={<ManageVenues />} />
//                     <Route path="/admin/manage-users" element={<ManageUsers />} />
//                   </Route>
//                   <Route path="/login" element={<Login />} />
//                   <Route path="/register" element={<Register />} />
//                   <Route path="*" element={<NotFound />} />
//                 </Routes>
//                 </Layout>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;
// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/common/ProtectedRoute';

// Import your pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Venues from './pages/Venues';
import Booking from './pages/Booking';
import Bookings from './pages/Bookings';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';

// Import admin pages
import Dashboard from './pages/Admin/Dashboard';
import ManageEvents from './pages/Admin/ManageEvents';
import ManageVenues from './pages/Admin/ManageVenues';
import ManageUsers from './pages/Admin/ManageUsers';

import './App.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Layout>
            <main className="flex-grow">
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/events" element={<Events />} />
                <Route path="/events/:id" element={<EventDetail />} />
                <Route path="/venues" element={<Venues />} />
                
                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/booking/:eventId" element={<Booking />} />
                  <Route path="/bookings" element={<Bookings />} />
                  <Route path="/payment/:bookingId" element={<Payment />} />
                  <Route path="/confirmation/:bookingId" element={<Confirmation />} />
                  <Route path="/profile" element={<Profile />} />
                  
                  {/* Admin routes */}
                  <Route path="/admin/dashboard" element={<Dashboard />} />
                  <Route path="/admin/events" element={<ManageEvents />} />
                  <Route path="/admin/venues" element={<ManageVenues />} />
                  <Route path="/admin/users" element={<ManageUsers />} />
                </Route>
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            </Layout>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;