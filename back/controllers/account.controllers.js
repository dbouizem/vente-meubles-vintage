const connect = require('../sql/connexion');
const { PRODUCT_SELECT } = require('../models/product.model');
const { profileSchema } = require('../validation/schemas');
const { validateBody } = require('../validation/validate');

const displayProfile = async (req, res) => {
  try {
    const [rows] = await connect.query(
      'SELECT id, nom AS name, prenom AS firstname, email, phone, role FROM test_users WHERE id = ?',
      [req.user.id],
    );
    if (!rows.length) return res.status(404).send({ message: 'Compte introuvable' });
    res.status(200).send(rows[0]);
  } catch (error) {
    console.error('Erreur de profil', error);
    res.status(500).send({ message: 'Impossible de charger le profil' });
  }
};

const updateProfile = async (req, res) => {
  const { data, error } = validateBody(profileSchema, req.body);
  if (error) return res.status(400).send({ message: error });
  try {
    await connect.query('UPDATE test_users SET nom = ?, prenom = ?, phone = ? WHERE id = ?', [
      data.name,
      data.firstname,
      data.phone || null,
      req.user.id,
    ]);
    res.status(200).send({ message: 'Profil mis à jour' });
  } catch (requestError) {
    console.error('Erreur de mise à jour du profil', requestError);
    res.status(500).send({ message: 'Impossible de modifier le profil' });
  }
};

const displayOrders = async (req, res) => {
  try {
    const [orders] = await connect.query(
      `SELECT order_number AS orderNumber, confirmation_token AS confirmationToken,
       status, total, created_at AS createdAt FROM orders
       WHERE user_id = ? OR customer_email = ? ORDER BY created_at DESC`,
      [req.user.id, req.user.email],
    );
    res.status(200).send(orders);
  } catch (error) {
    console.error('Erreur des commandes client', error);
    res.status(500).send({ message: 'Impossible de charger les commandes' });
  }
};

const displayFavorites = async (req, res) => {
  try {
    const [items] = await connect.query(
      `${PRODUCT_SELECT} JOIN favorites f ON f.product_id = p.id WHERE f.user_id = ? ORDER BY f.created_at DESC`,
      [req.user.id],
    );
    res.status(200).send(items);
  } catch (error) {
    console.error('Erreur des favoris', error);
    res.status(500).send({ message: 'Impossible de charger les favoris' });
  }
};

const addFavorite = async (req, res) => {
  const productId = Number(req.params.productId);
  if (!Number.isInteger(productId) || productId < 1)
    return res.status(400).send({ message: 'Produit invalide' });
  try {
    await connect.query('INSERT IGNORE INTO favorites (user_id, product_id) VALUES (?, ?)', [
      req.user.id,
      productId,
    ]);
    res.status(201).send({ message: 'Favori ajouté' });
  } catch (error) {
    console.error('Erreur ajout favori', error);
    res.status(500).send({ message: "Impossible d'ajouter le favori" });
  }
};

const removeFavorite = async (req, res) => {
  const productId = Number(req.params.productId);
  if (!Number.isInteger(productId) || productId < 1)
    return res.status(400).send({ message: 'Produit invalide' });
  try {
    await connect.query('DELETE FROM favorites WHERE user_id = ? AND product_id = ?', [
      req.user.id,
      productId,
    ]);
    res.status(200).send({ message: 'Favori supprimé' });
  } catch (error) {
    console.error('Erreur suppression favori', error);
    res.status(500).send({ message: 'Impossible de supprimer le favori' });
  }
};

module.exports = {
  addFavorite,
  displayFavorites,
  displayOrders,
  displayProfile,
  removeFavorite,
  updateProfile,
};
