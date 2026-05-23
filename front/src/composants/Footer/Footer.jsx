function Footer() {
  return (
    <footer className='border-t border-[#d8bc86]/20 bg-[#0b0907] px-4 py-10 text-[#d8bc86]'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 text-sm sm:flex-row'>
        <div className="text-center sm:text-left">
          <p className="font-serif text-2xl uppercase tracking-[0.08em] text-[#e6cfaa]">Atelier Héritage</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.45em] text-[#b8945f]">Paris</p>
        </div>
        <nav aria-label="Navigation secondaire">
          <ul className='flex flex-wrap justify-center gap-5 text-[11px] uppercase tracking-[0.18em] text-[#d8bc86]/70'>
            <li><a href="/accueil">Accueil</a></li>
            <li><a href="#main">Produits</a></li>
            <li><a href="mailto:contact@vintage.local">Contact</a></li>
            <li>Mentions légales</li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
