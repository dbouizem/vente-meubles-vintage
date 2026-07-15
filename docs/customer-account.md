# Espace client

La migration `008_create_customer_accounts.sql` complète les profils et crée
les tables `favorites` et `password_reset_tokens`.

- Chaque connexion réussie produit un JWT, y compris pour un utilisateur non
  administrateur.
- Les routes `/account/*` nécessitent ce jeton et utilisent exclusivement son
  identifiant pour accéder au profil et aux favoris.
- L'historique inclut les commandes rattachées au compte et les anciennes
  commandes passées avec la même adresse e-mail.
- Les jetons de réinitialisation expirent après 30 minutes, ne sont utilisables
  qu'une fois et ne sont stockés qu'après hachage SHA-256.

En développement, l'API retourne le jeton de réinitialisation afin de permettre
un test local sans service d'e-mail. En production, il doit être transmis par un
fournisseur d'e-mail et n'est jamais inclus dans la réponse HTTP.
