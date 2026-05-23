import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import "./Vignette.css";

function Vignette({ id, nom, prix, photo, index = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: "easeOut" }}
      className="group flex h-full w-full max-w-sm flex-col overflow-hidden border border-[#d8bc86]/25 bg-[#14100c] transition duration-300 hover:-translate-y-1 hover:border-[#d8bc86]/70"
    >
      <button
        type="button"
        onClick={() => navigate(`/produit/${id}`)}
        className="block cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8bc86]"
        aria-label={`Voir le détail de ${nom}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#1d1711]">
          <img
            src={photo}
            alt={nom}
            className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0907]/80 via-transparent to-transparent" />
          <p className="absolute left-5 top-5 text-[10px] uppercase tracking-[0.22em] text-[#e6cfaa]/75">Pièce sélectionnée</p>
        </div>
      </button>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-2xl text-[#e6cfaa]">{nom}</h3>
        <p className="mt-3 text-xs leading-6 text-[#d8bc86]/60">Meuble vintage restauré, choisi pour sa présence et sa patine.</p>
        <div className="mt-6 flex items-center justify-between border-t border-[#d8bc86]/15 pt-5">
          <span className="text-sm text-[#d8bc86]">{prix} €</span>
          <button
            type="button"
            onClick={() => navigate(`/produit/${id}`)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-[#d8bc86]/50 text-[#d8bc86] transition duration-200 hover:bg-[#d8bc86] hover:text-[#130f0a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d8bc86]"
            aria-label={`Ouvrir ${nom}`}
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default Vignette;
