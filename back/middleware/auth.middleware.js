const jwt = require('jsonwebtoken');

const getAuthSecret = () => {
  if (process.env.AUTH_SECRET) {
    return process.env.AUTH_SECRET;
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('AUTH_SECRET est obligatoire en production');
  }

  return 'dev-secret-change-me';
};

const AUTH_SECRET = getAuthSecret();
const TOKEN_EXPIRES_IN = process.env.AUTH_TOKEN_EXPIRES_IN || '2h';

const createAdminToken = (user) =>
  jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    AUTH_SECRET,
    { expiresIn: TOKEN_EXPIRES_IN },
  );

const requireAdmin = (req, res, next) => {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null;

  if (!token) {
    return res.status(401).send({ message: 'Authentification requise' });
  }

  let payload;

  try {
    payload = jwt.verify(token, AUTH_SECRET);
  } catch (error) {
    return res.status(403).send({ message: 'Acces admin refuse' });
  }

  if (!payload || payload.role !== 'admin') {
    return res.status(403).send({ message: 'Acces admin refuse' });
  }

  req.user = payload;
  next();
};

module.exports = { createAdminToken, requireAdmin };
