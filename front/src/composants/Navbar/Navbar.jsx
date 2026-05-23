import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Badge from '@mui/material/Badge';
import Icon_admin from '../Icon_admin/Icon_admin';
import { panierContext } from '../../contexts';
import { useContext } from 'react';
import { Menu } from 'lucide-react';

const CustomBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    color: "white",
    backgroundColor: "#421F00"
  },
}));


function Navbar() {
  const {panier} = useContext(panierContext)
  const isAdmin = Boolean(localStorage.getItem("adminToken"));

  return (
    <header className='absolute left-0 right-0 top-0 z-40 px-4 py-5 text-[#d8bc86] sm:px-8'>
      <nav className='mx-auto grid max-w-7xl grid-cols-3 items-center gap-4 text-[11px] uppercase tracking-[0.18em]' aria-label="Navigation principale">
        <div className="hidden gap-8 md:flex">
          <span>Paris, France</span>
          <a href="#main">Boutique</a>
        </div>

        <Link to="/accueil" className='text-center font-serif text-2xl uppercase tracking-[0.08em] sm:text-3xl' aria-label="Retour à l'accueil Atelier Héritage Paris">
          <span className="block">Atelier Héritage</span>
          <span className="mt-1 block text-[10px] tracking-[0.45em]">Paris</span>
        </Link>

        <div className='flex items-center justify-end gap-4'>
          <a href="#main" className="hidden md:inline">Nouveautés</a>
          <Icon_admin admin={isAdmin}/> 
          <Link to="/panier" className='text-[#d8bc86]' aria-label={`Voir le panier, ${panier.length} article${panier.length > 1 ? 's' : ''}`}>
              <CustomBadge badgeContent={(panier.length)}>
                <LocalMallIcon className="text-[28px]" />
              </CustomBadge>
          </Link>
          <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#d8bc86]/50" aria-label="Menu">
            <Menu size={20} />
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
