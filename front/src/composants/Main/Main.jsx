import { useState, useEffect } from "react";
import Vignette from "../Vignette/Vignette";
import "./main.css"
import { apiUrl, imageUrl } from "../../config/api";

function Main() {


  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl('/meubles'));
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des meubles');
      }

      const jsonData = await response.json();

      setData(jsonData);
      setErrorMessage('');
    } catch (error) {
      setData([]);
      setErrorMessage("Impossible de charger les produits pour le moment.");
    }
  };

  

  return (
  <section id="main" className="w-full bg-[#f7f0ed] px-4 py-10">
      <div className="mx-auto mb-8 max-w-6xl text-center">
        <h2 className="text-2xl sm:text-3xl font-semibold uppercase tracking-[0.12em] text-dark-brown">La collection</h2>
        <p className="mt-2 text-sm text-gray-600">Des pièces vintage sélectionnées pour donner du caractère à votre intérieur.</p>
      </div>

      {errorMessage && (
        <p role="status" className="mb-6 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700">{errorMessage}</p>
      )}

      <div className="products-grid mx-auto max-w-6xl">
      {data === null ? (
        <p className="col-span-full rounded-md bg-white px-4 py-3 text-gray-600 shadow-sm">Chargement des produits...</p>
      ) : data.length > 0 ? (
        data.map((item) => (
          <Vignette key={item.id} nom={item.titre} prix={item.prix} photo={imageUrl(item.photo)} id={item.id}
          />
         
        ))
      ) : (
        <p className="col-span-full rounded-md bg-white px-4 py-3 text-gray-600 shadow-sm">Aucun meuble disponible pour le moment.</p>
      )}
      </div>
    </section>
  );
}

export default Main;
