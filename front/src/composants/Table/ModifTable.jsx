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


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await updateMeubleInfo(produitDetail.id, formData);
            alert('meuble mis à jour');
            navigate(`/admin`);
        } catch (error) {
            alert(error.message);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
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
            }
        };

        fetchData();
    }, [idTab]);


    return(
        
    <form onSubmit={handleSubmit} className='flex flex-col justify-around items-center min-h-[75vh] mt-3 px-3'>
        <div className="w-full overflow-x-auto">
        <table className='border-4 table-auto mx-auto min-w-[820px]'>
            <thead className="text-red-600">
                <tr>
                    <th className='border-2 text-2xl'>Titre</th>
                    <th className='border-2 text-2xl'>Prix</th>
                    <th className='border-2 text-2xl'>Description</th>
                    <th className='border-2 text-2xl'>Photo</th>
                    <th className='border-2 text-2xl'>Actions</th>
                </tr>
            </thead>
            <tbody className='border-4'>
                <tr key={produitDetail.id} className="border-2">
                    <td className='px-2'>
                        <input type="text" name="titre" value={formData.titre} onChange={handleChange} />
                    </td>
                    <td className='border-2 px-2'>
                        <input type="text" name="prix" value={formData.prix} onChange={handleChange}/> €
                    </td>
                    <td className='border-2 px-2'>
                        <input type="text" name='description' value={formData.description} onChange={handleChange}/>
                    </td>
                    <td className='border-2 px-2'>
                        <input type="text" name='photo' value={formData.photo} onChange={handleChange}/>
                    </td>
                    <td className='flex mx-2 my-auto'>
                        <div className="ml-2">
                            <button type="submit">Enregistrer modification</button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        </div>
    </form>
    )  
}


export default ModifTable
