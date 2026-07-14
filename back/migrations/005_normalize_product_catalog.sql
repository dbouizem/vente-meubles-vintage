RENAME TABLE testmeubles TO products;

CREATE TABLE categories (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(120) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_category_name (name),
  UNIQUE KEY unique_category_slug (slug)
);

INSERT INTO categories (name, slug) VALUES
  ('Mobilier', 'mobilier'),
  ('Assises', 'assises'),
  ('Tables', 'tables'),
  ('Rangement', 'rangement'),
  ('Décoration', 'decoration'),
  ('Salon', 'salon'),
  ('Chaises', 'chaises');

INSERT IGNORE INTO categories (name, slug)
SELECT DISTINCT
  CASE
    WHEN categorie IS NULL OR TRIM(categorie) = '' THEN 'Mobilier'
    WHEN LOWER(TRIM(categorie)) = 'table' THEN 'Tables'
    WHEN LOWER(TRIM(categorie)) = 'chaise' THEN 'Chaises'
    WHEN LOWER(TRIM(categorie)) IN ('canape', 'canapé') THEN 'Salon'
    ELSE CONCAT(UPPER(LEFT(TRIM(categorie), 1)), LOWER(SUBSTRING(TRIM(categorie), 2)))
  END,
  CASE
    WHEN categorie IS NULL OR TRIM(categorie) = '' THEN 'mobilier'
    WHEN LOWER(TRIM(categorie)) = 'table' THEN 'tables'
    WHEN LOWER(TRIM(categorie)) = 'chaise' THEN 'chaises'
    WHEN LOWER(TRIM(categorie)) IN ('canape', 'canapé') THEN 'salon'
    ELSE LOWER(REPLACE(TRIM(categorie), ' ', '-'))
  END
FROM products;

ALTER TABLE products
  CHANGE titre title VARCHAR(255) NOT NULL,
  CHANGE prix price DECIMAL(10,2) NOT NULL,
  CHANGE photo primary_image VARCHAR(255) NOT NULL DEFAULT 'img_non_dispo.jpg',
  CHANGE hauteur height DECIMAL(8,2) NULL,
  CHANGE largeur width DECIMAL(8,2) NULL,
  CHANGE longueur depth DECIMAL(8,2) NULL,
  ADD COLUMN slug VARCHAR(280) NULL AFTER title,
  ADD COLUMN sku VARCHAR(50) NULL AFTER slug,
  ADD COLUMN category_id INT UNSIGNED NULL AFTER description,
  ADD COLUMN style VARCHAR(100) NULL AFTER category_id,
  ADD COLUMN period VARCHAR(100) NULL AFTER style,
  ADD COLUMN material VARCHAR(150) NULL AFTER period,
  ADD COLUMN color VARCHAR(100) NULL AFTER material,
  ADD COLUMN condition_label VARCHAR(100) NOT NULL DEFAULT 'Bon état vintage' AFTER color,
  ADD COLUMN weight DECIMAL(8,2) NULL AFTER depth,
  ADD COLUMN stock INT UNSIGNED NOT NULL DEFAULT 1 AFTER weight,
  ADD COLUMN status ENUM('draft', 'published', 'sold') NOT NULL DEFAULT 'published' AFTER stock,
  ADD COLUMN created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP AFTER status,
  ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at;

UPDATE products p
JOIN categories c ON c.slug = CASE
  WHEN p.categorie IS NULL OR TRIM(p.categorie) = '' THEN 'mobilier'
  WHEN LOWER(TRIM(p.categorie)) = 'table' THEN 'tables'
  WHEN LOWER(TRIM(p.categorie)) = 'chaise' THEN 'chaises'
  WHEN LOWER(TRIM(p.categorie)) IN ('canape', 'canapé') THEN 'salon'
  ELSE LOWER(REPLACE(TRIM(p.categorie), ' ', '-'))
END
SET p.category_id = c.id;

UPDATE products
SET
  slug = CONCAT('produit-', id),
  sku = CONCAT('VH-', LPAD(id, 6, '0')),
  stock = CASE WHEN disponibilite = 1 THEN 1 ELSE 0 END,
  status = CASE WHEN disponibilite = 1 THEN 'published' ELSE 'sold' END;

ALTER TABLE products
  MODIFY slug VARCHAR(280) NOT NULL,
  MODIFY sku VARCHAR(50) NOT NULL,
  MODIFY category_id INT UNSIGNED NOT NULL,
  ADD UNIQUE KEY unique_product_slug (slug),
  ADD UNIQUE KEY unique_product_sku (sku),
  ADD KEY index_products_category (category_id),
  ADD KEY index_products_status (status),
  ADD CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id),
  DROP COLUMN categorie,
  DROP COLUMN disponibilite;

CREATE TABLE product_images (
  id INT UNSIGNED NOT NULL AUTO_INCREMENT,
  product_id INT UNSIGNED NOT NULL,
  filename VARCHAR(255) NOT NULL,
  alt_text VARCHAR(255) NULL,
  position INT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY index_product_images_product (product_id),
  CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

INSERT INTO product_images (product_id, filename, alt_text, position)
SELECT id, primary_image, title, 0
FROM products
WHERE primary_image IS NOT NULL AND primary_image <> '';
