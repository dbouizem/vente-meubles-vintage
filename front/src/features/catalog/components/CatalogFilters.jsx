const FILTER_GROUPS = [
  {
    title: 'Catégorie',
    items: ['Tous les produits', 'Assises', 'Tables', 'Rangement', 'Décoration'],
  },
  {
    title: 'Type',
    items: ['Fauteuils', 'Tables basses', 'Buffets', 'Chaises', 'Luminaires', 'Objets'],
  },
  { title: 'Époque', items: ['Années 90', 'Années 80', 'Années 70', 'Années 60', 'Avant 60'] },
];

const COLORS = ['#17100b', '#f8ecd4', '#c6a16b', '#8b5a24', '#5f4a35', '#7c2d12'];

function CatalogFilters() {
  return (
    <aside className="hidden border-r border-[#d8c5a7] pr-6 lg:block">
      <div className="flex items-center justify-between border-b border-[#d8c5a7] pb-5 text-[11px] uppercase tracking-[0.16em]">
        <span>Filtrer par</span>
        <button
          type="button"
          className="cursor-pointer text-[#8b5a24] transition hover:text-[#7c2d12]"
        >
          Réinitialiser
        </button>
      </div>

      {FILTER_GROUPS.map((group) => (
        <div key={group.title} className="border-b border-[#d8c5a7] py-5">
          <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.16em]">
            <span>{group.title}</span>
            <span>−</span>
          </div>
          <div className="space-y-3">
            {group.items.map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-3 text-sm text-[#5f4a35]"
              >
                <input type="checkbox" className="h-3.5 w-3.5 border-[#9a805d] accent-[#7c2d12]" />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>
      ))}

      <div className="border-b border-[#d8c5a7] py-5">
        <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.16em]">
          <span>Couleur</span>
          <span>−</span>
        </div>
        <div className="flex gap-2">
          {COLORS.map((color) => (
            <span
              key={color}
              className="h-5 w-5 border border-[#9a805d]"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

export default CatalogFilters;
