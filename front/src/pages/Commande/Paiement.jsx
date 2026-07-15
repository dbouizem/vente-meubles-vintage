import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { CartContext } from '../../features/cart/cart-context';
import CheckoutSteps from '../../features/checkout/CheckoutSteps';
import {
  clearCheckout,
  loadCheckout,
  saveCheckout,
} from '../../features/checkout/checkout-storage';
import { createOrder } from '../../services/orders';

const formatPrice = (value) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);

function Paiement() {
  const { panier, clearCart, subtotal } = useContext(CartContext);
  const navigate = useNavigate();
  const checkout = loadCheckout();
  const [paymentMethod, setPaymentMethod] = useState(checkout.paymentMethod || 'pay_on_delivery');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  if (panier.length === 0) return <Navigate to="/panier" replace />;
  if (!checkout.delivery) return <Navigate to="/commande/livraison" replace />;
  const discount = checkout.promoCode === 'ADATECH' ? Math.min(10, subtotal) : 0;

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);
    saveCheckout({ paymentMethod });
    try {
      const delivery = checkout.delivery;
      const result = await createOrder({
        customerName: delivery.customerName,
        customerEmail: delivery.customerEmail,
        address: {
          line1: delivery.line1,
          line2: delivery.line2,
          postalCode: delivery.postalCode,
          city: delivery.city,
          country: delivery.country,
        },
        deliveryMethod: delivery.deliveryMethod,
        paymentMethod,
        promoCode: checkout.promoCode || '',
        items: panier.map((item) => ({ productId: item.id, quantity: item.quantity })),
      });
      clearCart();
      clearCheckout();
      navigate(`/commande/${result.confirmationToken}`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-[#24160e] sm:px-8">
      <CheckoutSteps current="payment" />
      <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <section className="border border-[#dccbbd] bg-[#fbf1df] p-5 sm:p-8">
          <h1 className="font-serif text-4xl uppercase">Paiement</h1>
          <p className="mt-2 text-sm text-[#5f4a35]">
            Aucune donnée bancaire n’est collectée sur ce site.
          </p>
          <fieldset className="mt-7">
            <legend className="text-xs uppercase tracking-[0.14em]">Choisissez un mode</legend>
            <div className="mt-3 space-y-3">
              {[
                ['pay_on_delivery', 'Paiement à la livraison ou au retrait'],
                ['bank_transfer', 'Virement bancaire après confirmation'],
              ].map(([value, label]) => (
                <label
                  key={value}
                  className={`block cursor-pointer border p-4 text-sm ${paymentMethod === value ? 'border-[#7c2d12] bg-white' : 'border-[#dccbbd]'}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={value}
                    checked={paymentMethod === value}
                    onChange={(event) => setPaymentMethod(event.target.value)}
                    className="mr-3 accent-[#7c2d12]"
                  />
                  {label}
                </label>
              ))}
            </div>
          </fieldset>
          {error && (
            <p role="alert" className="mt-5 text-sm text-red-700">
              {error}
            </p>
          )}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
            <Link
              to="/commande/livraison"
              className="border border-[#b58a55] px-5 py-3 text-center text-xs uppercase tracking-[0.14em]"
            >
              Modifier la livraison
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer bg-[#17100b] px-5 py-3 text-xs uppercase tracking-[0.14em] text-[#f8ecd4] disabled:cursor-wait disabled:opacity-50"
            >
              {isSubmitting ? 'Validation…' : 'Confirmer la réservation'}
            </button>
          </div>
        </section>
        <aside className="h-fit border border-[#dccbbd] bg-[#fbf1df] p-5">
          <p className="text-xs uppercase tracking-[0.14em]">Récapitulatif</p>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between">
              <dt>{panier.reduce((sum, item) => sum + item.quantity, 0)} article(s)</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt>Remise</dt>
              <dd>− {formatPrice(discount)}</dd>
            </div>
            <div className="flex justify-between border-t border-[#dccbbd] pt-3 font-serif text-xl">
              <dt>Total</dt>
              <dd>{formatPrice(subtotal - discount)}</dd>
            </div>
          </dl>
        </aside>
      </form>
    </main>
  );
}
export default Paiement;
