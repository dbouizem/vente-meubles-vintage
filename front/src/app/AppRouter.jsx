import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import StoreLayout from '../layouts/StoreLayout';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import Accueil from '../pages/Accueil/Accueil';
import Admin from '../pages/Admin/Admin';
import Create from '../pages/Creation_produit/Create';
import Login from '../pages/Login/Login';
import ModifAdmin from '../pages/ModifAdmin/ModifAdmin';
import Panier from '../pages/Panier/Panier';
import Produit from '../pages/Produit/Produit';
import Signup from '../pages/Signup/Signup';
import Confirmation from '../pages/Commande/Confirmation';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<StoreLayout />}>
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/produit/:id" element={<Produit />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/commande/:token" element={<Confirmation />} />
      </Route>

      <Route element={<ProtectedAdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<Admin />} />
          <Route path="/create" element={<Create />} />
          <Route path="/modif/:id" element={<ModifAdmin />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
