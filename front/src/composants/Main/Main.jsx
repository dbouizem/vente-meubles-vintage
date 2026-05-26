import { useState, useEffect } from "react";
import Vignette from "../Vignette/Vignette";
import "./main.css"
import { apiUrl, imageUrl } from "../../config/api";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, Grid2X2, Headphones, Lock, Package, RotateCcw, Rows3 } from "lucide-react";

const editorialCategories = [
  { title: 'Assises', count: 18 },
  { title: 'Tables', count: 12 },
  { title: 'Rangement', count: 9 },
  { title: 'Décoration', count: 22 },
];

const filterGroups = [
  { title: 'Catégorie', items: ['Tous les produits', 'Assises', 'Tables', 'Rangement', 'Décoration'] },
  { title: 'Type', items: ['Fauteuils', 'Tables basses', 'Buffets', 'Chaises', 'Luminaires', 'Objets'] },
  { title: 'Époque', items: ['Années 90', 'Années 80', 'Années 70', 'Années 60', 'Avant 60'] },
];

const atelierImage = "/assets/atelier-heritage/atelier-panel.png";
const parisBandImage = "/assets/atelier-heritage/paris-band.png";

function Main() {


  const [data, setData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl('/meubles'));
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des meubles');
      }

      const jsonData = await response.json();

      setData(jsonData);
      setErrorMessage('');
    } catch (error) {
      setData([]);
      setErrorMessage("Impossible de charger les produits pour le moment.");
    }
  };

  

  return (
  <section id="main" className="w-full bg-[#f8ecd4] px-4 py-8 text-[#24160e] sm:px-8">
      <div className="mx-auto max-w-7xl border-b border-[#d8c5a7] pb-4">
        <div className="flex items-center justify-between gap-4 text-[10px] uppercase tracking-[0.16em] text-[#5f4a35]">
          <p>Accueil <span className="mx-2">·</span> Boutique</p>
          <p>{data?.length || 0} pièces</p>
        </div>
      </div>

      {errorMessage && (
        <p role="status" className="mx-auto mt-6 max-w-7xl border border-[#9f312c]/35 bg-[#f0d2c8] px-4 py-3 text-left text-sm text-[#8f1d1d]">{errorMessage}</p>
      )}

      <div className="mx-auto grid max-w-7xl gap-6 border-b border-[#d8c5a7] py-5 lg:grid-cols-[240px_1fr]">
        <aside className="hidden border-r border-[#d8c5a7] pr-6 lg:block">
          <div className="flex items-center justify-between border-b border-[#d8c5a7] pb-5 text-[11px] uppercase tracking-[0.16em]">
            <span>Filtrer par</span>
            <button type="button" className="cursor-pointer text-[#8b5a24] transition hover:text-[#7c2d12]">Réinitialiser</button>
          </div>

          {filterGroups.map((group) => (
            <div key={group.title} className="border-b border-[#d8c5a7] py-5">
              <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.16em]">
                <span>{group.title}</span>
                <span>−</span>
              </div>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <label key={item} className="flex cursor-pointer items-center gap-3 text-sm text-[#5f4a35]">
                    <input type="checkbox" className="h-3.5 w-3.5 border-[#9a805d] accent-[#7c2d12]" />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="border-b border-[#d8c5a7] py-5">
            <div className="mb-4 flex items-center justify-between text-[11px] uppercase tracking-[0.16em]">
              <span>Couleur</span>
              <span>−</span>
            </div>
            <div className="flex gap-2">
              {['#17100b', '#f8ecd4', '#c6a16b', '#8b5a24', '#5f4a35', '#7c2d12'].map((color) => (
                <span key={color} className="h-5 w-5 border border-[#9a805d]" style={{ backgroundColor: color }} />
              ))}
            </div>
          </div>
        </aside>

        <div>
          <div className="mb-5 flex flex-col justify-between gap-4 border-b border-[#d8c5a7] pb-5 text-[11px] uppercase tracking-[0.16em] sm:flex-row sm:items-center">
            <button type="button" className="inline-flex cursor-pointer items-center gap-3 text-left transition hover:text-[#7c2d12]">
              Trier par : Nouveautés <ChevronDown size={14} />
            </button>
            <div className="flex items-center gap-3">
              <span>Voir :</span>
              <button type="button" className="cursor-pointer text-[#7c2d12]" aria-label="Vue grille"><Grid2X2 size={17} /></button>
              <button type="button" className="cursor-pointer transition hover:text-[#7c2d12]" aria-label="Vue liste"><Rows3 size={17} /></button>
            </div>
          </div>

          <div className="products-grid">
          {data === null ? (
            <p className="col-span-full border border-[#b58a55]/35 bg-[#fbf1df] px-4 py-3 text-[#5f4a35]">Chargement des produits...</p>
          ) : data.length > 0 ? (
            data.map((item, index) => (
              <Vignette key={`${item.id}-${index}`} nom={item.titre} prix={item.prix} photo={imageUrl(item.photo)} id={item.id} index={index} />
            ))
          ) : (
            <p className="col-span-full border border-[#b58a55]/35 bg-[#fbf1df] px-4 py-3 text-[#5f4a35]">Aucun meuble disponible pour le moment.</p>
          )}
          </div>

          <div className="mt-8 flex items-center justify-center gap-6 font-serif text-base">
            <button className="h-9 w-9 border border-[#9a805d] bg-[#fbf1df]">1</button>
            <button>2</button>
            <button>3</button>
            <span>…</span>
            <button>8</button>
            <button aria-label="Page suivante">→</button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {editorialCategories.map((item) => (
          <div key={item.title} className="border border-[#d8c5a7] bg-[#fbf1df] p-5">
            <p className="font-serif text-2xl uppercase text-[#24160e]">{item.title}</p>
            <p className="mt-2 text-sm text-[#5f4a35]">{item.count} pièces</p>
          </div>
        ))}
      </div>

      <section className="mx-auto mt-10 grid max-w-7xl overflow-hidden border border-[#b58a55]/35 bg-[#17100b] text-[#f8ecd4] lg:grid-cols-[0.45fr_1fr]">
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <p className="font-serif text-3xl uppercase">L’art du style</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#f1dfbf]/80">Chaque pièce raconte une histoire. La vôtre commence ici.</p>
          <a href="#main" className="mt-7 inline-flex w-fit items-center gap-3 bg-[#c6a16b] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#17100b] transition hover:bg-[#f8ecd4]">Découvrir l’atelier <ArrowRight size={14}/></a>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
          className="min-h-[270px] bg-cover bg-center"
          style={{ backgroundImage: `url(${atelierImage})` }}
        />
      </section>

      <div className="mx-auto mt-6 max-w-7xl overflow-hidden border border-[#d8c5a7] bg-[#17100b]">
        <img src={parisBandImage} alt="Ambiance Atelier Héritage" className="h-28 w-full object-cover object-center sm:h-36" />
      </div>

      <div className="mx-auto mt-6 grid max-w-7xl border border-[#d8c5a7] bg-[#fbf1df] sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Livraison offerte', 'dès 200€ d’achat', Package],
          ['Retours gratuits', 'sous 30 jours', RotateCcw],
          ['Paiement sécurisé', 'CB, Paypal, Apple Pay', Lock],
          ['Service client', '7j/7 par email', Headphones],
        ].map(([title, text, Icon]) => (
          <div key={title} className="flex items-center gap-4 border-[#b58a55]/30 p-5 lg:border-r last:border-r-0">
            <Icon className="text-[#7c2d12]" size={24}/>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#17100b]">{title}</p>
              <p className="mt-1 text-xs text-[#5f4a35]">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Main;
