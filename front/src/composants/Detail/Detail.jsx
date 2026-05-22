 
import { useContext} from 'react';
import { panierContext } from '../../contexts';




const Detail = ({id, nom, prix, description, hauteur, largeur, longueur, disponibilite, photo }) => {

    const {setPanier} = useContext(panierContext)
    const addToPanier = () => {
        const cartItem = { id, nom, prix, photo }
        setPanier((currentPanier) => [...currentPanier, cartItem])
    }

    const dimensions = [hauteur, largeur, longueur].filter(Boolean).join(' x ');
    

    return (
        <section className="flex flex-col justify-center items-start w-full h-full space-y-4 sm:space-y-6 m-auto p-5 sm:p-10 text-left" key={id}>
            <p className="text-sm font-semibold uppercase tracking-wide text-dark-brown/70">Pièce unique</p>
            <h1 className="text-3xl font-semibold text-dark-brown">{nom}</h1>
            <p className="text-gray-700 leading-relaxed">{description}</p>
            <div className="grid w-full gap-3 sm:grid-cols-2">
                <p className="rounded-md bg-beige px-4 py-3 text-sm">Dimensions<br/><span className="font-semibold">{dimensions || 'Non renseignées'}</span></p>
                <p className="rounded-md bg-beige px-4 py-3 text-sm">Disponibilité<br/><span className="font-semibold">{disponibilite ? 'Disponible' : 'Indisponible'}</span></p>
            </div>
            <p className="text-3xl font-semibold text-dark-brown">{prix} €</p>
            <button className='w-full sm:w-60 rounded-md bg-dark-brown m-0 p-3 font-semibold text-white transition hover:bg-[#2d1500]' onClick = {addToPanier}> Ajouter au panier</button>
            <p className="text-xs text-gray-500">Réservation sans paiement en ligne. Retrait et paiement en boutique.</p>
        </section>
    );
};

export default Detail; 
