-- Update product images with free Unsplash images
-- These are all free to use for commercial purposes

-- Update Bowl 1 - Rustic Breakfast Bowl
UPDATE product_images SET
    image_url = 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800',
    thumbnail_url = 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400'
WHERE product_id = 1 AND display_order = 0;

-- Update Bowl 2 - Ocean Blue Serving Bowl
UPDATE product_images SET
    image_url = 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
    thumbnail_url = 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400'
WHERE product_id = 2 AND display_order = 0;

-- Update Plate - Dinner Plate
UPDATE product_images SET
    image_url = 'https://images.unsplash.com/photo-1574000339642-f60b8b7a824f?w=800',
    thumbnail_url = 'https://images.unsplash.com/photo-1574000339642-f60b8b7a824f?w=400'
WHERE product_id = 3 AND display_order = 0;

-- Update Mug - Morning Coffee Mug
UPDATE product_images SET
    image_url = 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800',
    thumbnail_url = 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400'
WHERE product_id = 4 AND display_order = 0;

-- Update Vase - Tall Cylindrical Vase
UPDATE product_images SET
    image_url = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800',
    thumbnail_url = 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400'
WHERE product_id = 5 AND display_order = 0;

-- Update Serving Platter
UPDATE product_images SET
    image_url = 'https://images.unsplash.com/photo-1610390426394-73b9c8bf0a92?w=800',
    thumbnail_url = 'https://images.unsplash.com/photo-1610390426394-73b9c8bf0a92?w=400'
WHERE product_id = 6 AND display_order = 0;

-- Update Decorative Piece
UPDATE product_images SET
    image_url = 'https://images.unsplash.com/photo-1610390426619-6ff05327ea43?w=800',
    thumbnail_url = 'https://images.unsplash.com/photo-1610390426619-6ff05327ea43?w=400'
WHERE product_id = 7 AND display_order = 0;

-- Update Small Dipping Bowl
UPDATE product_images SET
    image_url = 'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=800',
    thumbnail_url = 'https://images.unsplash.com/photo-1581349485608-9469926a8e5e?w=400'
WHERE product_id = 8 AND display_order = 0;
