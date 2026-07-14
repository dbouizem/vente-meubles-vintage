import { useDeferredValue, useEffect, useState } from 'react';
import { getCatalog, getCategories } from '../../services/products';
import CatalogEditorial from './components/CatalogEditorial';
import CatalogFilters from './components/CatalogFilters';
import ProductGrid from './components/ProductGrid';

const INITIAL_FILTERS = { q: '', category: '', min_price: '', max_price: '', sort: 'newest' };
const INITIAL_PAGINATION = { page: 1, limit: 6, total: 0, totalPages: 1 };

function Catalog() {
  const [products, setProducts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState(INITIAL_PAGINATION);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const deferredSearch = useDeferredValue(filters.q);
  const { category, max_price: maxPrice, min_price: minPrice, sort } = filters;

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => setCategories([]));
  }, []);

  useEffect(() => {
    let isCurrent = true;
    setIsLoading(true);
    getCatalog({
      q: deferredSearch,
      category,
      max_price: maxPrice,
      min_price: minPrice,
      sort,
      page,
      limit: 6,
    })
      .then((data) => {
        if (!isCurrent) return;
        setProducts(data.items);
        setPagination(data.pagination);
        setErrorMessage('');
      })
      .catch(() => {
        if (!isCurrent) return;
        setProducts([]);
        setErrorMessage('Impossible de charger les produits pour le moment.');
      })
      .finally(() => {
        if (isCurrent) setIsLoading(false);
      });
    return () => {
      isCurrent = false;
    };
  }, [category, deferredSearch, maxPrice, minPrice, page, sort]);

  const changeFilter = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  };

  return (
    <section id="main" className="w-full bg-[#f8ecd4] px-4 py-8 text-[#24160e] sm:px-8">
      <div className="mx-auto max-w-7xl border-b border-[#d8c5a7] pb-4">
        <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.16em] text-[#5f4a35]">
          <p>
            Accueil <span className="mx-2">·</span> Boutique
          </p>
          <p aria-live="polite">{pagination.total} pièces</p>
        </div>
      </div>

      {errorMessage && (
        <p
          role="alert"
          className="mx-auto mt-6 max-w-7xl border border-[#9f312c]/35 bg-[#f0d2c8] px-4 py-3 text-left text-sm text-[#8f1d1d]"
        >
          {errorMessage}
        </p>
      )}

      <div className="mx-auto grid max-w-7xl gap-6 border-b border-[#d8c5a7] py-5 lg:grid-cols-[260px_1fr]">
        <CatalogFilters
          filters={filters}
          categories={categories}
          onChange={changeFilter}
          onReset={() => {
            setFilters(INITIAL_FILTERS);
            setPage(1);
          }}
        />
        <ProductGrid
          products={products}
          isLoading={isLoading}
          pagination={pagination}
          sort={filters.sort}
          onSortChange={(value) => changeFilter('sort', value)}
          onPageChange={(nextPage) => {
            setPage(nextPage);
            window.scrollTo({ top: 500, behavior: 'smooth' });
          }}
        />
      </div>
      <CatalogEditorial />
    </section>
  );
}

export default Catalog;
