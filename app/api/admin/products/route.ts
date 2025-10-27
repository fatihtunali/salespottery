import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

// GET all products for admin
export async function GET(request: NextRequest) {
  try {
    await requireAdmin();

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const category = searchParams.get('category');
    const isActive = searchParams.get('is_active');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    let whereConditions: string[] = [];
    let params: any[] = [];

    if (search) {
      whereConditions.push('(p.name LIKE ? OR p.sku LIKE ? OR p.description LIKE ?)');
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    if (category) {
      whereConditions.push('p.category_id = ?');
      params.push(category);
    }

    if (isActive !== null && isActive !== undefined && isActive !== '') {
      whereConditions.push('p.is_active = ?');
      params.push(isActive === 'true' ? 1 : 0);
    }

    const whereClause = whereConditions.length > 0
      ? 'WHERE ' + whereConditions.join(' AND ')
      : '';

    // Get products with category name and inventory
    const productsQuery = `
      SELECT
        p.*,
        c.name as category_name,
        COALESCE(i.quantity, 0) as stock_quantity,
        COALESCE(i.available_quantity, 0) as available_quantity,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = TRUE LIMIT 1) as primary_image
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN inventory i ON p.id = i.product_id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const products = await query(productsQuery, params) as any[];

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM products p
      ${whereClause}
    `;
    const countResult = await query(countQuery, params) as any[];
    const total = countResult[0].total;

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.error('Get admin products error:', error);
    return NextResponse.json(
      { error: 'Failed to get products', message: error.message },
      { status: 500 }
    );
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    await requireAdmin();

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
      initial_quantity,
    } = body;

    // Insert product
    const productQuery = `
      INSERT INTO products (
        sku, name, slug, description, long_description, category_id, base_price, currency,
        height_cm, width_cm, depth_cm, weight_kg,
        material, color, technique,
        is_dishwasher_safe, is_microwave_safe, is_food_safe,
        is_active, is_featured, is_handmade,
        meta_title, meta_description
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'EUR', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const result = await query(productQuery, [
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
    ]) as any;

    const productId = result.insertId;

    // Create inventory record if initial_quantity provided
    if (initial_quantity !== undefined && initial_quantity !== null) {
      const inventoryQuery = `
        INSERT INTO inventory (product_id, quantity, reserved_quantity, available_quantity, low_stock_threshold)
        VALUES (?, ?, 0, ?, 5)
      `;
      await query(inventoryQuery, [productId, initial_quantity, initial_quantity]);
    }

    return NextResponse.json({
      success: true,
      product_id: productId,
    }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Failed to create product', message: error.message },
      { status: 500 }
    );
  }
}
