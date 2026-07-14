const connect = require('../sql/connexion');
const { PRODUCT_SELECT } = require('../models/product.model');

const displayObjectmeubles = async (req, res) => {
  try {
    const [results] = await connect.query(
      `${PRODUCT_SELECT} WHERE p.status = 'published' ORDER BY p.created_at DESC`,
    );
    res.status(200).send(results);
  } catch (error) {
    console.error('Erreur de récupération du meuble', error);
    res.status(500).send({ message: 'Erreur lors de la recuperation des meubles' });
  }
};

const displayCategories = async (req, res) => {
  try {
    const [results] = await connect.query(
      'SELECT id, name, slug FROM categories ORDER BY name ASC',
    );
    res.status(200).send(results);
  } catch (error) {
    console.error('Erreur de récupération des catégories', error);
    res.status(500).send({ message: 'Erreur lors de la recuperation des categories' });
  }
};

module.exports = { displayCategories, displayObjectmeubles };
