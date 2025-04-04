
// import Header from './Header';
// import Footer from './Footer';
// import Sidebar from './Sidebar';

// export { Header, Footer, Sidebar };

// const Layout = ({ children }) => {
//   return (
//     <>
//       <Header />
//       <div className="flex">
//         <Sidebar />
//         <div className="w-full lg:ml-64 pt-16">{children}</div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Layout;

// src/components/layout/Layout.jsx
import { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <>
      {/* Fixed Header */}
      <Header onToggleSidebar={toggleSidebar} />

      {/* Main Container */}
      <div className="pt-16 min-h-screen flex flex-col">
        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar isOpen={sidebarOpen} />
          {/* Main Content */}
          <main
            className={`flex-1 transition-all duration-300 ${
              sidebarOpen ? 'ml-64' : 'ml-0'
            }`}
          >
            {children}
          </main>
        </div>
        {/* Footer at the bottom */}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
