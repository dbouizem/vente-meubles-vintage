import { useState, useEffect } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import deleteMeuble from '../../function/deleteMeuble';
import { apiUrl } from '../../config/api';

function Table() {
    let navigate = useNavigate()
    const [data, setData] = useState(null);
    const [message, setMessage] = useState('');
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
            setMessage('');
        } catch (error) {
            setData([]);
            setMessage("Impossible de charger les produits.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteMeuble(id);
            setData((currentData) => currentData.filter((item) => item.id !== id));
            setMessage('Meuble supprimé.');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <section className='mx-auto flex w-full max-w-6xl flex-col items-stretch min-h-[75vh] mt-3 px-3 py-8'>
            <div className="mb-6 flex flex-col gap-4 text-left sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-dark-brown/70">Administration</p>
                    <h1 className="text-3xl font-semibold text-dark-brown">Gestion des produits</h1>
                    <p className="mt-2 text-sm text-gray-600">Créez, modifiez ou retirez les meubles affichés dans la boutique.</p>
                </div>
                <Link to="/create" className="inline-flex items-center justify-center rounded-md bg-dark-brown px-4 py-2 font-semibold text-white">
                    Ajouter un produit
                </Link>
            </div>
            {message && (
                <p role="status" className="mb-4 rounded-md border border-beige bg-white px-4 py-3 text-left text-sm text-dark-brown shadow-sm">{message}</p>
            )}
            <div className="w-full overflow-x-auto">
            <table className='w-full table-auto min-w-[720px] overflow-hidden rounded-lg bg-white text-left shadow-sm'>
                <thead className="bg-beige text-dark-brown">
                    <tr>
                        <th className='px-4 py-3 text-sm font-semibold'>Nom</th>
                        <th className='px-4 py-3 text-sm font-semibold'>Prix</th>
                        <th className='px-4 py-3 text-sm font-semibold'>Description</th>
                        <th className='px-4 py-3 text-sm font-semibold'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data === null ? (
                        <tr>
                            <td colSpan="4" className="px-4 py-6 text-center text-gray-600">Chargement des produits...</td>
                        </tr>
                    ) : data.length > 0 ? (
                        data.map(el => (

                            <tr key={el.id} className="border-t border-gray-100">
                                <td className='px-4 py-3 font-semibold'>{el.titre}</td>
                                <td className='px-4 py-3'>{el.prix} €</td>
                                <td className='px-4 py-3 text-sm text-gray-600'>{el.description}</td>
                                <td className='flex gap-2 px-4 py-3'>
                                    <button aria-label={`Supprimer ${el.titre}`} onClick ={() => {handleDelete(el.id)}}> <DeleteForeverIcon className="text-red-600" sx={{ fontSize: 36 }} /></button>
                                    <button aria-label={`Modifier ${el.titre}`} onClick ={() => {navigate(`/modif/${el.id}`)}}> <EditIcon sx={{ fontSize: 36 }}  /></button>
                                </td>
                            </tr>

                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="px-4 py-6 text-center text-gray-600">Aucun produit à afficher.</td>
                        </tr>
                    )
                    }
                </tbody>
            </table>
            </div>
            <Link to="/create" className="mt-5 self-center text-dark-brown sm:hidden" aria-label="Ajouter un produit">
              <AddCircleIcon sx={{ fontSize: 50 }} />
            </Link>  
        </section>
    )
}

export default Table
