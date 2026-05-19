<div align="center">
  <h1 align="center">
    <br>Projet Collectif - Vente de Meubles Vintage
  </h1>

  <h3>◦ Développé avec les logiciels et outils ci-dessous.</h3>

  <p align="center">
    <img src="https://img.shields.io/badge/SVG-FFB13B.svg?style&logo=SVG&logoColor=black" alt="SVG" />
    <img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style&logo=JavaScript&logoColor=black" alt "JavaScript" />
    <img src="https://img.shields.io/badge/HTML5-E34F26.svg?style&logo=HTML5&logoColor=white" alt="HTML5" />
    <img src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style&logo=PostCSS&logoColor=white" alt="PostCSS" />
    <img src="https://img.shields.io/badge/Autoprefixer-DD3735.svg?style&logo=Autoprefixer&logoColor=white" alt="Autoprefixer" />
    <img src="https://img.shields.io/badge/Jest-C21325.svg?style&logo=Jest&logoColor=white" alt="Jest" />
    <img src="https://img.shields.io/badge/Bootstrap-7952B3.svg?style&logo=Bootstrap&logoColor=white" alt="Bootstrap" />
    <img src="https://img.shields.io/badge/Nodemon-76D04B.svg?style&logo=Nodemon&logoColor=white" alt="Nodemon" />
    <img src="https://img.shields.io/badge/Vite-646CFF.svg?style&logo=Vite&logoColor=white" alt="Vite" />

  </p>
  <img src="https://img.shields.io/github/license/DjihaneB/projet-collectif---vente-de-meubles-vintage_project?style&color=5D6D7E" alt="Licence GitHub" />
  <img src="https://img.shields.io/github/last-commit/DjihaneB/projet-collectif---vente-de-meubles-vintage_project?style&color=5D6D7E" alt="Dernier commit Git" />
  <img src="https://img.shields.io/github/commit-activity/m/DjihaneB/projet-collectif---vente-de-meubles-vintage_project?style&color=5D6D7E" alt="Activité des commits GitHub" />
  <img src="https://img.shields.io/github/languages/top/DjihaneB/projet-collectif---vente-de-meubles-vintage_project?style&color=5D6D7E" alt "Langage le plus utilisé sur GitHub" />
</div>

---

