import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

function AdminLayout() {
  return (
    <div className="min-h-screen bg-beige">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AdminLayout;
