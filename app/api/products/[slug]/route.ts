import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Product, Category, ProductImage, Inventory, ProductWithDetails } from '@/types/database';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Get product
    const productQuery = `
      SELECT * FROM products
      WHERE slug = ? AND is_active = 1
      LIMIT 1
    `;
    const products = await query(productQuery, [slug]) as Product[];

    if (products.length === 0) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const product = products[0];

    // Get category
    const categoryQuery = `SELECT * FROM categories WHERE id = ?`;
    const categories = await query(categoryQuery, [product.category_id]) as Category[];
    const category = categories[0];

    // Get images
    const imagesQuery = `
      SELECT * FROM product_images
      WHERE product_id = ?
      ORDER BY is_primary DESC, display_order ASC
    `;
    const images = await query(imagesQuery, [product.id]) as ProductImage[];

    // Get inventory
    const inventoryQuery = `SELECT * FROM inventory WHERE product_id = ?`;
    const inventoryResult = await query(inventoryQuery, [product.id]) as Inventory[];
    const inventory = inventoryResult.length > 0 ? inventoryResult[0] : null;

    const productWithDetails: ProductWithDetails = {
      ...product,
      category,
      images,
      inventory,
    };

    return NextResponse.json(productWithDetails);
  } catch (error: any) {
    console.error('Product detail API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product', message: error.message },
      { status: 500 }
    );
  }
}
