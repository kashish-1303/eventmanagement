

// // src/App.js (updated)
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Provider } from 'react-redux';
// import store from './store';

// // Layout components
// import { Header, Footer } from './components/layout';

// // Pages
// import Home from './pages/Home';
// import Events from './pages/Events';
// import EventDetail from './pages/EventDetail';
// import Booking from './pages/Booking';
// import Payment from './pages/Payment';
// import Profile from './pages/Profile';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import NotFound from './pages/NotFound';
// // In App.js
// import Venues from './pages/Venues'; 

// // Admin pages
// import Dashboard from './pages/Admin/Dashboard';
// import ManageEvents from './pages/Admin/ManageEvents';
// import ManageVenues from './pages/Admin/ManageVenues';
// import ManageUsers from './pages/Admin/ManageUsers';

// // Route guard
// import ProtectedRoute from './components/common/ProtectedRoute';
// import AdminRoute from './components/common/AdminRoute';

// function App() {
//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <div className="min-h-screen flex flex-col">
//           <Header />
//           <main className="flex-grow">
//             <Routes>
//               <Route path="/" element={<Home />} />
//               <Route path="/events" element={<Events />} />
//               <Route path="/events/:id" element={<EventDetail />} />
//               <Route path="/venues" element={<Venues />} />
              
//               {/* Protected routes for authenticated users */}
//               <Route element={<ProtectedRoute />}>
//                 <Route path="/booking/:eventId" element={<Booking />} />
//                 <Route path="/payment/:bookingId" element={<Payment />} />
//                 <Route path="/bookings" element={<Bookings />} /> 
//                 <Route path="/profile" element={<Profile />} />
//               </Route>
              
//               {/* Admin routes */}
//               <Route element={<AdminRoute />}>
//                 <Route path="/admin" element={<Dashboard />} />
//                 <Route path="/admin/events" element={<ManageEvents />} />
//                 <Route path="/admin/venues" element={<ManageVenues />} />
//                 <Route path="/admin/users" element={<ManageUsers />} />
//               </Route>
              
//               {/* Auth routes */}
//               <Route path="/login" element={<Login />} />
//               <Route path="/register" element={<Register />} />
              
//               {/* 404 route */}
//               <Route path="*" element={<NotFound />} />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;
// src/App.js

// src/App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

// Layout components
import { Header, Footer, Sidebar } from './components/layout';

// Pages
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Booking from './pages/Booking';
import Bookings from './pages/Bookings'; // Add this new import
import Payment from './pages/Payment';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import Venues from './pages/Venues';

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
          <div className="flex flex-grow">
            <Sidebar />
            <main className="flex-grow pl-64 pt-4">
              <div className="container mx-auto px-4">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/events" element={<Events />} />
                  <Route path="/events/:id" element={<EventDetail />} />
                  <Route path="/venues" element={<Venues />} />
                  
                  {/* Protected routes for authenticated users */}
                  <Route element={<ProtectedRoute />}>
                    <Route path="/booking/:eventId" element={<Booking />} />
                    <Route path="/payment/:bookingId" element={<Payment />} />
                    <Route path="/bookings" element={<Bookings />} /> {/* Added Bookings route */}
                    <Route path="/profile" element={<Profile />} />
                  </Route>

                  {/* Admin routes */}
                  <Route element={<AdminRoute />}>
                    <Route path="/admin/dashboard" element={<Dashboard />} />
                    <Route path="/admin/manage-events" element={<ManageEvents />} />
                    <Route path="/admin/manage-venues" element={<ManageVenues />} />
                    <Route path="/admin/manage-users" element={<ManageUsers />} />
                  </Route>

                  {/* Auth routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />

                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </main>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;