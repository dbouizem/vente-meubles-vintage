# Migrations backend

Le fichier `back/sql/database.sql` sert seulement a creer la base et l'utilisateur MariaDB.
Les tables et les donnees initiales sont gerees par les migrations dans `back/migrations`.

## Initialiser la base de developpement

Depuis la racine du projet :

```bash
sudo mysql < back/sql/database.sql
npm --prefix back run migrate
```

## Initialiser la base de test

Depuis la racine du projet :

```bash
sudo mysql < back/sql/test-database.sql
npm --prefix back run migrate:test
```

## Lancer les tests d'integration

```bash
npm --prefix back run test:integration
```

## Ajouter une migration

Creer un fichier SQL dans `back/migrations` avec un numero superieur aux migrations existantes :

```text
005_nom_de_la_migration.sql
```

Puis lancer :

```bash
npm --prefix back run migrate
```

Les migrations deja appliquees sont enregistrees dans la table `schema_migrations`.

## Migration du catalogue produit

La migration `005_normalize_product_catalog.sql` renomme et enrichit la table
historique des meubles. Comme elle modifie une table contenant des donnees,
effectuer une sauvegarde avant de l'appliquer en production.

Le nouveau modèle est décrit dans [product-catalog.md](product-catalog.md).
