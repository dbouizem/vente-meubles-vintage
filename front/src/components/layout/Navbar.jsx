import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Badge from '@mui/material/Badge';
import AdminShortcut from './AdminShortcut';
import { CartContext } from '../../features/cart/cart-context';
import { useContext } from 'react';
import { Menu, Search, UserRound } from 'lucide-react';

const CustomBadge = styled(Badge)(() => ({
  '& .MuiBadge-badge': {
    color: '#f8ecd4',
    backgroundColor: '#7c2d12',
  },
}));

function Navbar() {
  const { panier } = useContext(CartContext);
  const isAdmin = Boolean(localStorage.getItem('adminToken'));

  return (
    <header className="relative z-40 border-b border-[#d8c5a7] bg-[#f8ecd4] text-[#24160e]">
      <div className="bg-[#17100b] px-4 py-1.5 text-[10px] uppercase tracking-[0.22em] text-[#f1dfbf] sm:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <span>Livraison offerte dès 200€ d’achat</span>
          <span className="hidden sm:inline">Retours sous 30 jours</span>
        </div>
      </div>

      <nav
        className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 text-[11px] uppercase tracking-[0.18em] sm:px-8"
        aria-label="Navigation principale"
      >
        <div className="flex items-center gap-6">
          <button
            type="button"
            disabled
            title="Menu bientôt disponible"
            className="flex h-10 w-10 cursor-not-allowed items-center justify-center text-[#24160e] opacity-45"
            aria-label="Menu bientôt disponible"
          >
            <Menu size={24} strokeWidth={1.4} />
          </button>
          <Link className="hidden transition hover:text-[#7c2d12] sm:inline" to="/accueil#main">
            Boutique
          </Link>
        </div>

        <Link
          to="/accueil"
          className="text-center font-serif text-xl uppercase tracking-[0.08em] sm:text-3xl"
          aria-label="Retour à l'accueil Vintage"
        >
          <span className="block text-[#24160e]">Vintage</span>
        </Link>

        <div className="flex items-center justify-end gap-3 text-[#24160e]">
          <button
            type="button"
            disabled
            title="Recherche bientôt disponible"
            className="hidden h-9 w-9 cursor-not-allowed items-center justify-center opacity-45 sm:flex"
            aria-label="Recherche bientôt disponible"
          >
            <Search size={20} strokeWidth={1.4} />
          </button>
          <Link
            to="/"
            className="hidden h-9 w-9 items-center justify-center transition hover:text-[#7c2d12] sm:flex"
            aria-label="Compte"
          >
            <UserRound size={20} strokeWidth={1.4} />
          </Link>
          <AdminShortcut admin={isAdmin} />
          <Link
            to="/panier"
            className="text-[#24160e] transition hover:text-[#7c2d12]"
            aria-label={`Voir le panier, ${panier.length} article${panier.length > 1 ? 's' : ''}`}
          >
            <CustomBadge badgeContent={panier.length}>
              <LocalMallIcon className="text-[24px]" />
            </CustomBadge>
          </Link>
        </div>
      </nav>

      <div className="hidden border-t border-[#d8c5a7] px-4 py-3 text-center text-[11px] uppercase tracking-[0.18em] text-[#24160e] md:block">
        <div className="mx-auto flex max-w-4xl justify-center gap-12">
          {['Nouveautés', 'Assises', 'Tables', 'Rangement', 'Décoration', 'Journal'].map((item) => (
            <span
              key={item}
              className="cursor-not-allowed text-[#5f4a35]"
              title="Navigation par catégorie bientôt disponible"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
