import ProductDetails from '../../features/catalog/components/ProductDetails';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { imageUrl } from '../../services/api';
import { getProduct, getProducts } from '../../services/products';
import ProductCard from '../../features/catalog/components/ProductCard';
import { motion } from 'motion/react';
import { Box } from 'lucide-react';
import '../../features/catalog/components/product-grid.css';

function Produit() {
  let { id } = useParams();
  const [produitDetail, setproduitDetail] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [product, products] = await Promise.all([getProduct(id), getProducts()]);
        if (!product) throw new Error('Produit introuvable');
        setproduitDetail(product);
        setErrorMessage('');
        setRelatedProducts(products.filter((item) => String(item.id) !== String(id)).slice(0, 5));
      } catch (error) {
        setproduitDetail({});
        setErrorMessage('Ce produit est introuvable ou indisponible.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const productImage = imageUrl(produitDetail.photo || 'img_non_dispo.jpg');

  return (
    <div>
      {isLoading ? (
        <p className="mx-auto my-10 max-w-4xl border border-[#dccbbd] bg-white px-4 py-3 text-[#5f4a35] shadow-sm">
          Chargement du produit...
        </p>
      ) : errorMessage ? (
        <div className="mx-auto my-10 max-w-4xl border border-red-200 bg-red-50 px-4 py-6 text-red-700">
          <p className="font-semibold">{errorMessage}</p>
          <Link to="/accueil" className="mt-4 inline-block bg-[#17100b] px-4 py-2 text-white">
            Voir les produits
          </Link>
        </div>
      ) : (
        <main>
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
            <div className="mb-8 flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#5f4a35]">
              <Link to="/accueil" className="transition hover:text-[#7c2d12]">
                Accueil
              </Link>
              <span>·</span>
              <Link to="/accueil" className="transition hover:text-[#7c2d12]">
                Boutique
              </Link>
              <span>·</span>
              <span className="text-[#24160e]">{produitDetail.titre}</span>
            </div>

            <section className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[0.62fr_0.38fr]">
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="relative flex min-h-[420px] items-center justify-center overflow-hidden border border-[#dccbbd] bg-[#f3e7d7] p-6 lg:min-h-[700px]"
                >
                  <img
                    className="max-h-full w-full object-contain drop-shadow-xl"
                    src={productImage}
                    alt={produitDetail.titre ?? 'Produit'}
                  />
                </motion.div>
              </div>

              <div className="flex items-start pt-2 lg:pt-0">
                <ProductDetails
                  id={id}
                  nom={produitDetail.titre ?? '...'}
                  prix={produitDetail.prix ?? '...'}
                  description={produitDetail.description ?? '...'}
                  hauteur={produitDetail.hauteur}
                  largeur={produitDetail.largeur}
                  longueur={produitDetail.longueur}
                  disponibilite={produitDetail.disponibilite}
                  categorie={produitDetail.categorie}
                  photo={productImage}
                  style={produitDetail.style}
                  epoque={produitDetail.epoque}
                  matiere={produitDetail.matiere}
                  couleur={produitDetail.couleur}
                  etat={produitDetail.etat}
                  poids={produitDetail.poids}
                  stock={produitDetail.stock}
                  sku={produitDetail.sku}
                />
              </div>
            </section>
          </div>

          <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-10 sm:px-8 lg:grid-cols-[0.58fr_0.42fr]">
            <div className="grid min-h-[270px] border border-[#dccbbd] bg-white p-8 sm:grid-cols-[0.4fr_0.6fr]">
              <div className="flex flex-col justify-center">
                <p className="font-serif text-2xl uppercase text-[#4a2b18]">
                  Découvrir sous tous les angles
                </p>
                <p className="mt-4 text-sm leading-7 text-[#5f4a35]">
                  Faites glisser pour imaginer la pièce dans votre intérieur et admirer chaque
                  détail.
                </p>
                <Box className="mt-6 text-[#7c2d12]" size={24} />
              </div>
              <div className="flex items-center justify-center">
                <img src={productImage} alt="" className="max-h-[250px] w-full object-contain" />
              </div>
            </div>

            <div className="relative min-h-[270px] overflow-hidden border border-[#dccbbd] bg-[#17100b] p-8 text-[#f8ecd4]">
              <img
                src="/assets/atelier-heritage/paris-band.webp"
                loading="lazy"
                decoding="async"
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-45"
              />
              <div className="relative ml-auto flex h-full max-w-sm flex-col justify-center">
                <p className="font-serif text-2xl uppercase">Matières nobles</p>
                <p className="mt-4 text-sm leading-7 text-[#f1dfbf]/80">
                  Bois, patines et tissus sont sélectionnés pour leur présence et leur capacité à
                  traverser le temps.
                </p>
                <span
                  className="mt-6 inline-flex cursor-not-allowed items-center gap-3 text-xs uppercase tracking-[0.16em] text-[#c6a16b] opacity-70"
                  title="Guide des matières bientôt disponible"
                >
                  Guide des matières — bientôt
                </span>
              </div>
            </div>
          </section>

          {relatedProducts.length > 0 && (
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-8">
              <h2 className="font-serif text-2xl uppercase text-[#4a2b18]">Vous aimerez aussi</h2>
              <div className="products-grid mt-5">
                {relatedProducts.map((item, index) => (
                  <ProductCard
                    key={`${item.id}-related`}
                    nom={item.titre}
                    prix={item.prix}
                    photo={imageUrl(item.photo)}
                    id={item.id}
                    index={index}
                  />
                ))}
              </div>
            </section>
          )}
        </main>
      )}
      <div className="border-t border-[#dccbbd] bg-[#fbf1df] px-4 py-6 sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 text-sm text-[#5f4a35] sm:grid-cols-3">
          <p>
            <span className="font-semibold text-[#24160e]">Besoin d’aide ?</span>
            <br />
            Nous sommes là pour vous
          </p>
          <p>
            <span className="font-semibold text-[#24160e]">Écrivez-nous</span>
            <br />
            contact@atelierheritage.com
          </p>
          <p>
            <span className="font-semibold text-[#24160e]">Appelez-nous</span>
            <br />
            +33 1 42 33 10 10
          </p>
        </div>
      </div>
    </div>
  );
}

export default Produit;
