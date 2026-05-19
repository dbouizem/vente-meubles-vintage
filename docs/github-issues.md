# Issues GitHub proposees

Ces issues sont pretes a copier-coller dans GitHub pour ameliorer le projet.

## 1. Securiser les requetes SQL vulnerables aux injections

Labels: `bug`, `security`, `backend`, `priority: high`

### Contexte

Certaines requetes SQL concatenent directement des valeurs venant de l'URL.

Fichiers concernes:

- `back/controllers/admin.controllers.js`
- `back/controllers/produit.controllers.js`

Exemples:

```js
const query = "DELETE FROM testmeubles WHERE ID =" + id;
const query = "SELECT DISTINCT * FROM testmeubles WHERE id =" + id;
```

### Objectif

Remplacer toutes les requetes SQL concatenees par des requetes parametrees.

### Taches

- Remplacer `DELETE FROM testmeubles WHERE ID = ${id}` par `DELETE FROM testmeubles WHERE id = ?`.
- Remplacer `SELECT ... WHERE id = ${id}` par `SELECT ... WHERE id = ?`.
- Valider que `id` est bien un nombre.
- Retourner une erreur `400` si l'id est invalide.
- Tester les endpoints `/meubles/:id` et `/admin/:id`.

### Critere d'acceptation

Un id malveillant ne doit jamais etre execute comme SQL.

---

## 2. Hasher les mots de passe utilisateurs avec bcrypt

Labels: `security`, `backend`, `authentication`, `priority: high`

### Contexte

Les mots de passe sont actuellement stockes en clair dans la colonne `mdp`.

Fichier concerne:

- `back/controllers/users.controllers.js`

### Objectif

Ne plus stocker les mots de passe en clair.

### Taches

- Installer `bcrypt`.
- Hasher le mot de passe lors du signup.
- Comparer le mot de passe avec `bcrypt.compare` lors du login.
- Ne jamais logger le mot de passe.
- Ne jamais renvoyer le mot de passe dans une reponse API.

### Critere d'acceptation

La colonne `mdp` contient un hash bcrypt, pas le mot de passe original.

---

## 3. Supprimer la fuite du mot de passe dans la reponse login

Labels: `bug`, `security`, `backend`, `priority: high`

### Contexte

Le endpoint `/login` renvoie actuellement le mot de passe dans le message de succes.

Fichier concerne:

- `back/controllers/users.controllers.js`

Code actuel:

```js
res.status(200).send({ message: `Log in OK : ${email}, ${password}` });
```

### Objectif

Retourner une reponse neutre et sans donnee sensible.

### Taches

- Remplacer le message par `Connexion reussie`.
- Ne pas inclure `password` dans la reponse.
- Ne pas inclure de donnees sensibles utilisateur.

### Critere d'acceptation

La reponse de login ne contient jamais le mot de passe.

---

## 4. Ajouter une authentification pour proteger les routes admin

Labels: `feature`, `security`, `backend`, `frontend`, `priority: high`

### Contexte

Les routes admin sont accessibles sans verification.

Routes concernees:

- `POST /admin/:id`
- `PUT /admin/:id`
- `POST /meubles/create`

Pages concernees:

- `/admin`
- `/create`
- `/modif/:id`

### Objectif

Seuls les utilisateurs autorises doivent pouvoir creer, modifier ou supprimer des produits.

### Taches

- Ajouter un systeme d'authentification simple.
- Ajouter un role admin ou une verification temporaire.
- Proteger les endpoints backend avec un middleware.
- Rediriger les utilisateurs non connectes cote frontend.
- Afficher un message si l'acces est refuse.

### Critere d'acceptation

Un utilisateur non authentifie ne peut pas modifier la base de donnees.

---

## 5. Ajouter une vraie gestion d'erreur backend

Labels: `bug`, `backend`, `quality`, `priority: medium`

### Contexte

Plusieurs controleurs affichent l'erreur en console mais ne repondent pas correctement au client.

Fichiers concernes:

- `back/controllers/users.controllers.js`
- `back/controllers/accueil.controllers.js`
- `back/controllers/admin.controllers.js`
- `back/controllers/produit.controllers.js`

### Objectif

Renvoyer des statuts HTTP coherents en cas d'erreur.

### Taches

