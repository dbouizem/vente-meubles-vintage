import './Header.css'
import { motion } from 'motion/react'
import { ArrowRight, Play } from 'lucide-react'
import heroImage from '../../assets/bg_header.png'

function Header() {
  return (
    <section className='luxury-hero relative flex min-h-screen overflow-hidden px-5 pt-32 text-[#d8bc86] sm:px-10 lg:px-20'>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_55%_20%,rgba(180,135,74,0.20),transparent_34%),linear-gradient(90deg,rgba(8,7,5,0.97),rgba(8,7,5,0.76)_38%,rgba(8,7,5,0.25)_72%,rgba(8,7,5,0.88))]" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.88fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="max-w-3xl"
        >
          <p className="mb-6 text-xs uppercase tracking-[0.28em] text-[#b8945f]">Nouvelle collection automne hiver 1994</p>
          <h1 className="font-serif text-5xl uppercase leading-[0.96] tracking-[-0.03em] text-[#e6cfaa] sm:text-7xl lg:text-8xl">
            L’élégance n’est pas une mode.
          </h1>
          <p className="mt-8 max-w-md text-sm leading-7 text-[#d8bc86]/78">
            Redécouvrez l’essence du style intemporel. Des pièces rares, des matières nobles, un héritage qui traverse le temps.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#main" className="inline-flex items-center justify-center gap-4 bg-[#c6a16b] px-7 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#130f0a] transition hover:bg-[#e6cfaa]">
              Découvrir la collection <ArrowRight size={16} />
            </a>
            <button type="button" className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-[#d8bc86]/80">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8bc86]/60"><Play size={14} /></span>
              Regarder le film
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 42 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: 'easeOut' }}
          className="hidden lg:block"
        >
          <div className="relative ml-auto h-[460px] w-[340px] rounded-[22px] border border-[#d8bc86]/70 bg-black/25 p-5 shadow-2xl backdrop-blur-sm">
            <div
              className="h-64 rounded-[16px] bg-cover bg-center opacity-90"
              style={{ backgroundImage: `url(${heroImage})` }}
            />
            <p className="mt-7 font-serif text-3xl text-[#e6cfaa]">Fauteuil Héritage</p>
            <p className="mt-3 text-sm text-[#d8bc86]/70">Bois patiné, velours profond</p>
            <div className="mt-8 flex items-center justify-between">
              <span>450€</span>
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d8bc86]/60"><ArrowRight size={18} /></span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
  
}

export default Header
