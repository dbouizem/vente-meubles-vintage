import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../../composants/Navbar/Navbar';
import Footer from '../../composants/Footer/Footer';
import { apiUrl } from '../../config/api';

function Create() {
    const navigate = useNavigate();
    const [titre, setTitre] = useState("");
    const [prix, setPrix] = useState("");
    const [description, setDescription] = useState("");
    const [photo, setPhoto] = useState(null);

    let createProduct = async (e) => {
        e.preventDefault();
        try {
            const url = apiUrl('/meubles/create');
            const formData = new FormData();
            formData.append('titre', titre);
            formData.append('prix', prix);
            formData.append('description', description);

            if (photo) {
                formData.append('photo', photo);
            }

            let res = await fetch(url, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
                },
                body: formData,
            });
            let resJSON = await res.json();
            if (res.status === 201){
                alert(resJSON.message);
                navigate("/admin")
            } else {
                alert(resJSON.message || "Produit non crée")
            }
        } catch (err){
            alert("Erreur lors de la création du produit");
        }
    }





  return (
    <div>
        <Navbar/>
        <div className='min-h-[75vh] px-4 py-8'>
            <div className="mx-auto w-full max-w-2xl">
                <h1 className="mb-6 text-2xl font-semibold text-left">Create</h1>
                <form onSubmit={createProduct}>
                    <input
                        type="text"
                        value={titre}
                        placeholder="Nom du produit"
                        className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                        onChange={(e) => setTitre(e.target.value)}
                    />

                    <input
                        type="text"
                        value={prix}
                        placeholder="Prix du produit"
                        className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                        onChange={(e) => setPrix(e.target.value)}
                    />

                    <input
                        type="text"
                        value={description}
                        placeholder="Description du produit"
                        className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                        onChange={(e) => setDescription(e.target.value)}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        placeholder="Photo du produit"
                        className='w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setPhoto(file || null);
                        }}
                    />

                    <button type="submit" className='w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center mt-12 mb-12'>
                        Créer votre produit
                    </button>
                   
                </form>
            </div>

        </div>
        <Footer/>
    </div>
  )
}

export default Create
