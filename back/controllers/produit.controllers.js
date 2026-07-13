const connect = require('../sql/connexion');
const { productSchema } = require('../validation/schemas');
const { validateBody } = require('../validation/validate');

const parseId = (id) => {
  const parsedId = Number(id);
  return Number.isInteger(parsedId) && parsedId > 0 ? parsedId : null;
};

const createObjectDetailProduct = async (req, res) => {
  const id = parseId(req.params.id);

  if (!id) {
    return res.status(400).send({ message: 'Id invalide' });
  }

  const query = 'SELECT DISTINCT * FROM testmeubles WHERE id = ?';

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

  const { titre, prix, description, photo } = data;

  const values = [titre, prix, description, photo];

  const query = 'INSERT INTO testmeubles ( titre, prix, description, photo) VALUES (?,?,?,?)';
  try {
    const [results] = await connect.query(query, values);
    res.status(201).send({ message: 'Produit créé avec succès', id: results.insertId });
  } catch (error) {
    console.error("Erreur lors de la création d'un nouveau produit", error);
    res.status(500).send({ message: 'Erreur lors de la création du produit' });
  }
};

module.exports = { createObjectDetailProduct, createNewProduct };
