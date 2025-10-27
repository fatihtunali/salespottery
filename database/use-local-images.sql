-- Update product images to use local images from public/images/products

-- Product 1: Rustic Breakfast Bowl - canak1.jpg
UPDATE product_images SET
    image_url = '/images/products/canak1.jpg',
    thumbnail_url = '/images/products/canak1.jpg'
WHERE product_id = 1 AND display_order = 0;

-- Product 2: Ocean Blue Serving Bowl - canak2.jpg
UPDATE product_images SET
    image_url = '/images/products/canak2.jpg',
    thumbnail_url = '/images/products/canak2.jpg'
WHERE product_id = 2 AND display_order = 0;

-- Product 3: Dinner Plate - tabak.jpg
UPDATE product_images SET
    image_url = '/images/products/tabak.jpg',
    thumbnail_url = '/images/products/tabak.jpg'
WHERE product_id = 3 AND display_order = 0;

-- Product 4: Morning Coffee Mug - canak3.jpg
UPDATE product_images SET
    image_url = '/images/products/canak3.jpg',
    thumbnail_url = '/images/products/canak3.jpg'
WHERE product_id = 4 AND display_order = 0;

-- Product 5: Tall Cylindrical Vase - canak4.jpg
UPDATE product_images SET
    image_url = '/images/products/canak4.jpg',
    thumbnail_url = '/images/products/canak4.jpg'
WHERE product_id = 5 AND display_order = 0;

-- Product 6: Large Serving Platter - canak5.jpg
UPDATE product_images SET
    image_url = '/images/products/canak5.jpg',
    thumbnail_url = '/images/products/canak5.jpg'
WHERE product_id = 6 AND display_order = 0;

-- Product 7: Abstract Sculptural Piece - canak1.jpg (reuse)
UPDATE product_images SET
    image_url = '/images/products/canak1.jpg',
    thumbnail_url = '/images/products/canak1.jpg'
WHERE product_id = 7 AND display_order = 0;

-- Product 8: Small Dipping Bowl - canak2.jpg (reuse)
UPDATE product_images SET
    image_url = '/images/products/canak2.jpg',
    thumbnail_url = '/images/products/canak2.jpg'
WHERE product_id = 8 AND display_order = 0;
