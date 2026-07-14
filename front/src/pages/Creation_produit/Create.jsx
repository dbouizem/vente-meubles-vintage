import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../../services/api';
import { CATEGORY_OPTIONS, PRODUCT_STATUS_OPTIONS } from '../../features/catalog/product-options';

function Create() {
  const navigate = useNavigate();
  const [titre, setTitre] = useState('');
  const [prix, setPrix] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [details, setDetails] = useState({
    categorie: 'mobilier',
    style: '',
    epoque: '',
    matiere: '',
    couleur: '',
    etat: 'Bon état vintage',
    hauteur: '',
    largeur: '',
    longueur: '',
    poids: '',
    stock: '1',
    status: 'published',
  });
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createProduct = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsSubmitting(true);
    try {
      const url = apiUrl('/meubles/create');
      const formData = new FormData();
      formData.append('titre', titre);
      formData.append('prix', prix);
      formData.append('description', description);
      Object.entries(details).forEach(([key, value]) => formData.append(key, value));

      if (photo) {
        formData.append('photo', photo);
      }

      let res = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: formData,
      });
      let resJSON = await res.json();
      if (res.status === 201) {
        navigate('/admin');
      } else {
        setMessage(resJSON.message || 'Produit non créé');
      }
    } catch (err) {
      setMessage('Le serveur ne répond pas. Réessayez dans quelques instants.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="min-h-[75vh] px-4 py-8">
        <div className="mx-auto w-full max-w-2xl rounded-lg bg-white p-5 shadow-sm sm:p-8">
          <p className="text-left text-sm font-semibold uppercase tracking-wide text-dark-brown/70">
            Administration
          </p>
          <h1 className="mb-2 text-left text-2xl font-semibold text-dark-brown">
            Ajouter un produit
          </h1>
          <p className="mb-6 text-left text-sm text-gray-600">
            Ajoutez les informations nécessaires pour afficher le meuble dans la boutique.
          </p>
          <form onSubmit={createProduct} className="space-y-4">
            {message && (
              <p
                role="alert"
                className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-left text-sm text-red-700"
              >
                {message}
              </p>
            )}
            <label className="block text-left text-sm font-semibold" htmlFor="product-title">
              Nom du produit
            </label>
            <input
              id="product-title"
              type="text"
              value={titre}
              placeholder="Nom du produit"
              required
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              onChange={(e) => setTitre(e.target.value)}
            />

            <label className="block text-left text-sm font-semibold" htmlFor="product-price">
              Prix
            </label>
            <input
              id="product-price"
              type="text"
              value={prix}
              placeholder="Prix du produit"
              required
              inputMode="decimal"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              onChange={(e) => setPrix(e.target.value)}
            />

            <label className="block text-left text-sm font-semibold" htmlFor="product-description">
              Description
            </label>
            <input
              id="product-description"
              type="text"
              value={description}
              placeholder="Description du produit"
              required
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-left text-sm font-semibold" htmlFor="product-category">
                Catégorie
                <select
                  id="product-category"
                  value={details.categorie}
                  onChange={(e) =>
                    setDetails((current) => ({ ...current, categorie: e.target.value }))
                  }
                  className="mt-2 w-full border border-gray-300 bg-white p-3 font-normal"
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-left text-sm font-semibold" htmlFor="product-status">
                Statut
                <select
                  id="product-status"
                  value={details.status}
                  onChange={(e) =>
                    setDetails((current) => ({ ...current, status: e.target.value }))
                  }
                  className="mt-2 w-full border border-gray-300 bg-white p-3 font-normal"
                >
                  {PRODUCT_STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ['style', 'Style'],
                ['epoque', 'Époque'],
                ['matiere', 'Matière'],
                ['couleur', 'Couleur'],
                ['etat', 'État'],
                ['stock', 'Stock'],
              ].map(([name, label]) => (
                <label
                  key={name}
                  className="block text-left text-sm font-semibold"
                  htmlFor={`product-${name}`}
                >
                  {label}
                  <input
                    id={`product-${name}`}
                    type={name === 'stock' ? 'number' : 'text'}
                    min={name === 'stock' ? '0' : undefined}
                    value={details[name]}
                    onChange={(e) =>
                      setDetails((current) => ({ ...current, [name]: e.target.value }))
                    }
                    className="mt-2 w-full border-b border-black bg-transparent py-2 font-normal outline-none"
                  />
                </label>
              ))}
            </div>

            <fieldset>
              <legend className="text-left text-sm font-semibold">Dimensions et poids</legend>
              <div className="mt-2 grid gap-4 sm:grid-cols-4">
                {[
                  ['hauteur', 'Hauteur (cm)'],
                  ['largeur', 'Largeur (cm)'],
                  ['longueur', 'Profondeur (cm)'],
                  ['poids', 'Poids (kg)'],
                ].map(([name, label]) => (
                  <label key={name} className="text-xs" htmlFor={`product-${name}`}>
                    {label}
                    <input
                      id={`product-${name}`}
                      type="number"
                      min="0"
                      step="0.01"
                      value={details[name]}
                      onChange={(e) =>
                        setDetails((current) => ({ ...current, [name]: e.target.value }))
                      }
                      className="mt-1 w-full border border-gray-300 bg-white p-2"
                    />
                  </label>
                ))}
              </div>
            </fieldset>

            <label className="block text-left text-sm font-semibold" htmlFor="product-photo">
              Photo
            </label>
            <input
              id="product-photo"
              type="file"
              accept="image/*"
              placeholder="Photo du produit"
              className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
              onChange={(e) => {
                const file = e.target.files[0];
                setPhoto(file || null);
              }}
            />

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center mt-8 mb-4 disabled:opacity-60"
            >
              {isSubmitting ? 'Création...' : 'Créer le produit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Create;