- Retourner `500` en cas d'erreur SQL.
- Retourner `404` si un produit demande n'existe pas.
- Retourner `400` si les donnees envoyees sont invalides.
- Eviter `throw error` dans les callbacks Express.

### Critere d'acceptation

Chaque erreur backend renvoie une reponse JSON claire avec le bon status HTTP.

---

## 6. Centraliser l'URL de l'API cote frontend

Labels: `frontend`, `refactor`, `priority: medium`

### Contexte

Les appels API utilisent plusieurs formes de `localhost` directement dans les composants.

Fichiers concernes:

- `front/src/pages/Login/Login.jsx`
- `front/src/pages/Signup/signup.jsx`
- `front/src/pages/Produit/Produit.jsx`
- `front/src/composants/Main/Main.jsx`
- `front/src/composants/Table/Table.jsx`
- `front/src/function/deleteMeuble.js`
- `front/src/function/updateDBMeuble.js`

### Objectif

Utiliser une seule constante pour l'URL backend.

### Taches

- Creer un fichier `front/src/config/api.js`.
- Exporter une constante `API_BASE_URL`.
- Remplacer les URLs dupliquees.
- Utiliser `VITE_HOST` et `VITE_PORT`.

### Critere d'acceptation

Changer le host ou le port backend ne necessite de modifier qu'un seul fichier.

---

## 7. Remplacer les acces DOM directs par du state React

Labels: `frontend`, `refactor`, `priority: medium`

### Contexte

La modification d'un meuble utilise `document.getElementById`, ce qui n'est pas une bonne pratique React.

Fichier concerne:

- `front/src/function/updateDBMeuble.js`
- `front/src/composants/Table/ModifTable.jsx`

### Objectif

Transformer le formulaire de modification en formulaire controle par React.

### Taches

- Ajouter des `useState` pour `titre`, `prix`, `description`, `photo`.
- Initialiser les champs avec les valeurs du produit.
- Supprimer `document.getElementById`.
- Envoyer les donnees depuis l'etat React.

### Critere d'acceptation

La modification d'un produit fonctionne sans acces direct au DOM.

---

## 8. Corriger l'ajout de photo produit

Labels: `feature`, `frontend`, `backend`, `priority: medium`

### Contexte

Le formulaire de creation recupere seulement le nom du fichier image, mais n'envoie pas l'image au backend.

Fichier concerne:

- `front/src/pages/Creation_produit/Create.jsx`

### Objectif

Permettre l'upload reel d'une image produit.

### Taches

- Ajouter `multer` cote backend.
- Creer un endpoint d'upload ou adapter `/meubles/create`.
- Envoyer un `FormData` cote frontend.
- Stocker l'image dans `back/Assets/img_meubles`.
- Enregistrer le nom de fichier en base.

### Critere d'acceptation

Une image selectionnee dans le formulaire apparait bien sur la fiche produit apres creation.

---

## 9. Persister le panier apres rechargement de page

Labels: `feature`, `frontend`, `priority: low`

### Contexte

Le panier est stocke seulement dans un contexte React. Il disparait au rechargement.

Fichiers concernes:

- `front/src/App.jsx`
- `front/src/composants/Detail/Detail.jsx`
- `front/src/pages/Panier/Panier.jsx`

### Objectif

Conserver le panier localement.

### Taches

- Sauvegarder le panier dans `localStorage`.
- Recharger le panier au demarrage de l'application.
- Ajouter une action pour vider le panier.

### Critere d'acceptation

Le panier reste visible apres un refresh navigateur.

---

## 10. Nettoyer les logs, imports inutilises et fichiers obsoletes

Labels: `cleanup`, `frontend`, `backend`, `priority: low`

### Contexte

Le projet contient de nombreux `console.log`, commentaires obsoletes et fichiers anciens.

Exemples:

- `front/src/composants/Main/Main.jsx`
- `front/src/pages/Produit/Produit.jsx`
- `front/src/composants/Table/Table.jsx`
- `back/client/*`

### Objectif

Rendre le code plus propre et plus lisible.

### Taches

- Supprimer les `console.log` non utiles.
- Supprimer les imports inutilises.
- Verifier si `back/client` est encore utilise.
- Nettoyer les commentaires obsoletes.

### Critere d'acceptation

Le code reste fonctionnel et ne contient plus de logs de debug inutiles.

