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

Cette phase ne collecte ni adresse de livraison ni paiement. Ces étapes restent
réservées au prochain découpage du tunnel de commande.
