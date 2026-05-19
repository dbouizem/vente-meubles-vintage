CREATE TABLE IF NOT EXISTS testmeubles (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  titre VARCHAR(255) NOT NULL,
  prix DECIMAL(10,2) NOT NULL,
  description TEXT,
  photo VARCHAR(255) DEFAULT 'img_non_dispo.jpg',
  hauteur VARCHAR(50),
  largeur VARCHAR(50),
  longueur VARCHAR(50),
  disponibilite TINYINT(1) DEFAULT 1,
  categorie VARCHAR(100),
  PRIMARY KEY (id)
);
