process.env.NODE_ENV = 'test';

const fs = require('fs');
const path = require('path');

const runIntegrationTests = process.env.RUN_INTEGRATION_TESTS === 'true';
const describeIntegration = runIntegrationTests ? describe : describe.skip;

describeIntegration('Backend integration with MariaDB/MySQL', () => {
  let app;
  let db;
  let bcrypt;
  let adminToken;

  beforeAll(async () => {
    bcrypt = require('bcrypt');
    const { migrate } = require('../scripts/migrate');

    await migrate();

    app = require('../app');
    db = require('../sql/connexion');
  });

  beforeEach(async () => {
    await resetDatabase();
    await seedAdmin();
    adminToken = await loginAdmin();
  });

  afterAll(async () => {
    if (db) {
      await db.end();
    }
  });

  const resetDatabase = async () => {
    await db.query('DELETE FROM testmeubles');
    await db.query('DELETE FROM test_users');
    await db.query('ALTER TABLE testmeubles AUTO_INCREMENT = 1');
    await db.query('ALTER TABLE test_users AUTO_INCREMENT = 1');
  };

  const seedAdmin = async () => {
    const passwordHash = await bcrypt.hash('admin123', 10);

    await db.query(
      'INSERT INTO test_users (nom, prenom, email, mdp, role) VALUES (?, ?, ?, ?, ?)',
      ['Admin', 'Test', 'admin@example.com', passwordHash, 'admin']
    );
  };

  const loginAdmin = async () => {
    const request = require('supertest');
    const response = await request(app)
      .post('/login')
      .send({ email: 'admin@example.com', password: 'admin123' });

    return response.body.token;
  };

  it('creates a user, stores a hashed password, and logs in without an admin token', async () => {
    const request = require('supertest');

    const signupResponse = await request(app)
      .post('/signup')
      .send({
        name: 'User',
        firstname: 'Integration',
        email: 'integration@example.com',
        password: 'secret123',
      });

    expect(signupResponse.status).toBe(200);

    const [users] = await db.query('SELECT email, mdp, role FROM test_users WHERE email = ?', ['integration@example.com']);
    expect(users).toHaveLength(1);
    expect(users[0].mdp).not.toBe('secret123');
    expect(await bcrypt.compare('secret123', users[0].mdp)).toBe(true);
    expect(users[0].role).toBe('user');

    const loginResponse = await request(app)
      .post('/login')
      .send({ email: 'integration@example.com', password: 'secret123' });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body).toMatchObject({
      message: 'Connexion réussie',
      isAdmin: false,
      token: null,
    });
  });

  it('protects product creation without an admin token', async () => {
    const request = require('supertest');

    const response = await request(app)
      .post('/meubles/create')
      .send({
        titre: 'Table test',
        prix: 120,
        description: 'Produit cree par test integration',
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ message: 'Authentification requise' });
  });

  it('creates, reads, updates, and deletes a product through the HTTP API', async () => {
    const request = require('supertest');

    const uploadFixturePath = path.join(__dirname, 'upload-fixture.png');
    fs.writeFileSync(uploadFixturePath, Buffer.from(
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      'base64'
    ));

    const createResponse = await request(app)
      .post('/meubles/create')
      .set('Authorization', `Bearer ${adminToken}`)
      .field('titre', 'Table integration')
      .field('prix', '180')
      .field('description', 'Produit cree par test integration')
      .attach('photo', uploadFixturePath);

    expect(createResponse.status).toBe(201);
    expect(createResponse.body.id).toEqual(expect.any(Number));

    const productId = createResponse.body.id;
    let uploadedPhoto;

    const detailResponse = await request(app).get(`/meubles/${productId}`);
    expect(detailResponse.status).toBe(200);
    uploadedPhoto = detailResponse.body[0].photo;
    expect(detailResponse.body[0]).toMatchObject({
      id: productId,
      titre: 'Table integration',
      description: 'Produit cree par test integration',
    });
    expect(uploadedPhoto).toMatch(/upload-fixture\.png$/);

    const updateResponse = await request(app)
      .put(`/admin/${productId}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        titre: 'Table integration modifiee',
        prix: 210,
        description: 'Produit modifie par test integration',
        photo: 'table-updated.jpg',
      });

    expect(updateResponse.status).toBe(200);

    const deleteResponse = await request(app)
      .post(`/admin/${productId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    expect(deleteResponse.status).toBe(200);

    const deletedDetailResponse = await request(app).get(`/meubles/${productId}`);
    expect(deletedDetailResponse.status).toBe(404);

    fs.rmSync(uploadFixturePath, { force: true });
    fs.rmSync(path.resolve(__dirname, '..', 'Assets', 'img_meubles', uploadedPhoto), { force: true });
  });
});
