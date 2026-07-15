const connect = require('../sql/connexion');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { createAuthToken } = require('../middleware/auth.middleware');
const {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
  signupSchema,
} = require('../validation/schemas');
const { validateBody } = require('../validation/validate');

const SALT_ROUNDS = 10;

const createObject = async (req, res) => {
  try {
    const { data, error: validationError } = validateBody(signupSchema, req.body);

    if (validationError) {
      return res.status(400).send({ message: validationError });
    }

    const nom = data.name;
    const prenom = data.firstname;
    const email = data.email;
    const password = data.password;

    const mdp = await bcrypt.hash(password, SALT_ROUNDS);
    const values = [nom, prenom, email, mdp];

    const query = 'INSERT INTO test_users (nom, prenom, email, mdp) VALUES (?,?,?,?)';
    await connect.query(query, values);

    res.status(200).send({ message: 'Utilisateur inséré avec succès' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).send({ message: 'Cet email est deja utilise' });
    }

    console.error('Erreur lors du hash du mot de passe', error);
    res.status(500).send({ message: "Erreur lors de la création de l'utilisateur" });
  }
};

const checkLogin = async (req, res) => {
  const { data, error: validationError } = validateBody(loginSchema, req.body);

  if (validationError) {
    return res.status(400).send({ message: validationError });
  }

  const email = data.email;
  const password = data.password;

  try {
    const [results] = await connect.query('SELECT * FROM test_users WHERE email = ?', [email]);

    if (results.length > 0 && (await bcrypt.compare(password, results[0].mdp))) {
      const user = results[0];
      const isAdmin = user.role === 'admin';
      const token = createAuthToken(user);

      return res.status(200).send({
        message: 'Connexion réussie',
        isAdmin,
        token,
      });
    }

    res.status(401).send({ message: 'Email ou mot de passe incorrect' });
  } catch (error) {
    console.error('Erreur lors de la connexion', error);
    res.status(500).send({ message: 'Erreur lors de la connexion' });
  }
};

const forgotPassword = async (req, res) => {
  const { data, error } = validateBody(forgotPasswordSchema, req.body);
  if (error) return res.status(400).send({ message: error });
  try {
    const [users] = await connect.query('SELECT id FROM test_users WHERE email = ?', [data.email]);
    let resetToken;
    if (users.length) {
      resetToken = crypto.randomBytes(32).toString('hex');
      const tokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');
      await connect.query('DELETE FROM password_reset_tokens WHERE user_id = ?', [users[0].id]);
      await connect.query(
        'INSERT INTO password_reset_tokens (user_id, token_hash, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 30 MINUTE))',
        [users[0].id, tokenHash],
      );
    }
    const response = { message: 'Si ce compte existe, un lien de réinitialisation a été préparé.' };
    if (resetToken && process.env.NODE_ENV !== 'production') response.resetToken = resetToken;
    res.status(200).send(response);
  } catch (requestError) {
    console.error('Erreur mot de passe oublié', requestError);
    res.status(500).send({ message: 'Impossible de préparer la réinitialisation' });
  }
};

const resetPassword = async (req, res) => {
  const { data, error } = validateBody(resetPasswordSchema, req.body);
  if (error) return res.status(400).send({ message: error });
  const tokenHash = crypto.createHash('sha256').update(data.token).digest('hex');
  try {
    const [tokens] = await connect.query(
      'SELECT id, user_id FROM password_reset_tokens WHERE token_hash = ? AND used_at IS NULL AND expires_at > NOW()',
      [tokenHash],
    );
    if (!tokens.length) return res.status(400).send({ message: 'Lien invalide ou expiré' });
    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS);
    await connect.query('UPDATE test_users SET mdp = ? WHERE id = ?', [
      passwordHash,
      tokens[0].user_id,
    ]);
    await connect.query('UPDATE password_reset_tokens SET used_at = NOW() WHERE id = ?', [
      tokens[0].id,
    ]);
    res.status(200).send({ message: 'Mot de passe modifié avec succès' });
  } catch (requestError) {
    console.error('Erreur réinitialisation', requestError);
    res.status(500).send({ message: 'Impossible de modifier le mot de passe' });
  }
};

module.exports = { checkLogin, createObject, forgotPassword, resetPassword };