## 📖 Table des matières
- [📦 Fonctionnalités](#-fonctionnalités)
- [📽️ Démo](#-démo)
- [📂 Structure du Répertoire](#-structure-du-répertoire)
- [⚙️ Modules](#-modules)
- [🚀 Installation des Modules](#-installation-des-modules)
- [💾 Télécharger la Base de Données](#-télécharger-la-base-de-données)
- [🔧 Vérifier la Configuration Backend](#-vérifier-la-configuration-backend)
- [🔧 Vérifier la Configuration Frontend](#-vérifier-la-configuration-frontend)
- [🚀 Lancer les Serveurs et l'Application](#-lancer-les-serveurs-et-lapplication)
- [🤝 Contribution](#-contribution)

---

## 📦 Fonctionnalités

> - [X] Enregistrement des utilisateurs : Les utilisateurs peuvent créer un compte et se connecter.
> - [X] Ajout de produits au panier : Les utilisateurs peuvent ajouter des produits à leur panier d'achat.
> - [X] Gestion des produits : Les administrateurs peuvent ajouter, modifier et supprimer des produits depuis la page d'administration.
> - [X] Profil utilisateur : Les utilisateurs peuvent consulter et mettre à jour leur profil.
 
> - [ ] Nous prévoyons d'ajouter les fonctionnalités suivantes dans les futures versions :
> - [ ] Paiement en ligne : Intégration d'un système de paiement en ligne pour finaliser les achats.
> - [ ] Filtrage des produits : Ajout de fonctionnalités de filtrage pour faciliter la recherche de produits.

---

## 📽️ Démo

Découvrez le projet en action grâce à ces vidéos de démonstration :

- [Vidéo 1](https://imgur.com/y6JU2cr)

  
- [Vidéo 2](https://imgur.com/zBMGkU2)
  

- [Vidéo 3]()

  
- [Vidéo 4]()

---

## 📂 Structure du Répertoire

```sh
└── projet-collectif---vente-de-meubles-vintage_project/
    ├── .gitignore
    ├── README.md
    ├── back/
    │   ├── Assets/
    │   ├── app.js
    │   ├── client/
    │   ├── controllers/
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── routes/
    │   ├── serveur.js
    │   └── sql/
    ├── front/
    │   ├── .eslintrc.cjs
    │   ├── .gitignore
    │   ├── index.html
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── postcss.config.js
    │   ├── public/
    │   ├── src/
    │   ├── tailwind.config.js
    ├── package-lock.json
    └── package.json

```

## ⚙️ Modules

<details closed>
<summary>Front</summary>

- `.gitignore`: Fichier pour ignorer les fichiers dans le projet.
- `package.json`: Informations du projet.
- `tailwind.config.js`: Configuration Tailwind CSS.
- `.eslintrc.cjs`: Configuration ESLint.
- `index.html`: Page d'accueil HTML.
- `vite.config.js`: Configuration Vite.
- `postcss.config.js`: Configuration PostCSS.

</details>

---

## 🚀 Installation des Modules

Assurez-vous d'installer les bibliothèques et modules nécessaires pour le projet en suivant ces étapes :

| Dossier               | Commande                                  |
|---------------------- |------------------------------------------ |
| 📁 Projet Principal   |  `npm install`                           |
| 📂 Backend            | `cd back` -> `npm install`               |
| 📂 Frontend           | `cd front` -> `npm install`              |

Cela garantira que toutes les parties du projet ont leurs dépendances correctement installées pour un fonctionnement sans problème.

---

## 💾 Télécharger la Base de Données

Pour obtenir la base de données nécessaire, suivez ces étapes :

1. Récupérez le fichier `database.sql` du dossier `/back/sql`. Ce fichier sera utilisé pour créer la base de données via phpMyAdmin.

2. Importez le fichier `database.sql` dans phpMyAdmin pour créer la base de données "vente_meubles" avec au moins les tables "testmeubles" et "test_users".

---

## 🔧 Vérifier la Configuration Backend

Au cas où le fichier `.env` n'existe pas déjà à la racine du projet, créez-le. Remplissez ce fichier avec les paramètres de connexion à la base de données, le mot de passe et le port :

```bash
PASSWORD='root'
PORT_BDD=3306
PORT=3000
HOST='http://localhost'
```

Le mot de passe peut varier en fonction de votre configuration phpMyAdmin (par exemple, 'root', vide, etc.). Le port de la base de données est différent entre les systèmes Mac (8889) et Windows (3306).

---

## 🔧 Vérifier la Configuration Frontend

Au cas où le fichier `.env` n'existe pas déjà à la racine du dossier `/front`, créez-le. Assurez-vous que les informations suivantes sont correctes :

```bash
VITE_PORT=3000
VITE_HOST='http://localhost'
```

---

## 🚀 Lancer les Serveurs et l'Application

Pour exécuter le projet, suivez ces étapes :

1. Lancez le serveur MySQL qui héberge votre base de données (par exemple, via MAMP).

2. Ouvrez un premier terminal, allez dans le dossier `/back` et lancez le serveur avec la commande :

```bash
nodemon
```

Vous devriez voir les messages suivants dans la console :

```bash
[nodemon] 2.0.22
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json
[nodemon] starting `node serveur.js`
Listening on port 3000
Connecté à la base de données MySQL
```

3. Ouvrez un deuxième terminal, allez dans le dossier `/front` et lancez l'application avec la commande :

```bash
npm run dev
```

Vous devriez voir les messages suivants dans la console, indiquant que l'application est prête à être utilisée :

```bash
> front@0.0.0 dev
> vite

  VITE v4.3.9  ready in 1158 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

Vous pouvez appuyer sur la touche "o" ou cliquer sur le lien (par exemple : http://localhost:5173/) pour ouvrir le site.

---

## 🤝 Contribution

Les contributions sont toujours les bienvenues ! Veuillez suivre ces étapes :

Dupliquez le référentiel du projet. Cela crée une copie du projet sur votre compte que vous pouvez modifier sans affecter le projet d'origine.
Clonez le référentiel dupliqué sur votre machine locale en utilisant un client Git comme Git ou GitHub Desktop.
Créez une nouvelle branche avec un nom descriptif (par exemple, nouvelle-branche-de-fonctionnalité ou correctif-bogue-123).
```sh
git checkout -b nouvelle-branche-de-fonctionnalité
```

Effectuez des modifications dans le code du projet.
Validez vos modifications dans votre branche locale avec un message de validation clair expliquant les modifications que vous avez apportées.
```sh
git commit -m 'Implémentation de la nouvelle fonctionnalité.'
```

Poussez vos modifications vers votre référentiel dupliqué sur GitHub en utilisant la commande suivante :
```sh
git push origin nouvelle-branche-de-fonctionnalité


