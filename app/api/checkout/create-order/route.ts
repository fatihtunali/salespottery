import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      session_id,
      customer_name,
      customer_email,
      customer_phone,
      shipping_address,
      billing_address,
      customer_notes,
      payment_method, // 'bank_transfer' or 'cash_on_delivery'
    } = body;

    // Validation
    if (!session_id || !customer_name || !customer_email || !shipping_address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get cart with items
    const cartQuery = `SELECT id FROM carts WHERE session_id = ? LIMIT 1`;
    const carts = await query(cartQuery, [session_id]) as any[];

    if (carts.length === 0) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }

    const cartId = carts[0].id;

    // Get cart items with product details
    const itemsQuery = `
      SELECT
        ci.*,
        p.name,
        p.sku,
        (SELECT image_url FROM product_images WHERE product_id = p.id AND is_primary = 1 LIMIT 1) as primary_image
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.cart_id = ?
    `;
    const items = await query(itemsQuery, [cartId]) as any[];

    if (items.length === 0) {
      return NextResponse.json(
        { error: 'Cart is empty' },
        { status: 400 }
      );
    }

    // Calculate totals
    const subtotal = items.reduce((sum: number, item: any) =>
      sum + (Number(item.price_at_addition) * item.quantity), 0
    );

    // Shipping cost (you can make this dynamic based on country/weight)
    const shipping_cost = 10.00; // Fixed €10 for now
    const tax = 0; // Add VAT calculation if needed
    const total = subtotal + shipping_cost + tax;

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Create order with 'pending' payment status
    const orderQuery = `
      INSERT INTO orders (
        order_number,
        customer_email,
        customer_name,
        customer_phone,
        shipping_address_line1,
        shipping_address_line2,
        shipping_city,
        shipping_state,
        shipping_postal_code,
        shipping_country,
        billing_address_line1,
        billing_address_line2,
        billing_city,
        billing_state,
        billing_postal_code,
        billing_country,
        subtotal,
        shipping_cost,
        tax,
        total,
        currency,
        payment_status,
        order_status,
        customer_notes,
        admin_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const useSameAddress = !billing_address || billing_address.same_as_shipping;

    const orderResult: any = await query(orderQuery, [
      orderNumber,
      customer_email,
      customer_name,
      customer_phone || null,
      shipping_address.line1,
      shipping_address.line2 || null,
      shipping_address.city,
      shipping_address.state || null,
      shipping_address.postal_code,
      shipping_address.country,
      useSameAddress ? null : billing_address?.line1 || null,
      useSameAddress ? null : billing_address?.line2 || null,
      useSameAddress ? null : billing_address?.city || null,
      useSameAddress ? null : billing_address?.state || null,
      useSameAddress ? null : billing_address?.postal_code || null,
      useSameAddress ? null : billing_address?.country || null,
      subtotal,
      shipping_cost,
      tax,
      total,
      'EUR',
      'pending', // Payment pending until bank transfer confirmed
      'pending',
      customer_notes || null,
      `Payment method: ${payment_method || 'bank_transfer'}`
    ]);

    const orderId = orderResult.insertId;

    // Create order items
    for (const item of items) {
      const orderItemQuery = `
        INSERT INTO order_items (
          order_id,
          product_id,
          product_name,
          product_sku,
          product_image,
          quantity,
          price_at_purchase,
          subtotal
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await query(orderItemQuery, [
        orderId,
        item.product_id,
        item.name,
        item.sku,
        item.primary_image,
        item.quantity,
        item.price_at_addition,
        item.price_at_addition * item.quantity
      ]);
    }

    // Clear the cart
    const deleteCartItemsQuery = `DELETE FROM cart_items WHERE cart_id = ?`;
    await query(deleteCartItemsQuery, [cartId]);

    return NextResponse.json({
      success: true,
      order_number: orderNumber,
      order_id: orderId,
      total: total,
      currency: 'EUR'
    });
  } catch (error: any) {
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create order', message: error.message },
      { status: 500 }
    );
  }
}
