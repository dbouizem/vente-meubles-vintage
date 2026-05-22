import { useParams } from 'react-router-dom';
import {  useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import updateMeubleInfo from '../../function/updateDBMeuble';
import { apiUrl } from '../../config/api';


function ModifTable(){
    const { id: idTab } = useParams()
    let navigate = useNavigate()
    const [produitDetail, setproduitDetail] = useState({});
    const [formData, setFormData] = useState({
        titre: '',
        prix: '',
        description: '',
        photo: '',
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        setIsSubmitting(true);

        try {
            await updateMeubleInfo(produitDetail.id, formData);
            navigate(`/admin`);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(apiUrl(`/meubles/${idTab}`));
                if (!response.ok) {
                    throw new Error('Produit introuvable');
                }
                const jsonData = await response.json();
                const product = jsonData[0];

                if (!product) {
                    setproduitDetail({});
                    return;
                }

                setproduitDetail(product);
                setFormData({
                    titre: product.titre ?? '',
                    prix: product.prix ?? '',
                    description: product.description ?? '',
                    photo: product.photo ?? '',
                });
            } catch (error) {
                setproduitDetail({});
                setMessage("Impossible de charger ce produit.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [idTab]);


    return(
        
    <form onSubmit={handleSubmit} className='mx-auto flex w-full max-w-2xl flex-col min-h-[75vh] mt-3 px-4 py-8'>
        <div className="rounded-lg bg-white p-5 text-left shadow-sm sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-dark-brown/70">Administration</p>
            <h1 className="text-2xl font-semibold text-dark-brown">Modifier le produit</h1>
            <p className="mt-2 text-sm text-gray-600">Mettez à jour les informations affichées dans la boutique.</p>

            {message && (
                <p role="alert" className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{message}</p>
            )}

            {isLoading ? (
                <p className="mt-6 text-sm text-gray-600">Chargement du produit...</p>
            ) : (
            <div className="mt-6 space-y-5">
                <div>
                    <label className="block text-sm font-semibold" htmlFor="edit-title">Titre</label>
                    <input id="edit-title" className="mt-2 w-full border-b border-black bg-transparent py-2 outline-none" type="text" name="titre" value={formData.titre} onChange={handleChange} required />
                </div>
                <div>
                    <label className="block text-sm font-semibold" htmlFor="edit-price">Prix</label>
                    <input id="edit-price" className="mt-2 w-full border-b border-black bg-transparent py-2 outline-none" type="text" name="prix" value={formData.prix} onChange={handleChange} required inputMode="decimal"/>
                </div>
                <div>
                    <label className="block text-sm font-semibold" htmlFor="edit-description">Description</label>
                    <textarea id="edit-description" className="mt-2 min-h-28 w-full rounded-md border border-gray-300 bg-transparent p-3 outline-none" name='description' value={formData.description} onChange={handleChange} required/>
                </div>
                <div>
                    <label className="block text-sm font-semibold" htmlFor="edit-photo">Nom du fichier photo</label>
                    <input id="edit-photo" className="mt-2 w-full border-b border-black bg-transparent py-2 outline-none" type="text" name='photo' value={formData.photo} onChange={handleChange}/>
                </div>
                <button className="w-full rounded-md bg-dark-brown p-3 font-semibold text-white disabled:opacity-60" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}</button>
            </div>
            )}
        </div>
    </form>
    )  
}


export default ModifTable
