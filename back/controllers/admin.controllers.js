const connect = require('../sql/connexion');
const { productSchema } = require('../validation/schemas');
const { validateBody } = require('../validation/validate');
const { PRODUCT_SELECT } = require('../models/product.model');

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const displayProducts = async (req, res) => {
  try {
    const [results] = await connect.query(`${PRODUCT_SELECT} ORDER BY p.updated_at DESC`);
    res.status(200).send(results);
  } catch (error) {
    console.error('Erreur de récupération du catalogue administrateur', error);
    res.status(500).send({ message: 'Erreur lors de la recuperation des produits' });
  }
};

const displayProduct = async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).send({ message: 'Id invalide' });
  }

  try {
    const [results] = await connect.query(`${PRODUCT_SELECT} WHERE p.id = ?`, [id]);

    if (results.length === 0) {
      return res.status(404).send({ message: 'Meuble introuvable' });
    }

    res.status(200).send(results[0]);
  } catch (error) {
    console.error('Erreur de récupération du produit administrateur', error);
    res.status(500).send({ message: 'Erreur lors de la recuperation du produit' });
  }
};

const deleteObject = async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).send({ message: 'Id invalide' });
  }

  const query = 'DELETE FROM products WHERE id = ?';

  try {
    const [results] = await connect.query(query, [id]);

    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Meuble introuvable' });
    }

    res.status(200).send({ message: 'Suppression du meuble avec succès' });
  } catch (error) {
    console.error('Erreur lors de la supression du meuble', error);
    res.status(500).send({ message: 'Erreur lors de la supression du meuble' });
  }
};

const updateObject = async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).send({ message: 'Id invalide' });
  }

  const { data, error: validationError } = validateBody(productSchema, req.body);

  if (validationError) {
    return res.status(400).send({ message: validationError });
  }

  const {
    titre,
    prix,
    description,
    photo,
    categorie,
    style,
    epoque,
    matiere,
    couleur,
    etat,
    hauteur,
    largeur,
    longueur,
    poids,
    stock,
    status,
  } = data;
  const query = `
    UPDATE products SET
      title = ?, price = ?, description = ?, primary_image = ?,
      category_id = (SELECT id FROM categories WHERE slug = ? LIMIT 1),
      style = ?, period = ?, material = ?, color = ?, condition_label = ?,
      height = ?, width = ?, depth = ?, weight = ?, stock = ?, status = ?
    WHERE id = ?
  `;
  const values = [
    titre,
    prix,
    description,
    photo,
    categorie,
    style || null,
    epoque || null,
    matiere || null,
    couleur || null,
    etat,
    hauteur,
    largeur,
    longueur,
    poids,
    stock,
    status,
    id,
  ];

  try {
    const [results] = await connect.query(query, values);

    if (results.affectedRows === 0) {
      return res.status(404).send({ message: 'Meuble introuvable' });
    }

    res.status(200).send({ message: 'Modification du meuble réalisée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la modification du meuble', error);
    res.status(500).send({ message: 'Erreur lors de la modification du meuble' });
  }
};
module.exports = { deleteObject, displayProduct, displayProducts, updateObject };
