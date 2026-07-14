# Recherche et navigation dans le catalogue

La boutique utilise `GET /catalog` pour effectuer les recherches côté serveur.
L'ancienne route `GET /meubles` reste disponible pour les usages qui ont besoin
de la liste publique complète.

## Paramètres disponibles

| Paramètre                | Description                                           |
| ------------------------ | ----------------------------------------------------- |
| `q`                      | Recherche dans le titre, la description et la matière |
| `category`               | Slug d'une catégorie                                  |
| `min_price`, `max_price` | Fourchette de prix positive                           |
| `sort`                   | `newest`, `price_asc`, `price_desc` ou `name_asc`     |
| `page`                   | Page demandée, à partir de 1                          |
| `limit`                  | Nombre d'éléments, limité à 24 maximum                |

Exemple :

```text
GET /catalog?q=table&category=tables&sort=price_asc&page=1&limit=6
```

La réponse contient `items` et un objet `pagination` avec la page courante, la
limite, le nombre total de résultats et le nombre total de pages. Tous les
filtres utilisent des paramètres SQL et les choix de tri sont limités à une
liste autorisée.
