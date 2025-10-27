import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id } = body;

    if (!session_id) {
      return NextResponse.json(
        { error: 'Session ID required' },
        { status: 400 }
      );
    }

    // Get cart ID
    const cartQuery = `SELECT id FROM carts WHERE session_id = ?`;
    const carts = await query(cartQuery, [session_id]) as any[];

    if (carts.length === 0) {
      return NextResponse.json({ success: true, message: 'Cart already empty' });
    }

    const cartId = carts[0].id;

    // Delete all cart items
    const deleteItemsQuery = `DELETE FROM cart_items WHERE cart_id = ?`;
    await query(deleteItemsQuery, [cartId]);

    return NextResponse.json({ success: true, message: 'Cart cleared' });
  } catch (error: any) {
    console.error('Clear cart error:', error);
    return NextResponse.json(
      { error: 'Failed to clear cart', message: error.message },
      { status: 500 }
    );
  }
}
