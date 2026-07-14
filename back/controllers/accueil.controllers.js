const connect = require('../sql/connexion');
const { PRODUCT_SELECT } = require('../models/product.model');

const SORT_OPTIONS = {
  newest: 'p.created_at DESC',
  price_asc: 'p.price ASC, p.id DESC',
  price_desc: 'p.price DESC, p.id DESC',
  name_asc: 'p.title ASC',
};

const positiveInteger = (value, fallback, maximum) => {
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1) return fallback;
  return maximum ? Math.min(parsed, maximum) : parsed;
};

const optionalPrice = (value) => {
  if (value === undefined || value === '') return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
};

const buildCatalogFilters = (query) => {
  const conditions = ["p.status = 'published'"];
  const values = [];
  const search = String(query.q || '')
    .trim()
    .slice(0, 100);
  const category = String(query.category || '')
    .trim()
    .slice(0, 120);
  const minPrice = optionalPrice(query.min_price);
  const maxPrice = optionalPrice(query.max_price);

  if (search) {
    conditions.push('(p.title LIKE ? OR p.description LIKE ? OR p.material LIKE ?)');
    const term = `%${search}%`;
    values.push(term, term, term);
  }
  if (category) {
    conditions.push('c.slug = ?');
    values.push(category);
  }
  if (minPrice !== null) {
    conditions.push('p.price >= ?');
    values.push(minPrice);
  }
  if (maxPrice !== null) {
    conditions.push('p.price <= ?');
    values.push(maxPrice);
  }

  return { where: conditions.join(' AND '), values };
};

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

const displayCatalog = async (req, res) => {
  const page = positiveInteger(req.query.page, 1);
  const limit = positiveInteger(req.query.limit, 6, 24);
  const offset = (page - 1) * limit;
  const orderBy = SORT_OPTIONS[req.query.sort] || SORT_OPTIONS.newest;
  const { where, values } = buildCatalogFilters(req.query);

  try {
    const [[items], [countRows]] = await Promise.all([
      connect.query(`${PRODUCT_SELECT} WHERE ${where} ORDER BY ${orderBy} LIMIT ? OFFSET ?`, [
        ...values,
        limit,
        offset,
      ]),
      connect.query(
        `SELECT COUNT(*) AS total FROM products p JOIN categories c ON c.id = p.category_id WHERE ${where}`,
        values,
      ),
    ]);
    const total = Number(countRows[0]?.total || 0);

    res.status(200).send({
      items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
    });
  } catch (error) {
    console.error('Erreur de récupération du catalogue', error);
    res.status(500).send({ message: 'Erreur lors de la recherche des meubles' });
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

module.exports = { displayCatalog, displayCategories, displayObjectmeubles };
