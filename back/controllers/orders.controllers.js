const crypto = require('crypto');
const connect = require('../sql/connexion');
const { orderSchema } = require('../validation/schemas');
const { validateBody } = require('../validation/validate');

const createOrderNumber = () => {
  const date = new Date().toISOString().slice(0, 10).replaceAll('-', '');
  return `AH-${date}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
};

const createOrder = async (req, res) => {
  const { data, error: validationError } = validateBody(orderSchema, req.body);
  if (validationError) return res.status(400).send({ message: validationError });

  const quantities = new Map();
  data.items.forEach((item) => {
    quantities.set(item.productId, (quantities.get(item.productId) || 0) + item.quantity);
  });
  const requestedItems = [...quantities.entries()]
    .map(([productId, quantity]) => ({ productId, quantity }))
    .sort((first, second) => first.productId - second.productId);
  const placeholders = requestedItems.map(() => '?').join(', ');
  const connection = await connect.getConnection().catch((error) => {
    console.error('Erreur de connexion pendant la commande', error);
    return null;
  });

  if (!connection) {
    return res.status(500).send({ message: 'Impossible de créer la commande' });
  }

  try {
    await connection.beginTransaction();
    const [products] = await connection.query(
      `SELECT id, title, sku, price, stock, status FROM products WHERE id IN (${placeholders}) ORDER BY id FOR UPDATE`,
      requestedItems.map((item) => item.productId),
    );

    if (products.length !== requestedItems.length) {
      await connection.rollback();
      return res.status(409).send({ message: 'Un produit du panier est introuvable' });
    }

    const lines = requestedItems.map((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      if (product.status !== 'published' || product.stock < item.quantity) {
        const error = new Error(`Stock insuffisant pour ${product.title}`);
        error.code = 'INSUFFICIENT_STOCK';
        throw error;
      }
      const unitPrice = Number(product.price);
      return { ...item, product, unitPrice, lineTotal: unitPrice * item.quantity };
    });

    const subtotal = lines.reduce((sum, line) => sum + line.lineTotal, 0);
    const discount = data.promoCode.toUpperCase() === 'ADATECH' ? Math.min(10, subtotal) : 0;
    const total = subtotal - discount;
    const orderNumber = createOrderNumber();
    const confirmationToken = crypto.randomUUID();
    const [orderResult] = await connection.query(
      `INSERT INTO orders
        (order_number, confirmation_token, customer_name, customer_email, subtotal, discount, total)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        orderNumber,
        confirmationToken,
        data.customerName,
        data.customerEmail.toLowerCase(),
        subtotal,
        discount,
        total,
      ],
    );

    for (const line of lines) {
      await connection.query(
        `INSERT INTO order_items
          (order_id, product_id, product_sku, product_title, unit_price, quantity, line_total)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          orderResult.insertId,
          line.product.id,
          line.product.sku,
          line.product.title,
          line.unitPrice,
          line.quantity,
          line.lineTotal,
        ],
      );
      await connection.query(
        `UPDATE products
         SET status = CASE WHEN stock = ? THEN 'sold' ELSE status END, stock = stock - ?
         WHERE id = ?`,
        [line.quantity, line.quantity, line.product.id],
      );
    }

    await connection.commit();
    res.status(201).send({
      message: 'Commande créée avec succès',
      orderNumber,
      confirmationToken,
      total,
    });
  } catch (error) {
    await connection.rollback();
    if (error.code === 'INSUFFICIENT_STOCK') {
      return res.status(409).send({ message: error.message });
    }
    console.error('Erreur pendant la création de la commande', error);
    res.status(500).send({ message: 'Impossible de créer la commande' });
  } finally {
    connection.release();
  }
};

const displayOrder = async (req, res) => {
  const token = String(req.params.token || '');
  if (!/^[0-9a-f-]{36}$/i.test(token)) {
    return res.status(400).send({ message: 'Référence de commande invalide' });
  }

  try {
    const [orders] = await connect.query(
      `SELECT id, order_number AS orderNumber, customer_name AS customerName,
        customer_email AS customerEmail, status, subtotal, discount, total, created_at AS createdAt
       FROM orders WHERE confirmation_token = ?`,
      [token],
    );
    if (orders.length === 0) {
      return res.status(404).send({ message: 'Commande introuvable' });
    }
    const [items] = await connect.query(
      `SELECT product_id AS productId, product_sku AS sku, product_title AS title,
        unit_price AS unitPrice, quantity, line_total AS lineTotal
       FROM order_items WHERE order_id = ? ORDER BY id`,
      [orders[0].id],
    );
    const order = { ...orders[0] };
    delete order.id;
    res.status(200).send({ ...order, items });
  } catch (error) {
    console.error('Erreur pendant la récupération de la commande', error);
    res.status(500).send({ message: 'Impossible de charger la commande' });
  }
};

module.exports = { createOrder, displayOrder };
