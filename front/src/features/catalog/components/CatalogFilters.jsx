import { Search, SlidersHorizontal, X } from 'lucide-react';

function CatalogFilters({ filters, categories, onChange, onReset }) {
  const hasFilters = Boolean(
    filters.q || filters.category || filters.min_price || filters.max_price,
  );

  return (
    <aside className="border-[#d8c5a7] lg:border-r lg:pr-6" aria-label="Filtres du catalogue">
      <div className="flex items-center justify-between border-b border-[#d8c5a7] pb-4 text-[11px] uppercase tracking-[0.16em]">
        <span className="inline-flex items-center gap-2">
          <SlidersHorizontal size={15} aria-hidden="true" /> Filtrer
        </span>
        <button
          type="button"
          onClick={onReset}
          disabled={!hasFilters}
          className="inline-flex cursor-pointer items-center gap-1 text-[#7c2d12] transition-colors hover:text-[#24160e] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <X size={14} aria-hidden="true" /> Réinitialiser
        </button>
      </div>

      <div className="grid gap-4 py-5 sm:grid-cols-2 lg:grid-cols-1">
        <label className="block text-[11px] uppercase tracking-[0.14em]" htmlFor="catalog-search">
          Rechercher
          <span className="relative mt-2 block">
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#7c2d12]"
            />
            <input
              id="catalog-search"
              type="search"
              value={filters.q}
              onChange={(event) => onChange('q', event.target.value)}
              placeholder="Table, buffet, bois…"
              className="w-full border border-[#b58a55] bg-[#fbf1df] py-3 pl-10 pr-3 text-sm normal-case tracking-normal outline-none transition-colors placeholder:text-[#77624e] focus:border-[#7c2d12] focus:ring-1 focus:ring-[#7c2d12]"
            />
          </span>
        </label>

        <label className="block text-[11px] uppercase tracking-[0.14em]" htmlFor="catalog-category">
          Catégorie
          <select
            id="catalog-category"
            value={filters.category}
            onChange={(event) => onChange('category', event.target.value)}
            className="mt-2 w-full cursor-pointer border border-[#b58a55] bg-[#fbf1df] p-3 text-sm normal-case tracking-normal outline-none focus:border-[#7c2d12] focus:ring-1 focus:ring-[#7c2d12]"
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        </label>

        <fieldset className="sm:col-span-2 lg:col-span-1">
          <legend className="text-[11px] uppercase tracking-[0.14em]">Fourchette de prix</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <label className="text-xs text-[#5f4a35]" htmlFor="catalog-min-price">
              Minimum
              <input
                id="catalog-min-price"
                type="number"
                min="0"
                inputMode="decimal"
                value={filters.min_price}
                onChange={(event) => onChange('min_price', event.target.value)}
                className="mt-1 w-full border border-[#b58a55] bg-[#fbf1df] p-3 text-[#24160e] outline-none focus:border-[#7c2d12] focus:ring-1 focus:ring-[#7c2d12]"
              />
            </label>
            <label className="text-xs text-[#5f4a35]" htmlFor="catalog-max-price">
              Maximum
              <input
                id="catalog-max-price"
                type="number"
                min="0"
                inputMode="decimal"
                value={filters.max_price}
                onChange={(event) => onChange('max_price', event.target.value)}
                className="mt-1 w-full border border-[#b58a55] bg-[#fbf1df] p-3 text-[#24160e] outline-none focus:border-[#7c2d12] focus:ring-1 focus:ring-[#7c2d12]"
              />
            </label>
          </div>
        </fieldset>
      </div>
    </aside>
  );
}

export default CatalogFilters;
