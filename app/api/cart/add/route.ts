import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, product_id, quantity = 1 } = body;

    if (!session_id || !product_id) {
      return NextResponse.json(
        { error: 'Session ID and product ID required' },
        { status: 400 }
      );
    }

    // Get or create cart
    let cartQuery = `SELECT id FROM carts WHERE session_id = ? LIMIT 1`;
    let carts = await query(cartQuery, [session_id]) as any[];

    let cartId: number;
    if (carts.length === 0) {
      const createCartQuery = `INSERT INTO carts (session_id) VALUES (?)`;
      const result: any = await query(createCartQuery, [session_id]);
      cartId = result.insertId;
    } else {
      cartId = carts[0].id;
    }

    // Get product price
    const productQuery = `SELECT base_price FROM products WHERE id = ? AND is_active = 1`;
    const products = await query(productQuery, [product_id]) as any[];

    if (products.length === 0) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const price = products[0].base_price;

    // Check if item already in cart
    const existingItemQuery = `
      SELECT id, quantity FROM cart_items
      WHERE cart_id = ? AND product_id = ?
    `;
    const existingItems = await query(existingItemQuery, [cartId, product_id]) as any[];

    if (existingItems.length > 0) {
      // Update quantity
      const newQuantity = existingItems[0].quantity + quantity;
      const updateQuery = `
        UPDATE cart_items
        SET quantity = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `;
      await query(updateQuery, [newQuantity, existingItems[0].id]);
    } else {
      // Add new item
      const insertQuery = `
        INSERT INTO cart_items (cart_id, product_id, quantity, price_at_addition)
        VALUES (?, ?, ?, ?)
      `;
      await query(insertQuery, [cartId, product_id, quantity, price]);
    }

    return NextResponse.json({ success: true, message: 'Item added to cart' });
  } catch (error: any) {
    console.error('Add to cart error:', error);
    return NextResponse.json(
      { error: 'Failed to add to cart', message: error.message },
      { status: 500 }
    );
  }
}
