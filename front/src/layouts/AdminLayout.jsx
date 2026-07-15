import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';
import Navbar from '../components/layout/Navbar';
import RouteFocus from '../components/accessibility/RouteFocus';

function AdminLayout() {
  return (
    <div className="min-h-screen bg-beige">
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

export default AdminLayout;
