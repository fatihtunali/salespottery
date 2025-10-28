-- Migration Script: Transform E-commerce to Wholesale Catalog
-- Date: 2025-10-28
-- Purpose: Remove cart/order system, add inquiry tracking

-- =====================================================
-- STEP 1: Create Inquiries Table
-- =====================================================

CREATE TABLE IF NOT EXISTS inquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50),
  company_name VARCHAR(255),
  quantity INT NOT NULL,
  message TEXT,
  status ENUM('new', 'contacted', 'quoted', 'closed') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_status (status),
  INDEX idx_created_at (created_at),
  INDEX idx_product_id (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================
-- STEP 2: Remove Cart and Order Tables
-- =====================================================

-- Drop cart_items first (has foreign key to cart)
DROP TABLE IF EXISTS cart_items;

-- Drop cart table
DROP TABLE IF EXISTS cart;

-- Drop order_items first (has foreign key to orders)
DROP TABLE IF EXISTS order_items;

-- Drop orders table
DROP TABLE IF EXISTS orders;

-- =====================================================
-- STEP 3: Verification
-- =====================================================

-- Show remaining tables
SHOW TABLES;

-- Show inquiries table structure
DESCRIBE inquiries;

-- =====================================================
-- NOTES:
-- =====================================================
-- Minimum order quantity (50 pieces) will be enforced in application code
-- Contact details: +905325858786, fatihtunali@gmail.com
-- Prices will be hidden from product display but kept in database for reference
