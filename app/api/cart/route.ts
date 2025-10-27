import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Cart, CartItem, CartWithItems, ProductListItem } from '@/types/database';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    // Get or create cart
    let cartQuery = `SELECT * FROM carts WHERE session_id = ? LIMIT 1`;
    let carts = await query(cartQuery, [sessionId]) as Cart[];

    let cart: Cart;
    if (carts.length === 0) {
      // Create new cart
      const createCartQuery = `
        INSERT INTO carts (session_id) VALUES (?)
      `;
      const result: any = await query(createCartQuery, [sessionId]);
      cart = {
        id: result.insertId,
        session_id: sessionId,
        user_email: null,
        created_at: new Date(),
        updated_at: new Date(),
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      };
    } else {
      cart = carts[0];
    }

    // Get cart items with product details
    const itemsQuery = `
      SELECT
        ci.*,
        p.*,
        c.name as category_name,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as primary_image,
        COALESCE(i.available_quantity, 0) as available_quantity
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      LEFT JOIN categories c ON p.category_id = c.id
      LEFT JOIN inventory i ON p.id = i.product_id
      WHERE ci.cart_id = ?
      ORDER BY ci.created_at DESC
    `;

    const items = await query(itemsQuery, [cart.id]) as any[];

    // Transform to CartItemWithProduct
    const cartItems = items.map(item => ({
      id: item.id,
      cart_id: item.cart_id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_addition: item.price_at_addition,
      created_at: item.created_at,
      updated_at: item.updated_at,
      product: {
        id: item.product_id,
        sku: item.sku,
        name: item.name,
        slug: item.slug,
        description: item.description,
        long_description: item.long_description,
        category_id: item.category_id,
        base_price: item.base_price,
        currency: item.currency,
        height_cm: item.height_cm,
        width_cm: item.width_cm,
        depth_cm: item.depth_cm,
        weight_kg: item.weight_kg,
        material: item.material,
        color: item.color,
        technique: item.technique,
        is_dishwasher_safe: item.is_dishwasher_safe,
        is_microwave_safe: item.is_microwave_safe,
        is_food_safe: item.is_food_safe,
        is_active: item.is_active,
        is_featured: item.is_featured,
        is_handmade: item.is_handmade,
        meta_title: item.meta_title,
        meta_description: item.meta_description,
        created_at: item.created_at,
        updated_at: item.updated_at,
        category_name: item.category_name,
        primary_image: item.primary_image,
        available_quantity: item.available_quantity,
      },
    }));

    const total = cartItems.reduce((sum, item) => sum + (Number(item.price_at_addition) * item.quantity), 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const cartWithItems: CartWithItems = {
      ...cart,
      items: cartItems,
      total,
      itemCount,
    };

    return NextResponse.json({ cart: cartWithItems });
  } catch (error: any) {
    console.error('Get cart error:', error);
    return NextResponse.json(
      { error: 'Failed to get cart', message: error.message },
      { status: 500 }
    );
  }
}
