const connect = require('../sql/connexion');
const bcrypt = require('bcrypt');
const { createAdminToken } = require('../middleware/auth.middleware');
const { loginSchema, signupSchema } = require('../validation/schemas');
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
      const token = isAdmin ? createAdminToken(user) : null;

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

module.exports = { createObject, checkLogin };
