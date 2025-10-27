import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, item_id, quantity } = body;

    if (!session_id || !item_id || quantity === undefined) {
      return NextResponse.json(
        { error: 'Session ID, item ID, and quantity required' },
        { status: 400 }
      );
    }

    if (quantity < 1) {
      return NextResponse.json(
        { error: 'Quantity must be at least 1' },
        { status: 400 }
      );
    }

    // Verify cart ownership
    const verifyQuery = `
      SELECT ci.id FROM cart_items ci
      JOIN carts c ON ci.cart_id = c.id
      WHERE ci.id = ? AND c.session_id = ?
    `;
    const items = await query(verifyQuery, [item_id, session_id]) as any[];

    if (items.length === 0) {
      return NextResponse.json(
        { error: 'Cart item not found' },
        { status: 404 }
      );
    }

    // Update quantity
    const updateQuery = `
      UPDATE cart_items
      SET quantity = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    await query(updateQuery, [quantity, item_id]);

    return NextResponse.json({ success: true, message: 'Quantity updated' });
  } catch (error: any) {
    console.error('Update cart error:', error);
    return NextResponse.json(
      { error: 'Failed to update cart', message: error.message },
      { status: 500 }
    );
  }
}
