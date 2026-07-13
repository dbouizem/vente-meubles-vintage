import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';

function StoreLayout() {
  return (
    <div className="min-h-screen bg-[#f8f2ec] text-[#24160e]">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default StoreLayout;
