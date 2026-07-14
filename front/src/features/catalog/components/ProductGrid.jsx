import { ChevronLeft, ChevronRight, Grid2X2 } from 'lucide-react';
import { imageUrl } from '../../../services/api';
import ProductCard from './ProductCard';
import './product-grid.css';

const SORT_OPTIONS = [
  ['newest', 'Nouveautés'],
  ['price_asc', 'Prix croissant'],
  ['price_desc', 'Prix décroissant'],
  ['name_asc', 'Nom A–Z'],
];

function ProductGrid({ products, isLoading, pagination, sort, onSortChange, onPageChange }) {
  return (
    <div aria-busy={isLoading}>
      <div className="mb-5 flex flex-col justify-between gap-4 border-b border-[#d8c5a7] pb-5 text-[11px] uppercase tracking-[0.16em] sm:flex-row sm:items-center">
        <label className="flex items-center gap-3" htmlFor="catalog-sort">
          Trier par
          <select
            id="catalog-sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            className="cursor-pointer border border-[#b58a55] bg-[#fbf1df] px-3 py-2 normal-case tracking-normal outline-none focus:border-[#7c2d12] focus:ring-1 focus:ring-[#7c2d12]"
          >
            {SORT_OPTIONS.map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-3 text-[#5f4a35]">
          <span>{pagination.total} résultat(s)</span>
          <Grid2X2 size={17} className="text-[#7c2d12]" aria-label="Vue grille" />
        </div>
      </div>

      <div
        className={`products-grid transition-opacity duration-200 ${isLoading ? 'opacity-50' : ''}`}
      >
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
              categorie={item.categorie}
              epoque={item.epoque}
            />
          ))
        ) : (
          <p className="col-span-full border border-[#b58a55]/35 bg-[#fbf1df] px-4 py-6 text-center text-[#5f4a35]">
            Aucun meuble ne correspond à ces critères. Essayez de modifier les filtres.
          </p>
        )}
      </div>

      {pagination.totalPages > 1 && (
        <nav
          className="mt-8 flex items-center justify-center gap-4"
          aria-label="Pagination du catalogue"
        >
          <button
            type="button"
            onClick={() => onPageChange(pagination.page - 1)}
            disabled={pagination.page === 1 || isLoading}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-[#b58a55] transition-colors hover:bg-[#7c2d12] hover:text-[#f8ecd4] disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Page précédente"
          >
            <ChevronLeft size={18} />
          </button>
          <span className="text-xs uppercase tracking-[0.14em]">
            Page {pagination.page} sur {pagination.totalPages}
          </span>
          <button
            type="button"
            onClick={() => onPageChange(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages || isLoading}
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center border border-[#b58a55] transition-colors hover:bg-[#7c2d12] hover:text-[#f8ecd4] disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Page suivante"
          >
            <ChevronRight size={18} />
          </button>
        </nav>
      )}
    </div>
  );
}

export default ProductGrid;
