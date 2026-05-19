CREATE DATABASE IF NOT EXISTS vente_meubles
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'vente_user'@'localhost' IDENTIFIED BY 'vente_pass';
GRANT ALL PRIVILEGES ON vente_meubles.* TO 'vente_user'@'localhost';
FLUSH PRIVILEGES;

USE vente_meubles;

CREATE TABLE IF NOT EXISTS test_users (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  mdp VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY unique_email (email)
);

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

INSERT INTO testmeubles
  (titre, prix, description, photo, hauteur, largeur, longueur, disponibilite, categorie)
VALUES
  ('Grande table vintage', 180.00, 'Grande table en bois pour salle a manger.', 'grande_table.jpeg', '75', '180', '90', 1, 'table'),
  ('Table basse', 90.00, 'Table basse vintage en bois.', 'table_basse.jpg', '45', '100', '60', 1, 'table'),
  ('Buffet', 240.00, 'Buffet vintage avec rangements.', 'buffet.jpeg', '95', '150', '45', 1, 'rangement'),
  ('Canape', 320.00, 'Canape vintage confortable.', 'canape.jpeg', '85', '200', '90', 1, 'salon'),
  ('Chaise haute', 70.00, 'Chaise haute style retro.', 'chaise_haute.jpeg', '100', '40', '45', 1, 'chaise'),
  ('Table de chevet', 60.00, 'Petite table de chevet vintage.', 'table_chevet.jpeg', '55', '45', '35', 1, 'rangement')
ON DUPLICATE KEY UPDATE titre = VALUES(titre);
