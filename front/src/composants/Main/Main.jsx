import { useState, useEffect } from "react";
import Vignette from "../Vignette/Vignette";
import "./main.css"
import { apiUrl, imageUrl } from "../../config/api";

function Main() {


  const [data, setData] = useState(null);

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
    } catch (error) {
      setData([]);
    }
  };

  

  return (
  <div id="main" className="products-grid">
      {data ? (
        data.map((item) => (
          <Vignette key={item.id} nom={item.titre} prix={item.prix} photo={imageUrl(item.photo)} id={item.id}
          />
         
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Main;
