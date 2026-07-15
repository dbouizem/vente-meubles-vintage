import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Mail, Minus, Package, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { CartContext, DiscountContext } from '../../features/cart/cart-context';
import fallbackImage from '../../assets/img_vignette/img_non_dispo.jpg';

const formatPrice = (value) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);

function QuantityControl({ item, updateQuantity }) {
  return (
    <div className="inline-flex w-fit items-center border border-[#b58a55] bg-white">
      <button
        type="button"
        onClick={() => updateQuantity(item.id, item.quantity - 1)}
        disabled={item.quantity <= 1}
        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center transition-colors hover:bg-[#ead7b8] disabled:cursor-not-allowed disabled:opacity-35"
        aria-label={`Diminuer la quantité de ${item.nom}`}
      >
        <Minus size={15} />
      </button>
      <span className="min-w-10 text-center text-sm" aria-live="polite">
        {item.quantity}
      </span>
      <button
        type="button"
        onClick={() => updateQuantity(item.id, item.quantity + 1)}
        disabled={item.quantity >= item.stock}
        className="inline-flex h-10 w-10 cursor-pointer items-center justify-center transition-colors hover:bg-[#ead7b8] disabled:cursor-not-allowed disabled:opacity-35"
        aria-label={`Augmenter la quantité de ${item.nom}`}
      >
        <Plus size={15} />
      </button>
    </div>
  );
}

function Panier() {
  const { panier, updateQuantity, removeItem, clearCart, itemCount, subtotal } =
    useContext(CartContext);
  const promotion = useContext(DiscountContext);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const promoIsValid = appliedPromo === 'ADATECH';
  const discount = promoIsValid ? Math.min(promotion, subtotal) : 0;
  const total = Math.max(0, subtotal - discount);

  const applyPromo = () => setAppliedPromo(promoInput.trim().toUpperCase());

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-8">
      <header className="text-center">
        <h1 className="font-serif text-5xl uppercase tracking-[0.08em] text-[#17100b] sm:text-7xl">
          Votre panier
        </h1>
        <p className="mt-4 text-[11px] uppercase tracking-[0.18em] text-[#5f4a35]">
          {itemCount} article{itemCount > 1 ? 's' : ''} sélectionné{itemCount > 1 ? 's' : ''}
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
          <section aria-label="Articles du panier">
            <div className="border border-[#dccbbd] bg-[#fbf1df]">
              {panier.map((item) => (
                <article
                  key={item.id}
                  className="grid gap-5 border-b border-[#dccbbd] p-5 last:border-b-0 md:grid-cols-[1fr_auto] md:items-center md:p-7"
                >
                  <div className="flex min-w-0 gap-4 sm:gap-5">
                    <img
                      src={item.photo || fallbackImage}
                      className="h-24 w-24 shrink-0 border border-[#dccbbd] bg-white object-contain sm:h-28 sm:w-28"
                      alt={item.nom}
                    />
                    <div className="min-w-0 self-center">
                      <h2 className="font-serif text-base uppercase leading-5 text-[#24160e]">
                        {item.nom}
                      </h2>
                      <p className="mt-2 text-sm text-[#5f4a35]">
                        Prix unitaire : {formatPrice(Number(item.prix))}
                      </p>
                      <p className="mt-1 text-xs text-[#5f4a35]">Stock disponible : {item.stock}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-4 md:justify-end">
                    <QuantityControl item={item} updateQuantity={updateQuantity} />
                    <p className="min-w-24 text-right font-serif text-lg">
                      {formatPrice(Number(item.prix) * item.quantity)}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="inline-flex h-10 w-10 cursor-pointer items-center justify-center text-[#5f4a35] transition-colors hover:text-red-700 focus-visible:ring-2 focus-visible:ring-[#7c2d12]"
                      aria-label={`Supprimer ${item.nom} du panier`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </article>
              ))}
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between md:px-7">
                <Link
                  to="/accueil"
                  className="inline-flex justify-center border border-[#b58a55] px-6 py-3 text-[11px] uppercase tracking-[0.16em] transition-colors hover:border-[#7c2d12] hover:text-[#7c2d12]"
                >
                  Continuer mes achats
                </Link>
                <button
                  type="button"
                  onClick={clearCart}
                  className="cursor-pointer border border-[#dccbbd] px-6 py-3 text-[11px] uppercase tracking-[0.16em] text-[#5f4a35] transition-colors hover:border-red-700 hover:text-red-700"
                >
                  Vider le panier
                </button>
              </div>
            </div>

            <div className="mt-5 grid gap-3 border border-[#dccbbd] bg-[#fbf1df] p-5 sm:grid-cols-[150px_1fr_auto] sm:items-end">
              <label
                htmlFor="promo-code"
                className="text-[11px] uppercase tracking-[0.16em] sm:self-center"
              >
                Code promo
              </label>
              <input
                id="promo-code"
                value={promoInput}
                onChange={(event) => setPromoInput(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') applyPromo();
                }}
                placeholder="Entrez votre code"
                className="border border-[#b58a55] bg-white px-4 py-3 text-sm outline-none focus:border-[#7c2d12] focus:ring-1 focus:ring-[#7c2d12]"
              />
              <button
                type="button"
                onClick={applyPromo}
                className="cursor-pointer border border-[#9a805d] px-6 py-3 text-[11px] uppercase tracking-[0.16em] transition-colors hover:bg-[#17100b] hover:text-[#f8ecd4]"
              >
                Appliquer
              </button>
              {appliedPromo && (
                <p
                  role="status"
                  className={`text-sm sm:col-start-2 sm:col-span-2 ${promoIsValid ? 'text-green-800' : 'text-red-700'}`}
                >
                  {promoIsValid
                    ? 'Code ADATECH appliqué : remise de 10 €.'
                    : 'Ce code promotionnel est invalide.'}
                </p>
              )}
            </div>
          </section>

          <aside
            className="h-fit border border-[#dccbbd] bg-[#fbf1df] p-7 lg:sticky lg:top-6"
            aria-label="Résumé du panier"
          >
            <p className="text-[11px] uppercase tracking-[0.16em]">Résumé de commande</p>
            <dl className="mt-5 space-y-3 border-y border-[#dccbbd] py-5 text-sm text-[#5f4a35]">
              <div className="flex justify-between">
                <dt>Sous-total</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt>Livraison</dt>
                <dd>Gratuite</dd>
              </div>
              <div className="flex justify-between">
                <dt>Remise</dt>
                <dd>− {formatPrice(discount)}</dd>
              </div>
            </dl>
            <div className="flex justify-between border-b border-[#dccbbd] py-5 font-serif text-2xl">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="mt-6 space-y-4">
              {panier.map((item) => (
                <div key={`${item.id}-summary`} className="flex items-center gap-4">
                  <img
                    src={item.photo || fallbackImage}
                    alt=""
                    className="h-16 w-16 border border-[#dccbbd] bg-white object-contain"
                  />
                  <div className="min-w-0 flex-1 text-sm">
                    <p className="truncate font-serif uppercase">{item.nom}</p>
                    <p className="mt-1 text-xs text-[#5f4a35]">
                      {formatPrice(Number(item.prix) * item.quantity)}
                    </p>
                  </div>
                  <span className="text-xs">×{item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="mt-7 border-t border-[#dccbbd] pt-5 text-xs leading-6 text-[#5f4a35]">
              <p className="font-semibold text-[#24160e]">Besoin d’aide ?</p>
              <p className="inline-flex items-center gap-2">
                <Mail size={14} /> contact@atelierheritage.com
              </p>
            </div>
            <div className="mt-6 grid gap-3 border-t border-[#dccbbd] pt-5 text-xs uppercase tracking-[0.08em] text-[#5f4a35]">
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
            <button
              type="button"
              disabled
              title="Commandes disponibles à la phase suivante"
              className="mt-7 w-full cursor-not-allowed bg-[#17100b] px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-[#f8ecd4] opacity-55"
            >
              Commander — {formatPrice(total)}
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Panier;
