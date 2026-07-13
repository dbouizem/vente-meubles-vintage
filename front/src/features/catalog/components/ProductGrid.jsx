import { ChevronDown, Grid2X2, Rows3 } from 'lucide-react';
import { imageUrl } from '../../../services/api';
import ProductCard from './ProductCard';
import './product-grid.css';

function ProductGrid({ products }) {
  return (
    <div>
      <div className="mb-5 flex flex-col justify-between gap-4 border-b border-[#d8c5a7] pb-5 text-[11px] uppercase tracking-[0.16em] sm:flex-row sm:items-center">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-3 text-left transition hover:text-[#7c2d12]"
        >
          Trier par : Nouveautés <ChevronDown size={14} />
        </button>
        <div className="flex items-center gap-3">
          <span>Voir :</span>
          <button type="button" className="cursor-pointer text-[#7c2d12]" aria-label="Vue grille">
            <Grid2X2 size={17} />
          </button>
          <button
            type="button"
            className="cursor-pointer transition hover:text-[#7c2d12]"
            aria-label="Vue liste"
          >
            <Rows3 size={17} />
          </button>
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

      <div className="mt-8 flex items-center justify-center gap-6 font-serif text-base">
        <button className="h-9 w-9 border border-[#9a805d] bg-[#fbf1df]">1</button>
        <button>2</button>
        <button>3</button>
        <span>…</span>
        <button>8</button>
        <button aria-label="Page suivante">→</button>
      </div>
    </div>
  );
}

export default ProductGrid;
