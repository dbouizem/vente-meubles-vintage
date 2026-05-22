
import Navbar from '../../composants/Navbar/Navbar';
import Detail from '../../composants/Detail/Detail';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { apiUrl, imageUrl } from '../../config/api';



function Produit() {
  let { id } = useParams()
  const [produitDetail, setproduitDetail] = useState({});


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl(`/meubles/${id}`));
        if (!response.ok) {
          throw new Error('Produit introuvable');
        }
        const jsonData = await response.json();
        setproduitDetail(jsonData[0] || {});
      } catch (error) {
        setproduitDetail({});
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className='h-16 flex justify-start items-center'>
        <Link to="/accueil" className='text-dark-brown'>
        <p className='ml-[10%] w-full'>Retour à la recherche</p>
        </Link>
      </div>
      
      <div className='w-full grid grid-cols-1 lg:grid-cols-2 min-h-[600px] gap-6 px-4 pb-8'>
        <div className='flex justify-center items-center h-auto'>
            <img className="max-h-[420px] w-full max-w-xl object-contain" src={imageUrl(produitDetail.photo || 'img_non_dispo.jpg')} alt={produitDetail.titre ?? "Produit"}></img>
        </div>

        <div className='flex justify-center items-center'>
          <Detail
            id={id}
            nom={produitDetail.titre ?? "..."}
            prix={produitDetail.prix ?? "..."}
            description={produitDetail.description ?? "..."}
            hauteur={produitDetail.hauteur}
            largeur={produitDetail.largeur}
            longueur={produitDetail.longueur}
            disponibilite={produitDetail.disponibilite}
            categorie={produitDetail.categorie}
            photo={imageUrl(produitDetail.photo || 'img_non_dispo.jpg')}
          />
        </div>
      </div>
    </div>
  );
}

export default Produit;
