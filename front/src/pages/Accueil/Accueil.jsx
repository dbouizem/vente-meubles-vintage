import CatalogHero from '../../features/catalog/components/CatalogHero';
import Catalog from '../../features/catalog/Catalog';

function Accueil() {
  return (
    <div className="bg-[#f1dfbf] text-[#24160e]">
      <CatalogHero />
      <Catalog />
    </div>
  );
}
export default Accueil;
