import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
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
    <div className='bg-beige min-h-24 sm:h-32 px-4 sm:px-8' style={backgroundStyle}>
      <ul className='flex h-full min-h-24 items-center justify-between gap-4'>
        <li className='text-3xl sm:text-4xl text-dark-brown font-aurore decoration-transparent'>
          <Link to="/accueil">Vintage</Link>
        </li>
        <li className='flex items-center justify-end gap-2 sm:gap-4'>
          <Icon_admin admin={isAdmin}/> 
          <span>
            <Link to="/panier" className='text-dark-brown'>
              <CustomBadge badgeContent={(panier.length)}>
                <LocalMallIcon className="text-[44px] sm:text-[70px]" />
              </CustomBadge>
            </Link>
          </span>
          <span className='text-dark-brown'><MenuIcon className="text-[44px] sm:text-[70px]" /></span>

          {/* A revoir, composant menu  <li><Menu/></li> */}
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
