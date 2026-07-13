import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext, DiscountContext } from '../../features/cart/cart-context';
import fallbackImage from '../../assets/img_vignette/img_non_dispo.jpg';
import { Lock, Mail, Package, RotateCcw, Trash2 } from 'lucide-react';

function Panier() {
  const { panier, setPanier } = useContext(CartContext);

  const calculateSubtotal = (panier) => {
    const subtotal = panier.reduce((acc, item) => acc + (Number.parseFloat(item.prix) || 0), 0);
    return subtotal;
  };

  const subtotals = calculateSubtotal(panier);
  const promotionString = 'ADATECH';

  const promotion = useContext(DiscountContext);
  const [promoMessage, setPromoMessage] = useState('');
  const [promoUpdated, setPromoUpdated] = useState('');
  const discount = promoUpdated === promotionString ? promotion : 0;

  const total = subtotals - discount;

  const removeItemFromPanier = (itemIndex) => {
    setPanier((currentPanier) => currentPanier.filter((item, index) => index !== itemIndex));
  };

  const clearPanier = () => {
    setPanier([]);
  };

  const messageChange = (event) => {
    setPromoMessage(event.target.value);
  };

  const messagePress = (event) => {
    if (event.key === 'Enter') {
      setPromoUpdated(promoMessage.trim().toUpperCase());
    }
  };

  const applyPromo = () => {
    setPromoUpdated(promoMessage.trim().toUpperCase());
  };

  const codePromo = () => discount;

  return (
    <div>
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
        <header className="text-center">
          <p className="font-serif text-2xl text-[#8b5a24]">⌁</p>
          <h1 className="font-serif text-5xl uppercase tracking-[0.08em] text-[#17100b] sm:text-7xl">
            Votre panier
          </h1>
          <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#5f4a35]">
            L’élégance intemporelle, choisie avec soin.
          </p>
          <span className="mx-auto mt-5 block h-px w-20 bg-[#b58a55]" />
        </header>

        {panier.length === 0 ? (
          <div className="mx-auto mt-12 max-w-2xl border border-[#dccbbd] bg-white px-6 py-12 text-center">
            <p className="font-serif text-3xl uppercase text-[#4a2b18]">Votre panier est vide</p>
            <p className="mt-3 text-sm text-[#5f4a35]">
              Explorez la collection pour ajouter un meuble à votre réservation.
            </p>
            <Link
              to="/accueil"
              className="mt-6 inline-block bg-[#17100b] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#f8ecd4]"
            >
              Voir les produits
            </Link>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">
            <section>
              <div className="border border-[#dccbbd] bg-[#fbf1df]">
                <div className="hidden grid-cols-[1fr_120px_150px_110px] border-b border-[#dccbbd] px-8 py-5 text-[11px] uppercase tracking-[0.16em] text-[#5f4a35] md:grid">
                  <span>Article</span>
                  <span>Prix</span>
                  <span>Quantité fixe</span>
                  <span>Total</span>
                </div>

                {panier.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="grid gap-4 border-b border-[#dccbbd] px-5 py-5 last:border-b-0 md:grid-cols-[1fr_120px_150px_110px] md:items-center md:px-8"
                  >
                    <div className="flex gap-5">
                      <img
                        src={item.photo || fallbackImage}
                        className="h-28 w-28 border border-[#dccbbd] object-contain bg-white"
                        alt={item.nom}
                      />
                      <div className="flex flex-col justify-center">
                        <h3 className="font-serif text-base uppercase leading-5 text-[#24160e]">
                          {item.nom}
                        </h3>
                        <p className="mt-2 text-[11px] uppercase tracking-[0.1em] text-[#5f4a35]">
                          Pièce unique · vintage
                        </p>
                      </div>
                    </div>
                    <p className="font-serif text-lg">{item.prix}€</p>
                    <div
                      className="inline-flex w-fit items-center border border-[#dccbbd] px-4 py-2 text-sm"
                      title="Gestion des quantités bientôt disponible"
                    >
                      <span>1</span>
                      <span className="ml-2 text-xs text-[#5f4a35]">pièce unique</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <p className="font-serif text-lg">{item.prix}€</p>
                      <button
                        className="cursor-pointer text-[#5f4a35] transition hover:text-red-700"
                        onClick={() => removeItemFromPanier(index)}
                        aria-label="Supprimer"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                ))}

                <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-8">
                  <Link
                    to="/accueil"
                    className="inline-flex justify-center border border-[#b58a55] px-6 py-3 text-[11px] uppercase tracking-[0.16em] transition hover:border-[#7c2d12] hover:text-[#7c2d12]"
                  >
                    ← Continuer mes achats
                  </Link>
                  <button
                    className="cursor-pointer border border-[#dccbbd] px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-[#5f4a35] transition hover:border-[#7c2d12] hover:text-[#7c2d12]"
                    onClick={clearPanier}
                  >
                    Vider le panier
                  </button>
                </div>
              </div>

              <div className="mt-5 grid border border-[#dccbbd] bg-[#fbf1df] p-5 sm:grid-cols-[170px_1fr_auto] sm:items-center">
                <p className="text-[11px] uppercase tracking-[0.16em]">Code promo</p>
                <input
                  placeholder="Entrez votre code"
                  value={promoMessage}
                  onChange={messageChange}
                  onKeyDown={messagePress}
                  className="mt-3 border border-[#dccbbd] bg-transparent px-4 py-3 text-sm outline-none sm:mt-0"
                />
                <button
                  type="button"
                  className="mt-3 cursor-pointer border border-[#9a805d] px-6 py-3 text-[11px] uppercase tracking-[0.16em] sm:mt-0"
                  onClick={applyPromo}
                >
                  Appliquer
                </button>
              </div>

              <section className="mt-5 border border-[#dccbbd] bg-[#fbf1df] p-5">
                <p className="text-[11px] uppercase tracking-[0.16em] text-[#7c2d12]">
                  Réservation bientôt disponible
                </p>
                <p className="mt-3 text-sm leading-6 text-[#5f4a35]">
                  La saisie de l’adresse, le choix de livraison et la création de commande seront
                  activés après la mise en place du système de commandes. Aucun paiement n’est
                  demandé actuellement.
                </p>
              </section>
            </section>

            <aside className="h-fit border border-[#dccbbd] bg-[#fbf1df] p-7 lg:sticky lg:top-6">
              <div className="mx-auto mb-7 flex h-24 w-24 items-center justify-center border border-[#b58a55] font-serif text-3xl text-[#4a2b18]">
                AH
              </div>
              <div className="border-y border-[#dccbbd] py-5">
                <p className="text-[11px] uppercase tracking-[0.16em]">Résumé de commande</p>
                <dl className="mt-5 space-y-3 text-sm text-[#5f4a35]">
                  <div className="flex justify-between">
                    <dt>Sous-total</dt>
                    <dd>{subtotals}€</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Livraison</dt>
                    <dd>Gratuite</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Code promo</dt>
                    <dd>-{codePromo()}€</dd>
                  </div>
                </dl>
              </div>
              <div className="flex justify-between border-b border-[#dccbbd] py-5 font-serif text-2xl">
                <span>Total</span>
                <span>{total}€</span>
              </div>

              <div className="mt-6 space-y-4">
                {panier.map((item, index) => (
                  <div key={`${item.id}-summary-${index}`} className="flex gap-4">
                    <img
                      src={item.photo || fallbackImage}
                      alt=""
                      className="h-20 w-20 border border-[#dccbbd] object-contain bg-white"
                    />
                    <div className="flex-1 text-sm">
                      <p className="font-serif uppercase leading-5">{item.nom}</p>
                      <p className="mt-1 text-xs text-[#5f4a35]">{item.prix}€</p>
                    </div>
                    <span className="text-xs">x1</span>
                  </div>
                ))}
              </div>

              <div className="mt-7 border-t border-[#dccbbd] pt-5 text-xs leading-6 text-[#5f4a35]">
                <p className="font-semibold text-[#24160e]">Besoin d’aide ?</p>
                <p>Notre équipe est à votre écoute.</p>
                <p className="inline-flex items-center gap-2">
                  <Mail size={14} /> contact@atelierheritage.com
                </p>
              </div>

              <div className="mt-7 grid gap-4 border-t border-[#dccbbd] pt-5 text-xs uppercase tracking-[0.08em] text-[#5f4a35]">
                <p className="inline-flex items-center gap-3">
                  <Package size={18} /> Livraison offerte
                </p>
                <p className="inline-flex items-center gap-3">
                  <RotateCcw size={18} /> Retours sous 30 jours
                </p>
                <p className="inline-flex items-center gap-3">
                  <Lock size={18} /> Paiement au retrait
                </p>
              </div>
            </aside>
          </div>
        )}

        {panier.length > 0 && (
          <div className="mt-8 grid gap-5 lg:grid-cols-[1fr_380px]">
            <div className="border border-[#dccbbd] bg-[#fbf1df] p-5 text-xs text-[#5f4a35]">
              <p className="inline-flex items-center gap-3">
                <Lock size={18} /> Aucun paiement en ligne n’est collecté actuellement.
              </p>
            </div>
            <button
              type="button"
              disabled
              title="Réservation bientôt disponible"
              className="cursor-not-allowed bg-[#17100b] px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-[#f8ecd4] opacity-55"
            >
              Réservation bientôt disponible — {total}€
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Panier;
