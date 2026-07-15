import { useContext } from 'react';
import { CartContext } from '../../cart/cart-context';
import { Heart, Lock, Package, Ruler, RotateCcw, ShieldCheck } from 'lucide-react';

const ProductDetails = ({
  id,
  nom,
  prix,
  description,
  hauteur,
  largeur,
  longueur,
  disponibilite,
  photo,
  categorie,
  style,
  epoque,
  matiere,
  couleur,
  etat,
  poids,
  stock,
  sku,
}) => {
  const { panier, addItem } = useContext(CartContext);
  const isAvailable = disponibilite !== false && disponibilite !== 0;
  const cartQuantity = panier.find((item) => item.id === Number(id))?.quantity || 0;
  const parsedStock = Number.parseInt(stock, 10);
  const availableStock = Number.isInteger(parsedStock) ? Math.max(0, parsedStock) : 1;
  const hasReachedStock = cartQuantity >= availableStock;
  const addToPanier = () => {
    addItem({ id, nom, prix, photo, stock: availableStock });
  };

  const dimensions = [hauteur, largeur, longueur].filter(Boolean).join(' x ');

  return (
    <section className="w-full text-left" key={id}>
      <p className="text-[11px] uppercase tracking-[0.18em] text-[#8b5a24]">
        Collection Atelier Héritage
      </p>
      <h1 className="mt-4 font-serif text-4xl uppercase leading-tight tracking-normal text-[#4a2b18] sm:text-5xl">
        {nom}
      </h1>
      <p className="mt-6 font-serif text-2xl text-[#24160e]">{prix} €</p>
      <p className="mt-6 max-w-lg text-sm leading-7 text-[#5f4a35]">{description}</p>

      <div className="mt-7 border-y border-[#dccbbd] py-5 text-[11px] uppercase tracking-[0.12em] text-[#5f4a35]">
        <p>
          <span className="text-[#24160e]">État :</span> {etat || 'Non renseigné'}
        </p>
        <p className="mt-3">
          <span className="text-[#24160e]">Catégorie :</span> {categorie || 'Mobilier'}
        </p>
        <p className="mt-3">
          <span className="text-[#24160e]">Disponibilité :</span>{' '}
          {isAvailable ? 'Disponible' : 'Indisponible'}
        </p>
        <p className="mt-3">
          <span className="text-[#24160e]">Stock :</span> {stock ?? 0}
        </p>
        {sku && (
          <p className="mt-3">
            <span className="text-[#24160e]">Référence :</span> {sku}
          </p>
        )}
        {style && (
          <p className="mt-3">
            <span className="text-[#24160e]">Style :</span> {style}
          </p>
        )}
        {epoque && (
          <p className="mt-3">
            <span className="text-[#24160e]">Époque :</span> {epoque}
          </p>
        )}
        {matiere && (
          <p className="mt-3">
            <span className="text-[#24160e]">Matière :</span> {matiere}
          </p>
        )}
        {couleur && (
          <p className="mt-3">
            <span className="text-[#24160e]">Couleur :</span> {couleur}
          </p>
        )}
      </div>

      <div className="mt-7">
        <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f4a35]">Dimensions</p>
        <div className="mt-3 inline-flex items-center gap-3 border border-[#dccbbd] bg-[#fbf1df] px-4 py-3 text-sm text-[#24160e]">
          <Ruler size={16} />
          <span>{dimensions || 'Non renseignées'}</span>
          {poids && <span>· {poids} kg</span>}
        </div>
      </div>

      <div className="mt-8 grid gap-3">
        <button
          disabled={!isAvailable || hasReachedStock}
          className="w-full cursor-pointer bg-[#17100b] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f8ecd4] transition hover:bg-[#4a2b18] disabled:cursor-not-allowed disabled:opacity-45"
          onClick={addToPanier}
        >
          {!isAvailable
            ? 'Produit indisponible'
            : hasReachedStock
              ? 'Stock maximum déjà dans le panier'
              : `Ajouter au panier — ${prix} €`}
        </button>
        <button
          type="button"
          disabled
          title="Favoris bientôt disponibles"
          className="inline-flex w-full cursor-not-allowed items-center justify-center gap-3 border border-[#b58a55]/50 px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-[#4a2b18] opacity-55"
        >
          <Heart size={15} /> Favoris — bientôt disponible
        </button>
      </div>

      <div className="mt-7 grid grid-cols-3 gap-3 border-t border-[#dccbbd] pt-5 text-center text-[10px] uppercase tracking-[0.08em] text-[#5f4a35]">
        <div className="flex flex-col items-center gap-2">
          <Package size={18} />
          <span>Livraison offerte</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <RotateCcw size={18} />
          <span>Retours gratuits</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <Lock size={18} />
          <span>Paiement au retrait</span>
        </div>
      </div>

      <p className="mt-5 inline-flex items-center gap-2 text-xs text-[#5f4a35]">
        <ShieldCheck size={14} /> Réservation sans paiement en ligne. Retrait et paiement en
        boutique.
      </p>
    </section>
  );
};

export default ProductDetails;
