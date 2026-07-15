import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import RouteFocus from '../components/accessibility/RouteFocus';

function StoreLayout() {
  return (
    <div className="min-h-screen bg-[#f8f2ec] text-[#24160e]">
      <a href="#main-content" className="skip-link">
        Aller au contenu principal
      </a>
      <RouteFocus />
      <Navbar />
      <div id="main-content" tabIndex="-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default StoreLayout;
