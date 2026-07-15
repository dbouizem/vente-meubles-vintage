import { useContext, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { CartContext } from '../../features/cart/cart-context';
import CheckoutSteps from '../../features/checkout/CheckoutSteps';
import { loadCheckout, saveCheckout } from '../../features/checkout/checkout-storage';

function Livraison() {
  const { panier } = useContext(CartContext);
  const navigate = useNavigate();
  const [form, setForm] = useState(() => ({
    customerName: '',
    customerEmail: '',
    line1: '',
    line2: '',
    postalCode: '',
    city: '',
    country: 'France',
    deliveryMethod: 'home_delivery',
    ...loadCheckout().delivery,
  }));
  if (panier.length === 0) return <Navigate to="/panier" replace />;
  const change = (event) =>
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    saveCheckout({ delivery: form });
    navigate('/commande/paiement');
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-[#24160e] sm:px-8">
      <CheckoutSteps current="delivery" />
      <form onSubmit={submit} className="border border-[#dccbbd] bg-[#fbf1df] p-5 sm:p-8">
        <h1 className="font-serif text-4xl uppercase">Livraison</h1>
        <p className="mt-2 text-sm text-[#5f4a35]">
          Indiquez les coordonnées nécessaires à votre réservation.
        </p>
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          {[
            ['customerName', 'Nom complet', 'text', 'name'],
            ['customerEmail', 'E-mail', 'email', 'email'],
            ['line1', 'Adresse', 'text', 'street-address'],
            ['line2', 'Complément d’adresse', 'text', 'address-line2'],
            ['postalCode', 'Code postal', 'text', 'postal-code'],
            ['city', 'Ville', 'text', 'address-level2'],
          ].map(([name, label, type, autoComplete]) => (
            <label
              key={name}
              className={`block text-xs ${name === 'line1' || name === 'line2' ? 'sm:col-span-2' : ''}`}
              htmlFor={`delivery-${name}`}
            >
              {label}
              <input
                id={`delivery-${name}`}
                name={name}
                type={type}
                required={name !== 'line2'}
                autoComplete={autoComplete}
                value={form[name]}
                onChange={change}
                className="mt-2 w-full border border-[#b58a55] bg-white px-4 py-3 outline-none focus:border-[#7c2d12] focus:ring-1 focus:ring-[#7c2d12]"
              />
            </label>
          ))}
          <label className="block text-xs" htmlFor="delivery-country">
            Pays
            <input
              id="delivery-country"
              name="country"
              required
              autoComplete="country-name"
              value={form.country}
              onChange={change}
              className="mt-2 w-full border border-[#b58a55] bg-white px-4 py-3 outline-none focus:border-[#7c2d12]"
            />
          </label>
        </div>
        <fieldset className="mt-7">
          <legend className="text-xs uppercase tracking-[0.14em]">Mode de livraison</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {[
              [
                'home_delivery',
                'Livraison à domicile',
                'Notre équipe vous contactera pour convenir du créneau.',
              ],
              ['store_pickup', 'Retrait en boutique', 'Retrait gratuit à l’Atelier Héritage.'],
            ].map(([value, title, text]) => (
              <label
                key={value}
                className={`cursor-pointer border p-4 ${form.deliveryMethod === value ? 'border-[#7c2d12] bg-white' : 'border-[#dccbbd]'}`}
              >
                <input
                  type="radio"
                  name="deliveryMethod"
                  value={value}
                  checked={form.deliveryMethod === value}
                  onChange={change}
                  className="mr-3 accent-[#7c2d12]"
                />
                <strong className="text-sm">{title}</strong>
                <span className="mt-2 block pl-7 text-xs text-[#5f4a35]">{text}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
          <Link
            to="/panier"
            className="border border-[#b58a55] px-6 py-3 text-center text-xs uppercase tracking-[0.14em]"
          >
            Retour au panier
          </Link>
          <button
            type="submit"
            className="cursor-pointer bg-[#17100b] px-6 py-3 text-xs uppercase tracking-[0.14em] text-[#f8ecd4]"
          >
            Continuer vers le paiement
          </button>
        </div>
      </form>
    </main>
  );
}
export default Livraison;
