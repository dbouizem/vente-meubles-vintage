const { z } = require('zod');

const requiredString = (fieldName) =>
  z
    .string({ required_error: `${fieldName} est obligatoire` })
    .trim()
    .min(1, `${fieldName} est obligatoire`);

const signupSchema = z.object({
  name: requiredString('Nom'),
  firstname: requiredString('Prenom'),
  email: requiredString('Email').email('Email invalide'),
  password: requiredString('Mot de passe').min(
    6,
    'Le mot de passe doit contenir au moins 6 caracteres',
  ),
});

const loginSchema = z.object({
  email: requiredString('Email').email('Email invalide'),
  password: requiredString('Mot de passe'),
});

const productSchema = z.object({
  titre: requiredString('Titre'),
  prix: z.coerce.number({ invalid_type_error: 'Prix invalide' }).positive('Prix invalide'),
  description: requiredString('Description'),
  photo: z.string().trim().optional().default('img_non_dispo.jpg'),
});

module.exports = {
  loginSchema,
  productSchema,
  signupSchema,
};
