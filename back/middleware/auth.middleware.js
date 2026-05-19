const crypto = require('crypto');

const AUTH_SECRET = process.env.AUTH_SECRET || 'dev-secret-change-me';
const TOKEN_DURATION_MS = 2 * 60 * 60 * 1000;

const signPayload = (payload) => {
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${signature}`;
};

const verifyToken = (token) => {
  const [encodedPayload, signature] = token.split('.');

  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = crypto
    .createHmac('sha256', AUTH_SECRET)
    .update(encodedPayload)
    .digest('base64url');

  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (
    signatureBuffer.length !== expectedSignatureBuffer.length ||
    !crypto.timingSafeEqual(signatureBuffer, expectedSignatureBuffer)
  ) {
    return null;
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8'));

  if (payload.exp && Date.now() > payload.exp) {
    return null;
  }

  return payload;
};

const createAdminToken = (user) => signPayload({
  id: user.id,
  email: user.email,
  role: user.role,
  exp: Date.now() + TOKEN_DURATION_MS,
});

const requireAdmin = (req, res, next) => {
  const authorization = req.headers.authorization || '';
  const token = authorization.startsWith('Bearer ') ? authorization.slice(7) : null;

  if (!token) {
    return res.status(401).send({ message: 'Authentification requise' });
  }

  const payload = verifyToken(token);

  if (!payload || payload.role !== 'admin') {
    return res.status(403).send({ message: 'Acces admin refuse' });
  }

  req.user = payload;
  next();
};

module.exports = { createAdminToken, requireAdmin };
