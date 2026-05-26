function Footer() {
  return (
    <footer className='border-t border-[#d8c5a7] bg-[#f8ecd4] px-4 py-10 text-[#24160e]'>
      <div className='mx-auto grid max-w-7xl gap-8 border-b border-[#d8c5a7] pb-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_0.8fr_0.8fr_1fr]'>
        <div>
          <p className="font-serif text-2xl uppercase tracking-[0.08em]">Atelier Héritage</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.45em] text-[#8b5a24]">Paris</p>
          <p className="mt-5 max-w-xs text-sm leading-6 text-[#5f4a35]">L’élégance est notre langage, le temps notre allié.</p>
          <div className="mt-5 flex gap-5 text-[10px] uppercase tracking-[0.14em] text-[#5f4a35]">
            <a href="#main" className="transition hover:text-[#7c2d12]">Instagram</a>
            <a href="#main" className="transition hover:text-[#7c2d12]">Pinterest</a>
            <a href="#main" className="transition hover:text-[#7c2d12]">Facebook</a>
          </div>
        </div>

        {[
          ['Boutique', ['Nouveautés', 'Assises', 'Tables', 'Rangement']],
          ['Informations', ['Livraison & retours', 'Paiement', 'FAQ', 'Contact']],
          ['L’atelier', ['Notre histoire', 'Savoir-faire', 'Engagements']],
        ].map(([title, links]) => (
          <div key={title}>
            <p className="mb-4 text-[11px] uppercase tracking-[0.16em]">{title}</p>
            <ul className="space-y-2 text-sm text-[#5f4a35]">
              {links.map((link) => (
                <li key={link}><a href="#main" className="transition hover:text-[#7c2d12]">{link}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="mb-4 text-[11px] uppercase tracking-[0.16em]">Recevoir l’actualité</p>
          <label className="flex border-b border-[#9a805d]">
            <span className="sr-only">Votre email</span>
            <input className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-[#8b7353]" placeholder="Votre email" />
            <button type="button" className="cursor-pointer px-2 text-xl">→</button>
          </label>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-4 pt-5 text-[10px] uppercase tracking-[0.14em] text-[#8b7353]">
        <p>© 2026 Atelier Héritage. Tous droits réservés.</p>
        <div className="flex gap-6">
          <a href="#main">Mentions légales</a>
          <a href="#main">CGV</a>
          <a href="#main">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
