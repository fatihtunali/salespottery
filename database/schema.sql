-- SalesPottery Database Schema
-- Product Catalog Tables

-- Categories Table
CREATE TABLE IF NOT EXISTS categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  parent_id INT NULL,
  image_url VARCHAR(500),
  display_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
  INDEX idx_slug (slug),
  INDEX idx_parent (parent_id),
  INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Products Table
CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sku VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  long_description LONGTEXT,
  category_id INT NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'EUR',

  -- Dimensions (for pottery - important!)
  height_cm DECIMAL(6, 2),
  width_cm DECIMAL(6, 2),
  depth_cm DECIMAL(6, 2),
  weight_kg DECIMAL(6, 2),

  -- Pottery specific details
  material VARCHAR(100),
  color VARCHAR(100),
  technique VARCHAR(100),
  is_dishwasher_safe BOOLEAN DEFAULT FALSE,
  is_microwave_safe BOOLEAN DEFAULT FALSE,
  is_food_safe BOOLEAN DEFAULT TRUE,

  -- Product status
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_handmade BOOLEAN DEFAULT TRUE,

  -- SEO
  meta_title VARCHAR(255),
  meta_description TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE RESTRICT,
  INDEX idx_sku (sku),
  INDEX idx_slug (slug),
  INDEX idx_category (category_id),
  INDEX idx_active (is_active),
  INDEX idx_featured (is_featured),
  INDEX idx_price (base_price),
  FULLTEXT idx_search (name, description)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Product Images Table
CREATE TABLE IF NOT EXISTS product_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  thumbnail_url VARCHAR(500),
  alt_text VARCHAR(255),
  display_order INT DEFAULT 0,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product (product_id),
  INDEX idx_primary (is_primary),
  INDEX idx_order (display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Inventory Table
CREATE TABLE IF NOT EXISTS inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL UNIQUE,
  quantity INT DEFAULT 0,
  reserved_quantity INT DEFAULT 0,
  available_quantity INT GENERATED ALWAYS AS (quantity - reserved_quantity) STORED,
  low_stock_threshold INT DEFAULT 1,
  restock_date DATE NULL,
  last_restocked_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product (product_id),
  INDEX idx_available (available_quantity)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert some default categories
INSERT INTO categories (name, slug, description, display_order) VALUES
('Bowls', 'bowls', 'Handcrafted ceramic bowls for everyday use', 1),
('Plates', 'plates', 'Beautiful handmade plates and serving dishes', 2),
('Mugs & Cups', 'mugs-cups', 'Coffee mugs, tea cups, and drinkware', 3),
('Vases', 'vases', 'Decorative vases for flowers and plants', 4),
('Serving Dishes', 'serving-dishes', 'Large serving bowls and platters', 5),
('Decorative', 'decorative', 'Decorative pottery and art pieces', 6)
ON DUPLICATE KEY UPDATE name=VALUES(name);
