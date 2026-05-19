INSERT INTO testmeubles
  (id, titre, prix, description, photo, hauteur, largeur, longueur, disponibilite, categorie)
VALUES
  (1, 'Grande table vintage', 180.00, 'Grande table en bois pour salle a manger.', 'grande_table.jpeg', '75', '180', '90', 1, 'table'),
  (2, 'Table basse', 90.00, 'Table basse vintage en bois.', 'table_basse.jpg', '45', '100', '60', 1, 'table'),
  (3, 'Buffet', 240.00, 'Buffet vintage avec rangements.', 'buffet.jpeg', '95', '150', '45', 1, 'rangement'),
  (4, 'Canape', 320.00, 'Canape vintage confortable.', 'canape.jpeg', '85', '200', '90', 1, 'salon'),
  (5, 'Chaise haute', 70.00, 'Chaise haute style retro.', 'chaise_haute.jpeg', '100', '40', '45', 1, 'chaise'),
  (6, 'Table de chevet', 60.00, 'Petite table de chevet vintage.', 'table_chevet.jpeg', '55', '45', '35', 1, 'rangement')
ON DUPLICATE KEY UPDATE
  titre = VALUES(titre),
  prix = VALUES(prix),
  description = VALUES(description),
  photo = VALUES(photo),
  hauteur = VALUES(hauteur),
  largeur = VALUES(largeur),
  longueur = VALUES(longueur),
  disponibilite = VALUES(disponibilite),
  categorie = VALUES(categorie);
