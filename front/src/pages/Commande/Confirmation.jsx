import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Mail, PackageCheck } from 'lucide-react';
import { getOrder } from '../../services/orders';

const formatPrice = (value) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(value));

function Confirmation() {
  const { token } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getOrder(token)
      .then(setOrder)
      .catch((requestError) => setError(requestError.message));
  }, [token]);

  return (
    <main className="mx-auto min-h-[70vh] max-w-4xl px-4 py-12 text-[#24160e] sm:px-8">
      {error ? (
        <div className="border border-red-800/30 bg-[#fbf1df] p-8 text-center" role="alert">
          <h1 className="font-serif text-3xl uppercase">Commande introuvable</h1>
          <p className="mt-3 text-sm text-red-800">{error}</p>
          <Link
            to="/accueil"
            className="mt-6 inline-block border border-[#7c2d12] px-5 py-3 text-xs uppercase tracking-[0.14em]"
          >
            Retour à la boutique
          </Link>
        </div>
      ) : !order ? (
        <p className="border border-[#dccbbd] bg-[#fbf1df] p-6" aria-live="polite">
          Chargement de la commande…
        </p>
      ) : (
        <article className="border border-[#dccbbd] bg-[#fbf1df] p-6 sm:p-10">
          <CheckCircle2 size={46} className="mx-auto text-green-800" aria-hidden="true" />
          <header className="mt-5 text-center">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#7c2d12]">
              Réservation enregistrée
            </p>
            <h1 className="mt-3 font-serif text-4xl uppercase sm:text-5xl">
              Merci {order.customerName}
            </h1>
            <p className="mt-4 text-sm text-[#5f4a35]">
              Commande <strong>{order.orderNumber}</strong>
            </p>
          </header>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="border border-[#dccbbd] bg-white p-5">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em]">
                <Mail size={16} /> Contact
              </p>
              <p className="mt-3 text-sm text-[#5f4a35]">{order.customerEmail}</p>
            </div>
            <div className="border border-[#dccbbd] bg-white p-5">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em]">
                <PackageCheck size={16} /> Statut
              </p>
              <p className="mt-3 text-sm capitalize text-[#5f4a35]">{order.status}</p>
            </div>
          </div>

          <div className="mt-6 border-y border-[#dccbbd] py-5">
            {order.items.map((item) => (
              <div
                key={`${item.productId}-${item.sku}`}
                className="flex justify-between gap-4 py-2 text-sm"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>{formatPrice(item.lineTotal)}</span>
              </div>
            ))}
          </div>
          <dl className="ml-auto mt-5 max-w-xs space-y-2 text-sm">
            <div className="flex justify-between">
              <dt>Sous-total</dt>
              <dd>{formatPrice(order.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Remise</dt>
              <dd>− {formatPrice(order.discount)}</dd>
            </div>
            <div className="flex justify-between border-t border-[#dccbbd] pt-3 font-serif text-xl">
              <dt>Total</dt>
              <dd>{formatPrice(order.total)}</dd>
            </div>
          </dl>
          <p className="mt-8 text-center text-sm leading-6 text-[#5f4a35]">
            Aucun paiement n’a été collecté. Notre équipe vous contactera pour organiser la suite de
            la réservation.
          </p>
          <div className="mt-7 text-center">
            <Link
              to="/accueil"
              className="inline-block bg-[#17100b] px-6 py-3 text-xs uppercase tracking-[0.14em] text-[#f8ecd4]"
            >
              Continuer mes achats
            </Link>
          </div>
        </article>
      )}
    </main>
  );
}

export default Confirmation;
