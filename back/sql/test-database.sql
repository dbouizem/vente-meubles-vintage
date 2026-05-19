CREATE DATABASE IF NOT EXISTS vente_meubles_test
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'vente_user'@'localhost' IDENTIFIED BY 'vente_pass';
GRANT ALL PRIVILEGES ON vente_meubles_test.* TO 'vente_user'@'localhost';
FLUSH PRIVILEGES;
