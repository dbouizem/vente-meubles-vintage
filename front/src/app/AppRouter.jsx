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
import Livraison from '../pages/Commande/Livraison';
import Paiement from '../pages/Commande/Paiement';
import ProtectedAccountRoute from './ProtectedAccountRoute';
import Compte from '../pages/Compte/Compte';
import MotDePasseOublie from '../pages/Compte/MotDePasseOublie';
import ReinitialiserMotDePasse from '../pages/Compte/ReinitialiserMotDePasse';
import InformationPage from '../pages/Informations/InformationPage';
import { INFORMATION_PAGES } from '../pages/Informations/information-pages';

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<MotDePasseOublie />} />
      <Route path="/reset-password" element={<ReinitialiserMotDePasse />} />

      <Route element={<StoreLayout />}>
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/produit/:id" element={<Produit />} />
        <Route path="/panier" element={<Panier />} />
        <Route path="/commande/:token" element={<Confirmation />} />
        <Route path="/commande/livraison" element={<Livraison />} />
        <Route path="/commande/paiement" element={<Paiement />} />
        {Object.keys(INFORMATION_PAGES).map((path) => (
          <Route key={path} path={path} element={<InformationPage />} />
        ))}
      </Route>

      <Route element={<ProtectedAccountRoute />}>
        <Route element={<StoreLayout />}>
          <Route path="/compte" element={<Compte />} />
        </Route>
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
