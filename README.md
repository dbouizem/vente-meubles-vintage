# Vente de meubles vintage

Application e-commerce composée d'un frontend React/Vite et d'une API Express/MySQL.

## Prérequis

- Node.js 20 ou plus récent
- npm 10 ou plus récent
- MySQL ou MariaDB

Vérification :

```bash
node --version
npm --version
```

## Installation

Depuis la racine du dépôt, une seule commande installe le frontend, le backend et les outils de développement :

```bash
npm install
```

Le dépôt utilise les workspaces npm `front` et `back`. Il ne faut pas lancer une installation séparée dans chaque dossier.

## Configuration

Copier les fichiers d'exemple :

```bash
cp .env.example .env
cp front/.env.example front/.env
```

Modifier ensuite `.env` avec les identifiants de votre base MySQL. La variable `AUTH_SECRET` doit contenir une valeur longue et aléatoire en dehors du développement local.

Variables backend principales :

```env
DB_HOST=localhost
DB_NAME=vente_meubles
USER_BDD=vente_user
PASSWORD=vente_pass
PORT_BDD=3306
PORT=3000
AUTH_SECRET=replace-with-a-long-random-secret
CORS_ORIGIN=http://localhost:5173
```

Variables frontend :

```env
VITE_HOST=http://localhost
VITE_PORT=3000
```

Les fichiers `.env` sont ignorés par Git. Seuls les fichiers `.env.example` doivent être versionnés.

## Base de données

Créer la base et son utilisateur :

```bash
sudo mysql < back/sql/database.sql
```

Appliquer ensuite les migrations :

```bash
npm run migrate --workspace=back
```

Les migrations créent les tables et les données initiales. Les détails sont disponibles dans [docs/backend-migrations.md](docs/backend-migrations.md).
Le modèle normalisé du catalogue est décrit dans [docs/product-catalog.md](docs/product-catalog.md).

## Lancement en développement

Lancer le frontend et l'API ensemble :

```bash
npm run dev
```

Adresses locales :

- Boutique : <http://localhost:5173/accueil>
- Connexion : <http://localhost:5173/>
- API : <http://localhost:3000>

Pour lancer une seule application :

```bash
npm run dev:front
npm run dev:back
```

Le mode développement utilise la surveillance par polling pour éviter l'erreur Linux `ENOSPC: System limit for number of file watchers reached`.

## Qualité et tests

Commandes disponibles depuis la racine :

```bash
npm run lint          # ESLint sur le frontend et le backend
npm run format        # Formate les fichiers avec Prettier
npm run format:check  # Vérifie le formatage sans modifier les fichiers
npm test              # Tests unitaires backend sans base de données
npm run build         # Build de production du frontend
npm run check         # Lint, build et tests unitaires
```

Tests complémentaires :

```bash
npm run test:integration
npm run test:e2e
```

Les tests d'intégration nécessitent une base de test configurée. Les tests E2E nécessitent les navigateurs Playwright.

## Structure

```text
.
├── back/                 API Express, migrations et tests backend
├── front/                Application React/Vite et tests UX
├── docs/                 Documentation technique
├── .github/workflows/    Intégration continue
├── .env.example          Configuration backend de référence
└── package.json          Scripts et workspaces du projet
```

Le frontend est organisé par responsabilité :

```text
front/src/
├── app/                  Routeur, providers et protection des routes
├── components/layout/    Navigation et pied de page partagés
├── features/admin/       Gestion des produits
├── features/cart/        État et composants du panier
├── features/catalog/     Catalogue et composants produit
├── layouts/              Structures boutique et administration
├── pages/                Points d'entrée des routes
└── services/             Accès centralisé à l'API
```

## Intégration continue

Le workflow GitHub Actions exécute automatiquement sur chaque push et pull request :

1. l'installation reproductible avec `npm ci` ;
2. ESLint ;
3. les tests unitaires backend ;
4. le build frontend.

Une contribution ne doit pas être fusionnée si l'une de ces vérifications échoue.

## Fonctionnalités actuelles

- Inscription et connexion utilisateur
- Authentification et protection des opérations administrateur
- Consultation des meubles et de leur fiche
- Recherche, catégories, filtres de prix, tri et pagination du catalogue
- Panier conservé dans le navigateur
- Quantités du panier limitées par le stock, sous-totaux et total automatiques
- Réservations transactionnelles avec contrôle du stock et confirmation
- Création, modification et suppression de produits par un administrateur

Le paiement en ligne, le profil utilisateur, les favoris et les filtres avancés ne sont pas encore finalisés.
