const connect = require('../sql/connexion');
const { productSchema } = require('../validation/schemas');
const { validateBody } = require('../validation/validate');
const { PRODUCT_SELECT, createProductIdentifiers } = require('../models/product.model');

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const createObjectDetailProduct = async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).send({ message: 'Id invalide' });
  }

  const query = `${PRODUCT_SELECT} WHERE p.id = ? AND p.status = 'published'`;

  try {
    const [results] = await connect.query(query, [id]);

    if (results.length === 0) {
      return res.status(404).send({ message: 'Meuble introuvable' });
    }

    res.status(200).send(results);
  } catch (error) {
    console.error('Erreur lors de la recuperation du meuble', error);
    res.status(500).send({ message: 'Erreur lors de la recuperation du meuble' });
  }
};

const createNewProduct = async (req, res) => {
  const body = {
    ...req.body,
    photo: req.file ? req.file.filename : req.body.photo,
  };
  const { data, error: validationError } = validateBody(productSchema, body);

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
  const { slug, sku } = createProductIdentifiers(titre);
  const values = [
    titre,
    slug,
    sku,
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
  ];
  const query = `
    INSERT INTO products (
      title, slug, sku, price, description, primary_image, category_id, style, period,
      material, color, condition_label, height, width, depth, weight, stock, status
    ) VALUES (?, ?, ?, ?, ?, ?, (SELECT id FROM categories WHERE slug = ? LIMIT 1), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  try {
    const [results] = await connect.query(query, values);
    await connect.query(
      'INSERT INTO product_images (product_id, filename, alt_text, position) VALUES (?, ?, ?, 0)',
      [results.insertId, photo, titre],
    );
    res.status(201).send({ message: 'Produit créé avec succès', id: results.insertId });
  } catch (error) {
    console.error("Erreur lors de la création d'un nouveau produit", error);
    res.status(500).send({ message: 'Erreur lors de la création du produit' });
  }
};

module.exports = { createObjectDetailProduct, createNewProduct };
