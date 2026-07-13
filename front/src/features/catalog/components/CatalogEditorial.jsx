import { motion } from 'motion/react';
import { ArrowRight, Headphones, Lock, Package, RotateCcw } from 'lucide-react';

const CATEGORIES = [
  { title: 'Assises', count: 18 },
  { title: 'Tables', count: 12 },
  { title: 'Rangement', count: 9 },
  { title: 'Décoration', count: 22 },
];

const BENEFITS = [
  ['Livraison offerte', 'dès 200€ d’achat', Package],
  ['Retours gratuits', 'sous 30 jours', RotateCcw],
  ['Réservation simple', 'paiement au retrait', Lock],
  ['Service client', '7j/7 par email', Headphones],
];

function CatalogEditorial() {
  return (
    <>
      <div className="mx-auto mt-8 grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CATEGORIES.map((item) => (
          <div key={item.title} className="border border-[#d8c5a7] bg-[#fbf1df] p-5">
            <p className="font-serif text-2xl uppercase text-[#24160e]">{item.title}</p>
            <p className="mt-2 text-sm text-[#5f4a35]">{item.count} pièces</p>
          </div>
        ))}
      </div>

      <section className="mx-auto mt-10 grid max-w-7xl overflow-hidden border border-[#b58a55]/35 bg-[#17100b] text-[#f8ecd4] lg:grid-cols-[0.45fr_1fr]">
        <div className="flex flex-col justify-center p-8 sm:p-10">
          <p className="font-serif text-3xl uppercase">L’art du style</p>
          <p className="mt-4 max-w-sm text-sm leading-7 text-[#f1dfbf]/80">
            Chaque pièce raconte une histoire. La vôtre commence ici.
          </p>
          <span
            className="mt-7 inline-flex w-fit cursor-not-allowed items-center gap-3 bg-[#c6a16b] px-6 py-3 text-xs uppercase tracking-[0.16em] text-[#17100b]"
            title="Présentation de l’atelier bientôt disponible"
          >
            L’atelier — bientôt <ArrowRight size={14} />
          </span>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.8 }}
          className="min-h-[270px] bg-cover bg-center"
          style={{ backgroundImage: 'url(/assets/atelier-heritage/atelier-panel.png)' }}
        />
      </section>

      <div className="mx-auto mt-6 max-w-7xl overflow-hidden border border-[#d8c5a7] bg-[#17100b]">
        <img
          src="/assets/atelier-heritage/paris-band.png"
          alt="Ambiance Atelier Héritage"
          className="h-28 w-full object-cover object-center sm:h-36"
        />
      </div>

      <div className="mx-auto mt-6 grid max-w-7xl border border-[#d8c5a7] bg-[#fbf1df] sm:grid-cols-2 lg:grid-cols-4">
        {BENEFITS.map(([title, text, Icon]) => (
          <div
            key={title}
            className="flex items-center gap-4 border-[#b58a55]/30 p-5 lg:border-r last:border-r-0"
          >
            <Icon className="text-[#7c2d12]" size={24} />
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#17100b]">{title}</p>
              <p className="mt-1 text-xs text-[#5f4a35]">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CatalogEditorial;
