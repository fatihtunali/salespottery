import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;

    const productQuery = `
      SELECT
        p.*,
        c.name as category_name,
        COALESCE(i.quantity, 0) as stock_quantity,
        COALESCE(i.available_quantity, 0) as available_quantity,
        COALESCE(i.low_stock_threshold, 5) as low_stock_threshold
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN inventory i ON p.id = i.product_id
      WHERE p.id = ?
    `;

    const products = await query(productQuery, [id]) as any[];

    if (products.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Get images
    const imagesQuery = `SELECT * FROM product_images WHERE product_id = ? ORDER BY display_order`;
    const images = await query(imagesQuery, [id]) as any[];

    return NextResponse.json({
      product: products[0],
      images,
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Failed to get product', message: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update product
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();

    const {
      sku,
      name,
      slug,
      description,
      long_description,
      category_id,
      base_price,
      height_cm,
      width_cm,
      depth_cm,
      weight_kg,
      material,
      color,
      technique,
      is_dishwasher_safe,
      is_microwave_safe,
      is_food_safe,
      is_active,
      is_featured,
      is_handmade,
      meta_title,
      meta_description,
      quantity,
    } = body;

    // Update product
    const updateQuery = `
      UPDATE products SET
        sku = ?,
        name = ?,
        slug = ?,
        description = ?,
        long_description = ?,
        category_id = ?,
        base_price = ?,
        height_cm = ?,
        width_cm = ?,
        depth_cm = ?,
        weight_kg = ?,
        material = ?,
        color = ?,
        technique = ?,
        is_dishwasher_safe = ?,
        is_microwave_safe = ?,
        is_food_safe = ?,
        is_active = ?,
        is_featured = ?,
        is_handmade = ?,
        meta_title = ?,
        meta_description = ?
      WHERE id = ?
    `;

    await query(updateQuery, [
      sku, name, slug, description, long_description, category_id, base_price,
      height_cm, width_cm, depth_cm, weight_kg,
      material, color, technique,
      is_dishwasher_safe ? 1 : 0,
      is_microwave_safe ? 1 : 0,
      is_food_safe ? 1 : 0,
      is_active ? 1 : 0,
      is_featured ? 1 : 0,
      is_handmade ? 1 : 0,
      meta_title,
      meta_description,
      id,
    ]);

    // Update inventory if quantity provided
    if (quantity !== undefined && quantity !== null) {
      // Check if inventory exists
      const inventoryCheck = await query('SELECT id FROM inventory WHERE product_id = ?', [id]) as any[];

      if (inventoryCheck.length > 0) {
        await query(
          'UPDATE inventory SET quantity = ?, available_quantity = ? WHERE product_id = ?',
          [quantity, quantity, id]
        );
      } else {
        await query(
          'INSERT INTO inventory (product_id, quantity, reserved_quantity, available_quantity, low_stock_threshold) VALUES (?, ?, 0, ?, 5)',
          [id, quantity, quantity]
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Failed to update product', message: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete product
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();

    const { id } = await params;

    // Delete product (cascade will handle images and inventory)
    await query('DELETE FROM products WHERE id = ?', [id]);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product', message: error.message },
      { status: 500 }
    );
  }
}
