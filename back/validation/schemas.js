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

const optionalNonnegativeNumber = z.preprocess(
  (value) => (value === '' || value === undefined ? null : value),
  z.coerce.number().nonnegative().nullable(),
);

const productSchema = z.object({
  titre: requiredString('Titre'),
  prix: z.coerce.number({ invalid_type_error: 'Prix invalide' }).positive('Prix invalide'),
  description: requiredString('Description'),
  photo: z.string().trim().optional().default('img_non_dispo.jpg'),
  categorie: z.string().trim().min(1).optional().default('mobilier'),
  style: z.string().trim().max(100).optional().default(''),
  epoque: z.string().trim().max(100).optional().default(''),
  matiere: z.string().trim().max(150).optional().default(''),
  couleur: z.string().trim().max(100).optional().default(''),
  etat: z.string().trim().max(100).optional().default('Bon état vintage'),
  hauteur: optionalNonnegativeNumber,
  largeur: optionalNonnegativeNumber,
  longueur: optionalNonnegativeNumber,
  poids: optionalNonnegativeNumber,
  stock: z.coerce.number().int().nonnegative().optional().default(1),
  status: z.enum(['draft', 'published', 'sold']).optional().default('published'),
});

module.exports = {
  loginSchema,
  productSchema,
  signupSchema,
};
