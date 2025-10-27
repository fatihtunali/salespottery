import { NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Category } from '@/types/database';

export async function GET() {
  try {
    const categoriesQuery = `
      SELECT
        c.*,
        COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
      WHERE c.is_active = 1
      GROUP BY c.id
      ORDER BY c.display_order ASC, c.name ASC
    `;

    const categories = await query(categoriesQuery) as (Category & { product_count: number })[];

    return NextResponse.json({ categories });
  } catch (error: any) {
    console.error('Categories API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories', message: error.message },
      { status: 500 }
    );
  }
}
