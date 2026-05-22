
import Navbar from '../../composants/Navbar/Navbar';
import Detail from '../../composants/Detail/Detail';
import { Link } from 'react-router-dom';
import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { apiUrl, imageUrl } from '../../config/api';



function Produit() {
  let { id } = useParams()
  const [produitDetail, setproduitDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(apiUrl(`/meubles/${id}`));
        if (!response.ok) {
          throw new Error('Produit introuvable');
        }
        const jsonData = await response.json();
        setproduitDetail(jsonData[0] || {});
        setErrorMessage('');
      } catch (error) {
        setproduitDetail({});
        setErrorMessage("Ce produit est introuvable ou indisponible.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <Navbar />
      <div className='h-16 flex justify-start items-center px-4'>
        <Link to="/accueil" className='text-dark-brown'>
        <p className='sm:ml-[10%] w-full font-semibold'>Retour à la boutique</p>
        </Link>
      </div>

      {isLoading ? (
        <p className="mx-auto max-w-4xl rounded-md bg-white px-4 py-3 text-gray-600 shadow-sm">Chargement du produit...</p>
      ) : errorMessage ? (
        <div className="mx-auto max-w-4xl rounded-md border border-red-200 bg-red-50 px-4 py-6 text-red-700">
          <p className="font-semibold">{errorMessage}</p>
          <Link to="/accueil" className="mt-4 inline-block rounded-md bg-dark-brown px-4 py-2 text-white">Voir les produits</Link>
        </div>
      ) : (
      <div className='mx-auto grid w-full max-w-6xl grid-cols-1 lg:grid-cols-2 min-h-[600px] gap-6 px-4 pb-8'>
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
      )}
    </div>
  );
}

export default Produit;
