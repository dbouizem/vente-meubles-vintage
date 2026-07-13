import './Header.css';
import { motion } from 'motion/react';
import heroImage from '../../assets/bg_header.png';

function Header() {
  return (
    <section className="luxury-hero relative min-h-[330px] overflow-hidden text-[#f1dfbf] sm:min-h-[420px]">
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,10,6,0.88),rgba(15,10,6,0.56)_46%,rgba(15,10,6,0.76))]" />

      <div className="relative z-10 mx-auto flex min-h-[330px] max-w-7xl items-center px-6 sm:min-h-[420px] sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <h1 className="font-serif text-5xl uppercase leading-none tracking-normal text-[#f8ecd4] sm:text-7xl">
            Boutique
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-7 text-[#f1dfbf]/82 sm:text-base">
            L’élégance d’hier, le mobilier d’aujourd’hui.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Header;
