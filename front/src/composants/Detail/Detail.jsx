 
import { useContext} from 'react';
import { panierContext } from '../../contexts';




const Detail = ({id, nom, prix, description, hauteur, largeur, longueur, disponibilite, photo }) => {

    const {setPanier} = useContext(panierContext)
    const addToPanier = () => {
        const cartItem = { id, nom, prix, photo }
        setPanier((currentPanier) => [...currentPanier, cartItem])
    }
    

    return (
        <div className="flex flex-col justify-center items-center w-full h-full space-y-4 sm:space-y-6 m-auto p-5 sm:p-10 text-center" key={id}>
            <h1>{nom}</h1>
            <p>{description}</p>
            <p>Dimension : {hauteur} x {largeur} x {longueur} </p>
            <p>Quantité: {disponibilite ? 1 : 0}</p> 
            <p>{prix} €</p>
            <button className=' border-gray-700 bg-slate-600 text-white w-60 rounded-md m-2 p-2' onClick = {addToPanier}> Ajouter au panier</button>
        </div>
    );
};

export default Detail; 
