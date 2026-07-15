ALTER TABLE orders
  ADD COLUMN address_line1 VARCHAR(255) NOT NULL AFTER customer_email,
  ADD COLUMN address_line2 VARCHAR(255) NULL AFTER address_line1,
  ADD COLUMN postal_code VARCHAR(20) NOT NULL AFTER address_line2,
  ADD COLUMN city VARCHAR(120) NOT NULL AFTER postal_code,
  ADD COLUMN country VARCHAR(100) NOT NULL DEFAULT 'France' AFTER city,
  ADD COLUMN delivery_method ENUM('home_delivery', 'store_pickup') NOT NULL AFTER country,
  ADD COLUMN payment_method ENUM('pay_on_delivery', 'bank_transfer') NOT NULL AFTER delivery_method;
