# Modèle du catalogue produit

La migration `005_normalize_product_catalog.sql` remplace l'ancienne table
`testmeubles` par un catalogue structuré autour de trois tables.

## Tables

- `products` contient l'identité commerciale, le prix, la description, les
  caractéristiques, les dimensions, le stock et le statut de publication.
- `categories` centralise les catégories et leur slug stable.
- `product_images` permet d'associer plusieurs images ordonnées à un produit.

Les anciennes données sont conservées par la migration : chaque meuble reçoit
une catégorie, un slug, un SKU, un stock et un statut. L'image historique est
également copiée dans `product_images`.

## Champs métier principaux

| API                              | Base de données                        | Rôle                           |
| -------------------------------- | -------------------------------------- | ------------------------------ |
| `titre`                          | `title`                                | Nom affiché du produit         |
| `prix`                           | `price`                                | Prix décimal                   |
| `categorie`                      | `category_id`                          | Slug de la catégorie liée      |
| `style`, `epoque`                | `style`, `period`                      | Classification du meuble       |
| `matiere`, `couleur`, `etat`     | `material`, `color`, `condition_label` | Caractéristiques visibles      |
| `hauteur`, `largeur`, `longueur` | `height`, `width`, `depth`             | Dimensions en centimètres      |
| `poids`                          | `weight`                               | Poids en kilogrammes           |
| `stock`                          | `stock`                                | Quantité disponible            |
| `status`                         | `status`                               | `draft`, `published` ou `sold` |

L'API garde actuellement les noms français afin de ne pas casser le frontend.
Les noms SQL sont normalisés en anglais et les conversions sont regroupées dans
`back/models/product.model.js`.

## Règles d'affichage

- La boutique publique ne retourne que les produits au statut `published`.
- Un produit est disponible lorsque son statut est `published` et son stock est
  supérieur à zéro.
- L'administration peut créer un brouillon, publier un produit ou le marquer
  comme vendu.
- Les catégories publiques sont disponibles avec `GET /categories`.
- L'administration utilise les routes protégées `GET /admin/products` et
  `GET /admin/products/:id` afin de gérer aussi les brouillons et produits vendus.

## Appliquer la migration

Sauvegarder la base avant la première exécution, puis lancer depuis la racine :

```bash
npm run migrate --workspace=back
```

Les migrations appliquées sont enregistrées dans `schema_migrations` et ne sont
pas rejouées lors des exécutions suivantes.
