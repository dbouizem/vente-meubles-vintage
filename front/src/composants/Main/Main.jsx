import { useState, useEffect } from "react";
import Vignette from "../Vignette/Vignette";
import "./main.css"
import { apiUrl, imageUrl } from "../../config/api";
import { motion } from "motion/react";
import { ArrowRight, Headphones, Lock, Package, RotateCcw } from "lucide-react";
import atelierImage from "../../assets/bg_header.png";

const editorialCategories = [
  { title: 'Femme', tone: 'Portraits feutrés et lignes intemporelles.' },
  { title: 'Homme', tone: 'Pièces de caractère, patines profondes.' },
  { title: 'Accessoires', tone: 'Objets rares et détails précieux.' },
  { title: 'Maison', tone: 'Lumières, assises et matières nobles.' },
  { title: 'Journal', tone: 'Archives, histoires et inspirations.' },
];

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
  <section id="main" className="w-full bg-[#0b0907] px-4 py-16 text-[#d8bc86] sm:px-8">
      <div className="mx-auto mb-12 max-w-7xl text-center">
        <p className="text-xs uppercase tracking-[0.28em] text-[#b8945f]">Boutique privée</p>
        <h2 className="mt-3 font-serif text-4xl uppercase tracking-[0.08em] text-[#e6cfaa] sm:text-5xl">La collection</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#d8bc86]/70">Des pièces vintage sélectionnées comme des archives vivantes: matières profondes, silhouettes rares, présence immédiate.</p>
      </div>

      {errorMessage && (
        <p role="status" className="mx-auto mb-6 max-w-6xl rounded-md border border-red-300/30 bg-red-950/30 px-4 py-3 text-left text-sm text-red-100">{errorMessage}</p>
      )}

      <div className="products-grid mx-auto max-w-7xl">
      {data === null ? (
        <p className="col-span-full rounded-md border border-[#d8bc86]/20 bg-white/5 px-4 py-3 text-[#d8bc86]/70">Chargement des produits...</p>
      ) : data.length > 0 ? (
        data.map((item, index) => (
          <Vignette key={item.id} nom={item.titre} prix={item.prix} photo={imageUrl(item.photo)} id={item.id} index={index}
          />
         
        ))
      ) : (
        <p className="col-span-full rounded-md border border-[#d8bc86]/20 bg-white/5 px-4 py-3 text-[#d8bc86]/70">Aucun meuble disponible pour le moment.</p>
      )}
      </div>

      <div className="mx-auto mt-20 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {editorialCategories.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.55, delay: index * 0.06 }}
            className="group min-h-[300px] border border-[#d8bc86]/30 bg-[#15110d] p-6 transition hover:border-[#d8bc86]/70"
          >
            <div className="flex h-full flex-col justify-end">
              <h3 className="font-serif text-3xl uppercase text-[#e6cfaa]">{item.title}</h3>
              <p className="mt-4 text-xs leading-6 text-[#d8bc86]/65">{item.tone}</p>
              <p className="mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em]">Découvrir <ArrowRight size={14}/></p>
            </div>
          </motion.article>
        ))}
      </div>

      <section className="mx-auto mt-20 grid max-w-7xl gap-8 lg:grid-cols-[0.7fr_1.3fr_0.7fr]">
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-[0.28em] text-[#b8945f]">Savoir-faire</p>
          <h2 className="mt-4 font-serif text-4xl uppercase leading-tight text-[#e6cfaa]">L’art du détail, l’âme du style.</h2>
          <p className="mt-6 text-sm leading-7 text-[#d8bc86]/70">Chaque meuble porte la trace d’un lieu, d’une époque et d’un geste. Nous sélectionnons les pièces qui racontent déjà une histoire.</p>
          <a href="#main" className="mt-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em]">Découvrir le savoir-faire <ArrowRight size={14}/></a>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
          className="min-h-[360px] bg-cover bg-center shadow-2xl"
          style={{ backgroundImage: `url(${atelierImage})` }}
        />
        <div className="border border-[#d8bc86]/25 bg-white/[0.04] p-6">
          <p className="font-serif text-2xl uppercase text-[#e6cfaa]">L’atelier</p>
          <p className="mt-4 text-sm leading-7 text-[#d8bc86]/70">Un lieu chargé d’histoire, où tradition et modernité se rencontrent.</p>
          <a href="#main" className="mt-6 inline-flex items-center gap-3 text-xs uppercase tracking-[0.18em]">Visiter l’atelier <ArrowRight size={14}/></a>
        </div>
      </section>

      <div className="mx-auto mt-12 grid max-w-7xl border border-[#d8bc86]/20 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['Livraison offerte', 'dès 200€ d’achat', Package],
          ['Retours gratuits', 'sous 30 jours', RotateCcw],
          ['Paiement sécurisé', 'CB, Paypal, Apple Pay', Lock],
          ['Service client', '7j/7 par email', Headphones],
        ].map(([title, text, Icon]) => (
          <div key={title} className="flex items-center gap-4 border-[#d8bc86]/20 p-5 lg:border-r last:border-r-0">
            <Icon size={24}/>
            <div>
              <p className="text-xs uppercase tracking-[0.16em]">{title}</p>
              <p className="mt-1 text-xs text-[#d8bc86]/60">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Main;
