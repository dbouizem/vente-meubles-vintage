function Footer() {
  return (
    <footer className='bg-beige px-4 py-8 text-dark-brown'>
      <div className='mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm sm:flex-row'>
        <p className="font-semibold">Vintage</p>
        <nav aria-label="Navigation secondaire">
          <ul className='flex flex-wrap justify-center gap-4'>
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
