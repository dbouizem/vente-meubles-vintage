# Déploiement et performance

## Build de production

```bash
npm ci
npm run check
npm run build
npm start
```

En production, Express sert `front/dist`, conserve les routes API et renvoie
`index.html` pour les routes du frontend. `GET /health` permet à la plateforme
de contrôler le processus.

Le frontend utilise la même origine que l'API en production. Pour une API
séparée, définir `VITE_API_URL` au moment du build.

## Docker et Render

Le `Dockerfile` effectue un build multi-étapes et l'image finale ne conserve que
les dépendances de production. `render.yaml` prépare un service Docker ; les
identifiants MySQL doivent être renseignés dans les variables protégées de la
plateforme. Exécuter les migrations avant d'envoyer du trafic :

```bash
npm run migrate --workspace=back
```

## Optimisations

- routes React chargées à la demande ;
- dépendances React, Motion et MUI séparées en chunks stables ;
- images principales converties en WebP ;
- images hors écran chargées avec `loading="lazy"` et décodage asynchrone ;
- audit Lighthouse exécuté sur le build de prévisualisation.

```bash
npm run audit:lh
```
