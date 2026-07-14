import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import updateProduct from '../services/updateProduct';
import { getAdminProduct } from '../../../services/products';
import { CATEGORY_OPTIONS, PRODUCT_STATUS_OPTIONS } from '../../catalog/product-options';

function EditProductForm() {
  const { id: idTab } = useParams();
  let navigate = useNavigate();
  const [produitDetail, setproduitDetail] = useState({});
  const [formData, setFormData] = useState({
    titre: '',
    prix: '',
    description: '',
    photo: '',
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
      await updateProduct(produitDetail.id, formData);
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
        const product = await getAdminProduct(idTab);

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
          categorie: product.categorie_slug ?? 'mobilier',
          style: product.style ?? '',
          epoque: product.epoque ?? '',
          matiere: product.matiere ?? '',
          couleur: product.couleur ?? '',
          etat: product.etat ?? 'Bon état vintage',
          hauteur: product.hauteur ?? '',
          largeur: product.largeur ?? '',
          longueur: product.longueur ?? '',
          poids: product.poids ?? '',
          stock: product.stock ?? '1',
          status: product.status ?? 'published',
        });
      } catch (error) {
        setproduitDetail({});
        setMessage('Impossible de charger ce produit.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idTab]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl flex-col min-h-[75vh] mt-3 px-4 py-8"
    >
      <div className="rounded-lg bg-white p-5 text-left shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-dark-brown/70">
          Administration
        </p>
        <h1 className="text-2xl font-semibold text-dark-brown">Modifier le produit</h1>
        <p className="mt-2 text-sm text-gray-600">
          Mettez à jour les informations affichées dans la boutique.
        </p>

        {message && (
          <p
            role="alert"
            className="mt-5 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {message}
          </p>
        )}

        {isLoading ? (
          <p className="mt-6 text-sm text-gray-600">Chargement du produit...</p>
        ) : (
          <div className="mt-6 space-y-5">
            <div>
              <label className="block text-sm font-semibold" htmlFor="edit-title">
                Titre
              </label>
              <input
                id="edit-title"
                className="mt-2 w-full border-b border-black bg-transparent py-2 outline-none"
                type="text"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold" htmlFor="edit-price">
                Prix
              </label>
              <input
                id="edit-price"
                className="mt-2 w-full border-b border-black bg-transparent py-2 outline-none"
                type="text"
                name="prix"
                value={formData.prix}
                onChange={handleChange}
                required
                inputMode="decimal"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold" htmlFor="edit-description">
                Description
              </label>
              <textarea
                id="edit-description"
                className="mt-2 min-h-28 w-full rounded-md border border-gray-300 bg-transparent p-3 outline-none"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold" htmlFor="edit-photo">
                Nom du fichier photo
              </label>
              <input
                id="edit-photo"
                className="mt-2 w-full border-b border-black bg-transparent py-2 outline-none"
                type="text"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold" htmlFor="edit-category">
                Catégorie
                <select
                  id="edit-category"
                  name="categorie"
                  value={formData.categorie}
                  onChange={handleChange}
                  className="mt-2 w-full border border-gray-300 bg-white p-3 font-normal"
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-sm font-semibold" htmlFor="edit-status">
                Statut
                <select
                  id="edit-status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
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
                <label key={name} className="block text-sm font-semibold" htmlFor={`edit-${name}`}>
                  {label}
                  <input
                    id={`edit-${name}`}
                    type={name === 'stock' ? 'number' : 'text'}
                    min={name === 'stock' ? '0' : undefined}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    className="mt-2 w-full border-b border-black bg-transparent py-2 font-normal outline-none"
                  />
                </label>
              ))}
            </div>
            <fieldset>
              <legend className="text-sm font-semibold">Dimensions et poids</legend>
              <div className="mt-2 grid gap-4 sm:grid-cols-4">
                {[
                  ['hauteur', 'Hauteur (cm)'],
                  ['largeur', 'Largeur (cm)'],
                  ['longueur', 'Profondeur (cm)'],
                  ['poids', 'Poids (kg)'],
                ].map(([name, label]) => (
                  <label key={name} className="text-xs" htmlFor={`edit-${name}`}>
                    {label}
                    <input
                      id={`edit-${name}`}
                      type="number"
                      min="0"
                      step="0.01"
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      className="mt-1 w-full border border-gray-300 bg-white p-2"
                    />
                  </label>
                ))}
              </div>
            </fieldset>
            <button
              className="w-full rounded-md bg-dark-brown p-3 font-semibold text-white disabled:opacity-60"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : 'Enregistrer les modifications'}
            </button>
          </div>
        )}
      </div>
    </form>
  );
}

export default EditProductForm;
