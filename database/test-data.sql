-- Sample Test Data for SalesPottery
-- This file contains test data for development and testing

-- Insert sample products
INSERT INTO products (
  sku, name, slug, description, long_description, category_id, base_price,
  height_cm, width_cm, depth_cm, weight_kg,
  material, color, technique,
  is_dishwasher_safe, is_microwave_safe, is_food_safe,
  is_active, is_featured, is_handmade
) VALUES
(
  'BOWL-CER-001', 'Rustic Breakfast Bowl', 'rustic-breakfast-bowl',
  'Perfect bowl for your morning cereal or soup',
  'Hand-thrown ceramic bowl with a beautiful rustic glaze. Each bowl is unique with slight variations in color and texture, making it a true artisan piece.',
  1, 24.99,
  8.5, 15.0, 15.0, 0.45,
  'Stoneware', 'Earth Brown', 'Wheel-thrown',
  1, 1, 1,
  1, 1, 1
),
(
  'BOWL-CER-002', 'Ocean Blue Serving Bowl', 'ocean-blue-serving-bowl',
  'Large serving bowl with stunning ocean blue glaze',
  'This generous serving bowl features a mesmerizing ocean blue glaze that resembles the depths of the sea. Perfect for salads, pasta, or as a centerpiece.',
  1, 39.99,
  10.0, 25.0, 25.0, 1.2,
  'Stoneware', 'Ocean Blue', 'Wheel-thrown',
  1, 1, 1,
  1, 1, 1
),
(
  'PLATE-RND-001', 'Dinner Plate Set Natural', 'dinner-plate-set-natural',
  'Elegant dinner plates with natural earth tones',
  'Set includes one plate. These dinner plates feature a beautiful natural glaze in warm earth tones. Food-safe and durable for everyday use.',
  2, 18.99,
  2.5, 27.0, 27.0, 0.65,
  'Porcelain', 'Natural Beige', 'Cast',
  1, 1, 1,
  1, 0, 1
),
(
  'MUG-HND-001', 'Morning Coffee Mug', 'morning-coffee-mug',
  'Handcrafted mug perfect for your morning coffee',
  'Start your day right with this comfortable, handmade ceramic mug. Features an ergonomic handle and holds 350ml of your favorite beverage.',
  3, 16.99,
  9.0, 8.5, 12.0, 0.35,
  'Stoneware', 'Warm Grey', 'Wheel-thrown',
  1, 1, 1,
  1, 1, 1
),
(
  'VASE-TAL-001', 'Tall Cylindrical Vase', 'tall-cylindrical-vase',
  'Elegant tall vase for flowers and decorative branches',
  'This stunning cylindrical vase stands tall and proud, perfect for displaying long-stemmed flowers or decorative branches. The subtle cream glaze complements any interior.',
  4, 45.00,
  30.0, 12.0, 12.0, 0.8,
  'Stoneware', 'Cream White', 'Wheel-thrown',
  0, 0, 0,
  1, 1, 1
),
(
  'SERV-PLA-001', 'Large Serving Platter', 'large-serving-platter',
  'Spacious platter for entertaining guests',
  'Impress your guests with this beautiful large serving platter. Perfect for appetizers, main courses, or desserts. The subtle glaze variations make each piece unique.',
  5, 52.00,
  3.0, 38.0, 28.0, 1.5,
  'Stoneware', 'Charcoal Grey', 'Hand-built',
  1, 0, 1,
  1, 0, 1
),
(
  'DEC-SCL-001', 'Abstract Sculptural Piece', 'abstract-sculptural-piece',
  'Unique decorative sculpture for your home',
  'This one-of-a-kind sculptural piece adds artistic flair to any space. Handcrafted with attention to detail, it is a conversation starter.',
  6, 89.99,
  22.0, 18.0, 15.0, 1.1,
  'Stoneware', 'Multi-color', 'Hand-sculpted',
  0, 0, 0,
  1, 1, 1
),
(
  'BOWL-CER-003', 'Small Dipping Bowl', 'small-dipping-bowl',
  'Perfect little bowl for sauces and dips',
  'These charming small bowls are ideal for serving sauces, dips, or condiments. Sold individually.',
  1, 12.99,
  4.0, 8.0, 8.0, 0.15,
  'Porcelain', 'Pure White', 'Cast',
  1, 1, 1,
  1, 0, 1
);

-- Insert sample product images (using placeholder URLs)
INSERT INTO product_images (product_id, image_url, thumbnail_url, alt_text, display_order, is_primary) VALUES
(1, '/images/products/bowl-001-main.jpg', '/images/products/bowl-001-thumb.jpg', 'Rustic Breakfast Bowl - Main View', 0, 1),
(1, '/images/products/bowl-001-side.jpg', '/images/products/bowl-001-side-thumb.jpg', 'Rustic Breakfast Bowl - Side View', 1, 0),
(2, '/images/products/bowl-002-main.jpg', '/images/products/bowl-002-thumb.jpg', 'Ocean Blue Serving Bowl', 0, 1),
(3, '/images/products/plate-001-main.jpg', '/images/products/plate-001-thumb.jpg', 'Dinner Plate Natural', 0, 1),
(4, '/images/products/mug-001-main.jpg', '/images/products/mug-001-thumb.jpg', 'Morning Coffee Mug', 0, 1),
(5, '/images/products/vase-001-main.jpg', '/images/products/vase-001-thumb.jpg', 'Tall Cylindrical Vase', 0, 1),
(6, '/images/products/platter-001-main.jpg', '/images/products/platter-001-thumb.jpg', 'Large Serving Platter', 0, 1),
(7, '/images/products/sculpture-001-main.jpg', '/images/products/sculpture-001-thumb.jpg', 'Abstract Sculptural Piece', 0, 1),
(8, '/images/products/bowl-003-main.jpg', '/images/products/bowl-003-thumb.jpg', 'Small Dipping Bowl', 0, 1);

-- Insert inventory for products
INSERT INTO inventory (product_id, quantity, reserved_quantity, low_stock_threshold) VALUES
(1, 5, 0, 2),
(2, 3, 0, 1),
(3, 10, 0, 3),
(4, 8, 0, 2),
(5, 2, 0, 1),
(6, 4, 0, 1),
(7, 1, 0, 1),
(8, 15, 0, 5);
