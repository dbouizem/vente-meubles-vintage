import { Grid2X2 } from 'lucide-react';
import { imageUrl } from '../../../services/api';
import ProductCard from './ProductCard';
import './product-grid.css';

function ProductGrid({ products }) {
  return (
    <div>
      <div className="mb-5 flex flex-col justify-between gap-4 border-b border-[#d8c5a7] pb-5 text-[11px] uppercase tracking-[0.16em] sm:flex-row sm:items-center">
        <p className="text-[#5f4a35]">
          Tri et filtres <span className="ml-2 text-[#7c2d12]">bientôt disponibles</span>
        </p>
        <div className="flex items-center gap-3">
          <span>Vue :</span>
          <span className="text-[#7c2d12]" role="img" aria-label="Vue grille active">
            <Grid2X2 size={17} />
          </span>
        </div>
      </div>
      <div className="products-grid">
        {products === null ? (
          <p className="col-span-full border border-[#b58a55]/35 bg-[#fbf1df] px-4 py-3 text-[#5f4a35]">
            Chargement des produits...
          </p>
        ) : products.length > 0 ? (
          products.map((item, index) => (
            <ProductCard
              key={item.id}
              nom={item.titre}
              prix={item.prix}
              photo={imageUrl(item.photo)}
              id={item.id}
              index={index}
            />
          ))
        ) : (
          <p className="col-span-full border border-[#b58a55]/35 bg-[#fbf1df] px-4 py-3 text-[#5f4a35]">
            Aucun meuble disponible pour le moment.
          </p>
        )}
      </div>
      {products?.length > 0 && (
        <p className="mt-8 text-center text-xs uppercase tracking-[0.14em] text-[#5f4a35]">
          Tous les produits disponibles sont affichés
        </p>
      )}
    </div>
  );
}

export default ProductGrid;
