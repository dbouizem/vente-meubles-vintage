 
import { useContext} from 'react';
import { panierContext } from '../../contexts';
import { Heart, Lock, Package, Ruler, RotateCcw, ShieldCheck } from 'lucide-react';




const Detail = ({id, nom, prix, description, hauteur, largeur, longueur, disponibilite, photo, categorie }) => {

    const {setPanier} = useContext(panierContext)
    const addToPanier = () => {
        const cartItem = { id, nom, prix, photo }
        setPanier((currentPanier) => [...currentPanier, cartItem])
    }

    const dimensions = [hauteur, largeur, longueur].filter(Boolean).join(' x ');
    

    return (
        <section className="w-full text-left" key={id}>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#8b5a24]">Collection Atelier Héritage</p>
            <h1 className="mt-4 font-serif text-4xl uppercase leading-tight tracking-normal text-[#4a2b18] sm:text-5xl">{nom}</h1>
            <p className="mt-6 font-serif text-2xl text-[#24160e]">{prix} €</p>
            <p className="mt-6 max-w-lg text-sm leading-7 text-[#5f4a35]">{description}</p>

            <div className="mt-7 border-y border-[#dccbbd] py-5 text-[11px] uppercase tracking-[0.12em] text-[#5f4a35]">
                <p><span className="text-[#24160e]">État :</span> excellent vintage</p>
                <p className="mt-3"><span className="text-[#24160e]">Origine :</span> Paris, France</p>
                <p className="mt-3"><span className="text-[#24160e]">Catégorie :</span> {categorie || 'Mobilier'}</p>
                <p className="mt-3"><span className="text-[#24160e]">Disponibilité :</span> {disponibilite ? 'Disponible' : 'Indisponible'}</p>
            </div>

            <div className="mt-7">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f4a35]">Dimensions</p>
                <div className="mt-3 inline-flex items-center gap-3 border border-[#dccbbd] bg-[#fbf1df] px-4 py-3 text-sm text-[#24160e]">
                    <Ruler size={16} />
                    <span>{dimensions || 'Non renseignées'}</span>
                </div>
            </div>

            <div className="mt-7">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#5f4a35]">Teintes</p>
                <div className="mt-4 flex gap-3">
                    {['#8b5a24', '#c6a16b', '#5f4a35', '#2a221c', '#17100b'].map((color) => (
                        <span key={color} className="h-6 w-6 border border-[#dccbbd]" style={{ backgroundColor: color }} />
                    ))}
                </div>
            </div>

            <div className="mt-8 grid gap-3">
                <button className='w-full cursor-pointer bg-[#17100b] px-5 py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#f8ecd4] transition hover:bg-[#4a2b18]' onClick={addToPanier}>
                    Ajouter au panier — {prix} €
                </button>
                <button type="button" className="inline-flex w-full cursor-pointer items-center justify-center gap-3 border border-[#b58a55]/50 px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-[#4a2b18] transition hover:border-[#7c2d12] hover:text-[#7c2d12]">
                    <Heart size={15} /> Ajouter aux favoris
                </button>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3 border-t border-[#dccbbd] pt-5 text-center text-[10px] uppercase tracking-[0.08em] text-[#5f4a35]">
                <div className="flex flex-col items-center gap-2"><Package size={18}/><span>Livraison offerte</span></div>
                <div className="flex flex-col items-center gap-2"><RotateCcw size={18}/><span>Retours gratuits</span></div>
                <div className="flex flex-col items-center gap-2"><Lock size={18}/><span>Paiement sécurisé</span></div>
            </div>

            <p className="mt-5 inline-flex items-center gap-2 text-xs text-[#5f4a35]"><ShieldCheck size={14}/> Réservation sans paiement en ligne. Retrait et paiement en boutique.</p>
        </section>
    );
};

export default Detail; 
