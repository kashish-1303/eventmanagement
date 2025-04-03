// Export all layout components from this index file
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';

export { Header, Footer, Sidebar };

// Default export for convenience
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;