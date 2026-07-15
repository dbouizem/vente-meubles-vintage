import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import StoreLayout from '../layouts/StoreLayout';
import ProtectedAccountRoute from './ProtectedAccountRoute';
import ProtectedAdminRoute from './ProtectedAdminRoute';
import { INFORMATION_PAGES } from '../pages/Informations/information-pages';
import Accueil from '../pages/Accueil/Accueil';

const Admin = lazy(() => import('../pages/Admin/Admin'));
const Compte = lazy(() => import('../pages/Compte/Compte'));
const Confirmation = lazy(() => import('../pages/Commande/Confirmation'));
const Create = lazy(() => import('../pages/Creation_produit/Create'));
const InformationPage = lazy(() => import('../pages/Informations/InformationPage'));
const Livraison = lazy(() => import('../pages/Commande/Livraison'));
const Login = lazy(() => import('../pages/Login/Login'));
const ModifAdmin = lazy(() => import('../pages/ModifAdmin/ModifAdmin'));
const MotDePasseOublie = lazy(() => import('../pages/Compte/MotDePasseOublie'));
const Paiement = lazy(() => import('../pages/Commande/Paiement'));
const Panier = lazy(() => import('../pages/Panier/Panier'));
const Produit = lazy(() => import('../pages/Produit/Produit'));
const ReinitialiserMotDePasse = lazy(() => import('../pages/Compte/ReinitialiserMotDePasse'));
const Signup = lazy(() => import('../pages/Signup/Signup'));

const LoadingPage = () => (
  <p
    className="mx-auto my-10 max-w-4xl border border-[#dccbbd] bg-[#fbf1df] p-5 text-[#5f4a35]"
    role="status"
  >
    Chargement de la page…
  </p>
);

const loadPage = (Page) => (
  <Suspense fallback={<LoadingPage />}>
    <Page />
  </Suspense>
);

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={loadPage(Login)} />
      <Route path="/signup" element={loadPage(Signup)} />
      <Route path="/forgot-password" element={loadPage(MotDePasseOublie)} />
      <Route path="/reset-password" element={loadPage(ReinitialiserMotDePasse)} />

      <Route element={<StoreLayout />}>
        <Route path="/accueil" element={<Accueil />} />
        <Route path="/produit/:id" element={loadPage(Produit)} />
        <Route path="/panier" element={loadPage(Panier)} />
        <Route path="/commande/:token" element={loadPage(Confirmation)} />
        <Route path="/commande/livraison" element={loadPage(Livraison)} />
        <Route path="/commande/paiement" element={loadPage(Paiement)} />
        {Object.keys(INFORMATION_PAGES).map((path) => (
          <Route key={path} path={path} element={loadPage(InformationPage)} />
        ))}
      </Route>

      <Route element={<ProtectedAccountRoute />}>
        <Route element={<StoreLayout />}>
          <Route path="/compte" element={loadPage(Compte)} />
        </Route>
      </Route>

      <Route element={<ProtectedAdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={loadPage(Admin)} />
          <Route path="/create" element={loadPage(Create)} />
          <Route path="/modif/:id" element={loadPage(ModifAdmin)} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRouter;
