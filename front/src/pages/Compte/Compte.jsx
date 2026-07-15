import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, LogOut, Package, UserRound } from 'lucide-react';
import { imageUrl } from '../../services/api';
import {
  getAccountOrders,
  getFavorites,
  getProfile,
  removeFavorite,
  updateProfile,
} from '../../services/account';

const formatPrice = (value) =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(Number(value));

function Compte() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: '', firstname: '', email: '', phone: '' });
  const [orders, setOrders] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState('');
  useEffect(() => {
    Promise.all([getProfile(), getAccountOrders(), getFavorites()])
      .then(([user, userOrders, userFavorites]) => {
        setProfile(user);
        setOrders(userOrders);
        setFavorites(userFavorites);
      })
      .catch((error) => setMessage(error.message));
  }, []);
  const submit = async (event) => {
    event.preventDefault();
    try {
      const result = await updateProfile(profile);
      setMessage(result.message);
    } catch (error) {
      setMessage(error.message);
    }
  };
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 text-[#24160e] sm:px-8">
      <header className="flex flex-col gap-4 border-b border-[#dccbbd] pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#7c2d12]">Espace personnel</p>
          <h1 className="mt-2 font-serif text-5xl uppercase">Mon compte</h1>
        </div>
        <button
          type="button"
          onClick={logout}
          className="inline-flex cursor-pointer items-center gap-2 self-start border border-[#b58a55] px-4 py-2 text-xs uppercase"
        >
          <LogOut size={16} /> Déconnexion
        </button>
      </header>
      {message && (
        <p role="status" className="mt-5 border border-[#dccbbd] bg-[#fbf1df] p-3 text-sm">
          {message}
        </p>
      )}
      <div className="mt-8 grid gap-7 lg:grid-cols-2">
        <section className="border border-[#dccbbd] bg-[#fbf1df] p-6">
          <h2 className="inline-flex items-center gap-2 font-serif text-2xl uppercase">
            <UserRound size={20} /> Profil
          </h2>
          <form onSubmit={submit} className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ['firstname', 'Prénom'],
              ['name', 'Nom'],
              ['phone', 'Téléphone'],
            ].map(([name, label]) => (
              <label key={name} className="text-xs">
                {label}
                <input
                  name={name}
                  required={name !== 'phone'}
                  value={profile[name] || ''}
                  onChange={(event) =>
                    setProfile((current) => ({ ...current, [name]: event.target.value }))
                  }
                  className="mt-2 w-full border border-[#b58a55] bg-white px-3 py-2 outline-none focus:border-[#7c2d12]"
                />
              </label>
            ))}
            <label className="text-xs">
              E-mail
              <input
                disabled
                value={profile.email || ''}
                className="mt-2 w-full border border-[#dccbbd] bg-gray-100 px-3 py-2"
              />
            </label>
            <button className="cursor-pointer bg-[#17100b] px-5 py-3 text-xs uppercase text-[#f8ecd4] sm:col-span-2">
              Enregistrer le profil
            </button>
          </form>
        </section>
        <section className="border border-[#dccbbd] bg-[#fbf1df] p-6">
          <h2 className="inline-flex items-center gap-2 font-serif text-2xl uppercase">
            <Package size={20} /> Mes commandes
          </h2>
          <div className="mt-5 space-y-3">
            {orders.length ? (
              orders.map((order) => (
                <Link
                  key={order.orderNumber}
                  to={`/commande/${order.confirmationToken}`}
                  className="flex justify-between border border-[#dccbbd] bg-white p-4 text-sm"
                >
                  <span>
                    <strong>{order.orderNumber}</strong>
                    <small className="mt-1 block text-[#5f4a35]">
                      {new Date(order.createdAt).toLocaleDateString('fr-FR')} · {order.status}
                    </small>
                  </span>
                  <span>{formatPrice(order.total)}</span>
                </Link>
              ))
            ) : (
              <p className="text-sm text-[#5f4a35]">Aucune commande pour le moment.</p>
            )}
          </div>
        </section>
      </div>
      <section className="mt-7 border border-[#dccbbd] bg-[#fbf1df] p-6">
        <h2 className="inline-flex items-center gap-2 font-serif text-2xl uppercase">
          <Heart size={20} /> Mes favoris
        </h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favorites.length ? (
            favorites.map((item) => (
              <article key={item.id} className="border border-[#dccbbd] bg-white p-4">
                <img
                  src={imageUrl(item.photo)}
                  alt={item.titre}
                  loading="lazy"
                  decoding="async"
                  className="h-40 w-full object-contain"
                />
                <h3 className="mt-3 font-serif uppercase">{item.titre}</h3>
                <div className="mt-3 flex justify-between">
                  <Link to={`/produit/${item.id}`} className="text-xs underline">
                    Voir
                  </Link>
                  <button
                    type="button"
                    onClick={async () => {
                      await removeFavorite(item.id);
                      setFavorites((current) =>
                        current.filter((favorite) => favorite.id !== item.id),
                      );
                    }}
                    className="cursor-pointer text-xs text-red-700"
                  >
                    Retirer
                  </button>
                </div>
              </article>
            ))
          ) : (
            <p className="text-sm text-[#5f4a35]">Aucun favori enregistré.</p>
          )}
        </div>
      </section>
    </main>
  );
}
export default Compte;
