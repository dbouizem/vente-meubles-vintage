import { useEffect, useState } from 'react';
import { getProducts } from '../../services/products';
import CatalogEditorial from './components/CatalogEditorial';
import CatalogFilters from './components/CatalogFilters';
import ProductGrid from './components/ProductGrid';

function Catalog() {
  const [products, setProducts] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data);
        setErrorMessage('');
      })
      .catch(() => {
        setProducts([]);
        setErrorMessage('Impossible de charger les produits pour le moment.');
      });
  }, []);

  return (
    <section id="main" className="w-full bg-[#f8ecd4] px-4 py-8 text-[#24160e] sm:px-8">
      <div className="mx-auto max-w-7xl border-b border-[#d8c5a7] pb-4">
        <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.16em] text-[#5f4a35]">
          <p>
            Accueil <span className="mx-2">·</span> Boutique
          </p>
          <p>{products?.length || 0} pièces</p>
        </div>
      </div>

      {errorMessage && (
        <p
          role="status"
          className="mx-auto mt-6 max-w-7xl border border-[#9f312c]/35 bg-[#f0d2c8] px-4 py-3 text-left text-sm text-[#8f1d1d]"
        >
          {errorMessage}
        </p>
      )}

      <div className="mx-auto grid max-w-7xl gap-6 border-b border-[#d8c5a7] py-5 lg:grid-cols-[240px_1fr]">
        <CatalogFilters />
        <ProductGrid products={products} />
      </div>
      <CatalogEditorial />
    </section>
  );
}

export default Catalog;
