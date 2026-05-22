import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import Login from "./pages/Login/Login";
import Accueil from "./pages/Accueil/Accueil";
import Admin from "./pages/Admin/Admin";
import Panier from "./pages/Panier/Panier";
import Produit from "./pages/Produit/Produit";
import Signup from "./pages/Signup/signup";

import './App.css';
import { useEffect, useState } from "react";
import Create from "./pages/Creation_produit/Create";
import ModifAdmin from "./pages/ModifAdmin/ModifAdmin";
import { panierContext, reductionContext } from "./contexts";


  const PANIER_STORAGE_KEY = 'panier';

function App() {
  
  const [panier, setPanier] = useState(() => {
    const storedPanier = localStorage.getItem(PANIER_STORAGE_KEY);

    if (!storedPanier) {
      return [];
    }

    try {
      return JSON.parse(storedPanier);
    } catch (error) {
      localStorage.removeItem(PANIER_STORAGE_KEY);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(PANIER_STORAGE_KEY, JSON.stringify(panier));
  }, [panier]);

  const ProtectedAdminRoute = ({ children }) => {
    return localStorage.getItem("adminToken") ? children : <Navigate to="/" replace />;
  };

  return (
    <panierContext.Provider value={{panier, setPanier}}>
      <reductionContext.Provider value = {10}>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/> 
      <Route path="/accueil" element={<Accueil/>}/>
      <Route path="/admin" element={<ProtectedAdminRoute><Admin/></ProtectedAdminRoute>}/>
      <Route path="/produit/:id" element={<Produit/>}/>
      <Route path="/panier/" element={<Panier/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/create" element={<ProtectedAdminRoute><Create/></ProtectedAdminRoute>}/>
      <Route path="/modif/:id" element={<ProtectedAdminRoute><ModifAdmin/></ProtectedAdminRoute>}/>
    </Routes>
    </BrowserRouter>    
      </reductionContext.Provider>
    </panierContext.Provider>

  )
}


export default App
