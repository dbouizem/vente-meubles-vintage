# Système de commandes

La migration `006_create_orders.sql` crée les tables `orders` et `order_items`.
Une commande conserve les coordonnées de contact, son statut, ses montants et
un jeton de confirmation non séquentiel. Chaque ligne conserve un instantané du
nom, du SKU et du prix du produit au moment de la réservation.

## Création

`POST /orders` reçoit le nom, l'e-mail, le code promotionnel éventuel et les
paires `productId` / `quantity`. Le serveur :

1. fusionne les doublons du panier ;
2. verrouille les produits avec `FOR UPDATE` ;
3. contrôle leur publication et leur stock ;
4. recalcule les prix, la remise et le total depuis la base ;
5. crée la commande et ses lignes ;
6. décrémente le stock et marque un produit vendu si nécessaire ;
7. valide toutes les opérations dans une seule transaction.

En cas de produit absent, indisponible ou de stock insuffisant, aucune donnée
n'est modifiée.

## Confirmation

`GET /orders/:token` retourne le récapitulatif associé à un jeton UUID. Le
frontend utilise cette route sur `/commande/:token`. Le numéro de commande seul
ne permet donc pas de consulter les coordonnées d'un client.

## Tunnel de commande

Le frontend sépare le parcours en quatre routes :

1. `/panier` pour les articles, quantités et promotions ;
2. `/commande/livraison` pour le contact, l'adresse et le mode de livraison ;
3. `/commande/paiement` pour choisir un paiement hors ligne et valider ;
4. `/commande/:token` pour la confirmation persistante.

Les données intermédiaires sont conservées dans `sessionStorage` et supprimées
après une commande réussie. Aucune coordonnée bancaire n'est collectée : les
modes proposés sont le paiement à la livraison/retrait ou le virement après
confirmation.
