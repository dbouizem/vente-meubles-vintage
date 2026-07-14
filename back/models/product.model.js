const PRODUCT_SELECT = `
  SELECT
    p.id,
    p.title AS titre,
    p.slug,
    p.sku,
    p.price AS prix,
    p.description,
    p.primary_image AS photo,
    p.height AS hauteur,
    p.width AS largeur,
    p.depth AS longueur,
    p.weight AS poids,
    p.style,
    p.period AS epoque,
    p.material AS matiere,
    p.color AS couleur,
    p.condition_label AS etat,
    p.stock,
    p.status,
    (p.stock > 0 AND p.status = 'published') AS disponibilite,
    c.id AS categorie_id,
    c.name AS categorie,
    c.slug AS categorie_slug,
    p.created_at,
    p.updated_at
  FROM products p
  JOIN categories c ON c.id = p.category_id
`;

const slugify = (value) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const createProductIdentifiers = (title) => {
  const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
  return {
    slug: `${slugify(title) || 'produit'}-${suffix}`,
    sku: `VH-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
  };
};

module.exports = { PRODUCT_SELECT, createProductIdentifiers };
