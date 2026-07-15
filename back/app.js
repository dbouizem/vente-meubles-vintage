const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const app = express();
const router = require('./routes/users.routes.js');
const accueil = require('./routes/accueil.routes.js');
const produit = require('./routes/produit.routes.js');
const admin = require('./routes/admin.routes.js');
const orders = require('./routes/orders.routes.js');
const account = require('./routes/account.routes.js');

const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim());

const isLocalDevOrigin = (origin) => {
  if (process.env.NODE_ENV === 'production') {
    return false;
  }

  try {
    const url = new URL(origin);
    return ['localhost', '127.0.0.1'].includes(url.hostname);
  } catch {
    return false;
  }
};

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin) || isLocalDevOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content',
      'Accept',
      'Content-Type',
      'Authorization',
    ],
  }),
);

app.use(helmet());

if (process.env.NODE_ENV !== 'test') {
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: 'draft-8',
      legacyHeaders: false,
      message: { message: 'Trop de requetes, veuillez reessayer plus tard' },
    }),
  );
}

app.use('/images', express.static(path.resolve(__dirname, 'Assets', 'img_meubles')));

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send({ status: 'ok' });
});

app.use('/', router);
app.use('/', accueil);
app.use('/', produit);
app.use('/', admin);
app.use('/', orders);
app.use('/', account);

if (process.env.NODE_ENV === 'production') {
  const frontendDirectory = path.resolve(__dirname, '..', 'front', 'dist');
  app.use(express.static(frontendDirectory, { maxAge: '1h' }));
  app.get('*', (req, res) => res.sendFile(path.join(frontendDirectory, 'index.html')));
}

module.exports = app;
