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

const orderSchema = z.object({
  customerName: requiredString('Nom').max(200),
  customerEmail: requiredString('Email').email('Email invalide').max(255),
  address: z.object({
    line1: requiredString('Adresse').max(255),
    line2: z.string().trim().max(255).optional().default(''),
    postalCode: requiredString('Code postal').max(20),
    city: requiredString('Ville').max(120),
    country: requiredString('Pays').max(100).default('France'),
  }),
  deliveryMethod: z.enum(['home_delivery', 'store_pickup']),
  paymentMethod: z.enum(['pay_on_delivery', 'bank_transfer']),
  promoCode: z.string().trim().max(30).optional().default(''),
  items: z
    .array(
      z.object({
        productId: z.coerce.number().int().positive(),
        quantity: z.coerce.number().int().min(1).max(99),
      }),
    )
    .min(1, 'Le panier est vide')
    .max(50, 'Le panier contient trop de produits'),
});

module.exports = {
  loginSchema,
  orderSchema,
  productSchema,
  signupSchema,
};
