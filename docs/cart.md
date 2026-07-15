# Panier

Le panier est centralisé dans `CartContext` et conservé dans le stockage local
sous la clé `panier`.

Chaque ligne contient un identifiant produit unique, le prix unitaire, le stock
connu et une quantité. Les anciennes données sans quantité sont automatiquement
normalisées lors de leur chargement.

## Règles

- ajouter plusieurs fois le même produit augmente sa quantité sans créer de
  doublon ;
- la quantité reste comprise entre 1 et le stock disponible ;
- une suppression utilise l'identifiant du produit et non sa position visuelle ;
- le nombre affiché dans la navigation est la somme des quantités ;
- les sous-totaux et le total sont dérivés du prix et des quantités ;
- une remise ne peut jamais produire un total négatif.

Le passage de commande reste volontairement désactivé jusqu'à la phase dédiée
au système de commandes.
