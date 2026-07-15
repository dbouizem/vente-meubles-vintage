process.env.AUTH_SECRET = 'test-secret';

jest.mock('../sql/connexion', () => ({
  query: jest.fn(),
  getConnection: jest.fn(),
}));

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../sql/connexion');
const accueilController = require('../controllers/accueil.controllers');
const adminController = require('../controllers/admin.controllers');
const produitController = require('../controllers/produit.controllers');
const ordersController = require('../controllers/orders.controllers');
const usersController = require('../controllers/users.controllers');
const { createAdminToken, requireAdmin } = require('../middleware/auth.middleware');
const app = require('../app');
const { PRODUCT_SELECT } = require('../models/product.model');

const createResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  res.redirect = jest.fn().mockReturnValue(res);
  return res;
};

describe('Backend controllers and middleware', () => {
  let consoleErrorSpy;

  beforeAll(() => {
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  beforeEach(() => {
    db.query.mockReset();
    db.getConnection.mockReset();
  });

  describe('app configuration', () => {
    it('configures CORS for the frontend origin', () => {
      const corsLayer = app._router.stack.find((layer) => layer.name === 'corsMiddleware');
      const req = {
        headers: { origin: 'http://localhost:5173' },
        method: 'GET',
      };
      const res = {
        setHeader: jest.fn(),
        getHeader: jest.fn(),
        end: jest.fn(),
      };
      const next = jest.fn();

      corsLayer.handle(req, res, next);

      expect(res.setHeader).toHaveBeenCalledWith(
        'Access-Control-Allow-Origin',
        'http://localhost:5173',
      );
      expect(next).toHaveBeenCalled();
    });
  });

  describe('accueil controller', () => {
    it('returns furniture list', async () => {
      const meubles = [
        { id: 1, titre: 'Table', prix: 100, description: 'Bois', photo: 'table.jpg' },
      ];
      db.query.mockResolvedValueOnce([meubles]);
      const res = createResponse();

      await accueilController.displayObjectmeubles({}, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(meubles);
      expect(db.query).toHaveBeenCalledWith(
        `${PRODUCT_SELECT} WHERE p.status = 'published' ORDER BY p.created_at DESC`,
      );
    });

    it('returns 500 when database fails', async () => {
      db.query.mockRejectedValueOnce(new Error('DB down'));
      const res = createResponse();

      await accueilController.displayObjectmeubles({}, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({
        message: 'Erreur lors de la recuperation des meubles',
      });
    });

    it('searches, sorts, and paginates the public catalog with parameterized queries', async () => {
      const items = [{ id: 1, titre: 'Table basse', prix: 90 }];
      db.query.mockResolvedValueOnce([items]).mockResolvedValueOnce([[{ total: 3 }]]);
      const res = createResponse();

      await accueilController.displayCatalog(
        {
          query: {
            q: 'table',
            category: 'tables',
            min_price: '50',
            max_price: '200',
            sort: 'price_asc',
            page: '2',
            limit: '1',
          },
        },
        res,
      );

      expect(db.query.mock.calls[0][0]).toContain(
        'ORDER BY p.price ASC, p.id DESC LIMIT ? OFFSET ?',
      );
      expect(db.query.mock.calls[0][1]).toEqual([
        '%table%',
        '%table%',
        '%table%',
        'tables',
        50,
        200,
        1,
        1,
      ]);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({
        items,
        pagination: { page: 2, limit: 1, total: 3, totalPages: 3 },
      });
    });
  });

  describe('produit controller', () => {
    it('rejects an invalid product id', async () => {
      const res = createResponse();

      await produitController.createObjectDetailProduct({ params: { id: 'abc' } }, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'Id invalide' });
      expect(db.query).not.toHaveBeenCalled();
    });

    it('returns 404 when product does not exist', async () => {
      db.query.mockResolvedValueOnce([[]]);
      const res = createResponse();

      await produitController.createObjectDetailProduct({ params: { id: '999' } }, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Meuble introuvable' });
    });

    it('rejects product creation with missing fields', async () => {
      const res = createResponse();

      await produitController.createNewProduct({ body: { titre: 'Table' } }, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send.mock.calls[0][0].message).toContain('Prix invalide');
      expect(res.send.mock.calls[0][0].message).toContain('Description est obligatoire');
      expect(db.query).not.toHaveBeenCalled();
    });

    it('rejects product creation with invalid price', async () => {
      const res = createResponse();

      await produitController.createNewProduct(
        {
          body: { titre: 'Table', prix: -10, description: 'Bois' },
        },
        res,
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'Prix invalide' });
      expect(db.query).not.toHaveBeenCalled();
    });

    it('uses uploaded image filename when creating a product', async () => {
      db.query.mockResolvedValueOnce([{ insertId: 10 }]);
      const res = createResponse();

      await produitController.createNewProduct(
        {
          body: { titre: 'Table', prix: 100, description: 'Bois' },
          file: { filename: 'uploaded-table.jpg' },
        },
        res,
      );

      expect(res.status).toHaveBeenCalledWith(201);
      expect(db.query.mock.calls[0][1]).toEqual(
        expect.arrayContaining(['Table', 100, 'Bois', 'uploaded-table.jpg', 'mobilier']),
      );
      expect(db.query).toHaveBeenCalledTimes(2);
    });
  });

  describe('orders controller', () => {
    const createConnection = () => ({
      beginTransaction: jest.fn(),
      commit: jest.fn(),
      rollback: jest.fn(),
      release: jest.fn(),
      query: jest.fn(),
    });

    it('recalculates prices and creates an order in a transaction', async () => {
      const connection = createConnection();
      connection.query
        .mockResolvedValueOnce([
          [{ id: 5, title: 'Buffet', sku: 'VH-5', price: '120.00', stock: 3, status: 'published' }],
        ])
        .mockResolvedValueOnce([{ insertId: 42 }])
        .mockResolvedValueOnce([{}])
        .mockResolvedValueOnce([{}]);
      db.getConnection.mockResolvedValueOnce(connection);
      const res = createResponse();

      await ordersController.createOrder(
        {
          body: {
            customerName: 'Client Test',
            customerEmail: 'CLIENT@example.com',
            address: {
              line1: '10 rue Vintage',
              line2: '',
              postalCode: '75001',
              city: 'Paris',
              country: 'France',
            },
            deliveryMethod: 'home_delivery',
            paymentMethod: 'pay_on_delivery',
            promoCode: 'ADATECH',
            items: [{ productId: 5, quantity: 2 }],
          },
        },
        res,
      );

      expect(connection.beginTransaction).toHaveBeenCalled();
      expect(connection.query.mock.calls[1][1]).toEqual(
        expect.arrayContaining([
          'Client Test',
          'client@example.com',
          '10 rue Vintage',
          '75001',
          'Paris',
          'France',
          'home_delivery',
          'pay_on_delivery',
          240,
          10,
          230,
        ]),
      );
      expect(connection.query.mock.calls[2][1]).toEqual([42, 5, 'VH-5', 'Buffet', 120, 2, 240]);
      expect(connection.query.mock.calls[3][1]).toEqual([2, 2, 5]);
      expect(connection.commit).toHaveBeenCalled();
      expect(connection.release).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send.mock.calls[0][0]).toMatchObject({ total: 230 });
    });

    it('rolls back when product stock is insufficient', async () => {
      const connection = createConnection();
      connection.query.mockResolvedValueOnce([
        [{ id: 5, title: 'Buffet', sku: 'VH-5', price: '120.00', stock: 1, status: 'published' }],
      ]);
      db.getConnection.mockResolvedValueOnce(connection);
      const res = createResponse();

      await ordersController.createOrder(
        {
          body: {
            customerName: 'Client Test',
            customerEmail: 'client@example.com',
            address: {
              line1: '10 rue Vintage',
              postalCode: '75001',
              city: 'Paris',
              country: 'France',
            },
            deliveryMethod: 'home_delivery',
            paymentMethod: 'pay_on_delivery',
            items: [{ productId: 5, quantity: 2 }],
          },
        },
        res,
      );

      expect(connection.rollback).toHaveBeenCalled();
      expect(connection.commit).not.toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.send).toHaveBeenCalledWith({ message: 'Stock insuffisant pour Buffet' });
    });
  });

  describe('users controller', () => {
    it('hashes password before inserting user', async () => {
      db.query.mockResolvedValueOnce([{ insertId: 1 }]);
      const res = createResponse();

      await usersController.createObject(
        {
          body: {
            name: 'Test',
            firstname: 'User',
            email: 'test@example.com',
            password: 'secret123',
          },
        },
        res,
      );

      expect(res.status).toHaveBeenCalledWith(200);
      const [, values] = db.query.mock.calls[0];
      expect(values[2]).toBe('test@example.com');
      expect(values[3]).not.toBe('secret123');
      expect(await bcrypt.compare('secret123', values[3])).toBe(true);
    });

    it('returns 409 when email already exists', async () => {
      const duplicateError = new Error('Duplicate entry');
      duplicateError.code = 'ER_DUP_ENTRY';
      db.query.mockRejectedValueOnce(duplicateError);
      const res = createResponse();

      await usersController.createObject(
        {
          body: {
            name: 'Test',
            firstname: 'User',
            email: 'test@example.com',
            password: 'secret123',
          },
        },
        res,
      );

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.send).toHaveBeenCalledWith({ message: 'Cet email est deja utilise' });
    });

    it('rejects signup with invalid email', async () => {
      const res = createResponse();

      await usersController.createObject(
        {
          body: {
            name: 'Test',
            firstname: 'User',
            email: 'not-an-email',
            password: 'secret123',
          },
        },
        res,
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'Email invalide' });
      expect(db.query).not.toHaveBeenCalled();
    });

    it('returns an admin token without leaking the password', async () => {
      const passwordHash = await bcrypt.hash('admin123', 10);
      db.query.mockResolvedValueOnce([
        [
          {
            id: 1,
            email: 'admin@example.com',
            mdp: passwordHash,
            role: 'admin',
          },
        ],
      ]);
      const res = createResponse();

      await usersController.checkLogin(
        {
          body: { email: 'admin@example.com', password: 'admin123' },
        },
        res,
      );

      expect(res.status).toHaveBeenCalledWith(200);
      const payload = res.send.mock.calls[0][0];
      expect(payload.message).toBe('Connexion réussie');
      expect(payload.isAdmin).toBe(true);
      expect(payload.token).toEqual(expect.any(String));
      expect(jwt.verify(payload.token, process.env.AUTH_SECRET).role).toBe('admin');
      expect(JSON.stringify(payload)).not.toContain('admin123');
      expect(JSON.stringify(payload)).not.toContain(passwordHash);
    });

    it('returns an authenticated token for a customer', async () => {
      const passwordHash = await bcrypt.hash('client123', 10);
      db.query.mockResolvedValueOnce([
        [{ id: 7, email: 'client@example.com', mdp: passwordHash, role: 'user' }],
      ]);
      const res = createResponse();

      await usersController.checkLogin(
        { body: { email: 'client@example.com', password: 'client123' } },
        res,
      );

      const payload = res.send.mock.calls[0][0];
      expect(payload.isAdmin).toBe(false);
      expect(jwt.verify(payload.token, process.env.AUTH_SECRET)).toMatchObject({
        id: 7,
        role: 'user',
      });
    });

    it('returns 401 on wrong password', async () => {
      const passwordHash = await bcrypt.hash('admin123', 10);
      db.query.mockResolvedValueOnce([
        [
          {
            id: 1,
            email: 'admin@example.com',
            mdp: passwordHash,
            role: 'admin',
          },
        ],
      ]);
      const res = createResponse();

      await usersController.checkLogin(
        {
          body: { email: 'admin@example.com', password: 'wrong' },
        },
        res,
      );

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ message: 'Email ou mot de passe incorrect' });
    });

    it('rejects login with missing password', async () => {
      const res = createResponse();

      await usersController.checkLogin(
        {
          body: { email: 'admin@example.com' },
        },
        res,
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'Mot de passe est obligatoire' });
      expect(db.query).not.toHaveBeenCalled();
    });
  });

  describe('admin controller and middleware', () => {
    it('rejects admin access without token', () => {
      const req = { headers: {} };
      const res = createResponse();
      const next = jest.fn();

      requireAdmin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith({ message: 'Authentification requise' });
      expect(next).not.toHaveBeenCalled();
    });

    it('accepts a valid admin token', () => {
      const token = createAdminToken({ id: 1, email: 'admin@example.com', role: 'admin' });
      const req = { headers: { authorization: `Bearer ${token}` } };
      const res = createResponse();
      const next = jest.fn();

      requireAdmin(req, res, next);

      expect(req.user.email).toBe('admin@example.com');
      expect(next).toHaveBeenCalled();
    });

    it('rejects an invalid admin token', () => {
      const req = { headers: { authorization: 'Bearer invalid-token' } };
      const res = createResponse();
      const next = jest.fn();

      requireAdmin(req, res, next);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.send).toHaveBeenCalledWith({ message: 'Acces admin refuse' });
      expect(next).not.toHaveBeenCalled();
    });

    it('deletes furniture when id exists', async () => {
      db.query.mockResolvedValueOnce([{ affectedRows: 1 }]);
      const res = createResponse();

      await adminController.deleteObject({ params: { id: '1' } }, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'Suppression du meuble avec succès' });
    });

    it('returns 404 when deleting unknown furniture', async () => {
      db.query.mockResolvedValueOnce([{ affectedRows: 0 }]);
      const res = createResponse();

      await adminController.deleteObject({ params: { id: '999' } }, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ message: 'Meuble introuvable' });
    });

    it('rejects update with invalid body', async () => {
      const res = createResponse();

      await adminController.updateObject(
        {
          params: { id: '1' },
          body: { titre: 'Table', prix: 'abc', description: 'Bois' },
        },
        res,
      );

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith({ message: 'Prix invalide' });
      expect(db.query).not.toHaveBeenCalled();
    });
  });
});
