# Accessibilité et tests frontend

Le frontend vise les critères WCAG 2.1 A et AA couverts par les contrôles
automatisés Axe et par les scénarios Playwright.

## Mesures globales

- langue du document définie en français ;
- titre et description explicites ;
- lien d'évitement vers le contenu principal ;
- focus visible sur liens, boutons, champs et listes ;
- focus transféré au contenu lors d'un changement de route ;
- réduction globale des animations avec `prefers-reduced-motion` ;
- contrôles nommés et utilisables au clavier ;
- annonces `aria-live` sur les quantités et résultats dynamiques.

## Tests

`npm run test:e2e` contrôle l'accessibilité Axe, le clavier, le mouvement réduit,
les principales tailles d'écran et les parcours compte, panier et commande.
L'analyse automatique ne remplace pas une revue manuelle avec lecteur d'écran,
zoom à 200 %, contraste et navigation exclusivement au clavier.
