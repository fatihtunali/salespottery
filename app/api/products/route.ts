import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { ProductListItem } from '@/types/database';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const categorySlug = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';
    const offset = (page - 1) * limit;

    // Build WHERE clause
    const conditions: string[] = ['p.is_active = 1'];
    const params: any[] = [];

    if (categorySlug) {
      conditions.push('c.slug = ?');
      params.push(categorySlug);
    }

    if (search) {
      conditions.push('(p.name LIKE ? OR p.description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }

    if (featured) {
      conditions.push('p.is_featured = 1');
    }

    const whereClause = conditions.length > 0
      ? `WHERE ${conditions.join(' AND ')}`
      : '';

    // Get total count
    const countQuery = `
      SELECT COUNT(*) as total
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ${whereClause}
    `;
    const countResult = await query(countQuery, params) as any[];
    const total = countResult[0].total;

    // Get products with pagination
    const productsQuery = `
      SELECT
        p.*,
        c.name as category_name,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as primary_image,
        COALESCE(i.available_quantity, 0) as available_quantity
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN inventory i ON p.id = i.product_id
      ${whereClause}
      ORDER BY p.is_featured DESC, p.created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `;

    const products = await query(productsQuery, params) as ProductListItem[];

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
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', message: error.message },
      { status: 500 }
    );
  }
}
