import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Heart, Plus } from "lucide-react";
import "./Vignette.css";

function Vignette({ id, nom, prix, photo, index = 0 }) {
  const navigate = useNavigate();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.48, delay: index * 0.035, ease: "easeOut" }}
      className="product-card group flex h-full w-full flex-col overflow-hidden border border-[#d8c5a7] bg-[#fbf1df] transition duration-300 hover:border-[#7c2d12]"
    >
      <button
        type="button"
        onClick={() => navigate(`/produit/${id}`)}
        className="relative block cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c2d12]"
        aria-label={`Voir le détail de ${nom}`}
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-[#ead7b8] p-3">
          <img
            src={photo}
            alt={nom}
            className="h-full w-full object-contain transition duration-700 group-hover:scale-105"
          />
        </div>
        <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center border border-[#f8ecd4]/70 bg-[#17100b]/24 text-[#f8ecd4] backdrop-blur-sm transition group-hover:bg-[#17100b]/60">
          <Heart size={17} strokeWidth={1.4} />
        </span>
      </button>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="min-h-[42px] font-serif text-sm uppercase leading-5 tracking-[0.06em] text-[#24160e]">{nom}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.08em] text-[#5f4a35]">Vintage restauré</p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <span className="font-serif text-lg text-[#24160e]">{prix} €</span>
            <p className="mt-2 text-xs text-[#5f4a35]">90s · pièce unique</p>
          </div>
          <button
            type="button"
            onClick={() => navigate(`/produit/${id}`)}
            className="flex h-9 w-9 cursor-pointer items-center justify-center border border-[#7c2d12]/50 text-[#7c2d12] transition duration-200 hover:bg-[#7c2d12] hover:text-[#f8ecd4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c2d12]"
            aria-label={`Ouvrir ${nom}`}
          >
            <Plus size={17} strokeWidth={1.4} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default Vignette;
