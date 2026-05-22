import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Badge from '@mui/material/Badge';
import Icon_admin from '../Icon_admin/Icon_admin';
import { panierContext } from '../../contexts';
import { useContext } from 'react';

const CustomBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    color: "white",
    backgroundColor: "#421F00"
  },
}));


function Navbar() {
  const {panier} = useContext(panierContext)
  const isAdmin = Boolean(localStorage.getItem("adminToken"));


  const backgroundStyle = {
    backgroundImage: "url('/src/assets/logo-sun.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: "center",
  };

  return (
    <header className='bg-beige min-h-20 sm:h-28 px-4 sm:px-8 shadow-sm' style={backgroundStyle}>
      <nav className='mx-auto flex h-full min-h-20 max-w-6xl items-center justify-between gap-4' aria-label="Navigation principale">
        <Link to="/accueil" className='text-4xl sm:text-5xl text-dark-brown font-aurore decoration-transparent' aria-label="Retour à l'accueil Vintage">
          Vintage
        </Link>
        <div className='flex items-center justify-end gap-2 sm:gap-4'>
          <Icon_admin admin={isAdmin}/> 
          <span>
            <Link to="/panier" className='text-dark-brown' aria-label={`Voir le panier, ${panier.length} article${panier.length > 1 ? 's' : ''}`}>
              <CustomBadge badgeContent={(panier.length)}>
                <LocalMallIcon className="text-[40px] sm:text-[54px]" />
              </CustomBadge>
            </Link>
          </span>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
