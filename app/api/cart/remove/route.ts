import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { session_id, item_id } = body;

    if (!session_id || !item_id) {
      return NextResponse.json(
        { error: 'Session ID and item ID required' },
        { status: 400 }
      );
    }

    // Verify cart ownership before deleting
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

    // Delete item
    const deleteQuery = `DELETE FROM cart_items WHERE id = ?`;
    await query(deleteQuery, [item_id]);

    return NextResponse.json({ success: true, message: 'Item removed from cart' });
  } catch (error: any) {
    console.error('Remove from cart error:', error);
    return NextResponse.json(
      { error: 'Failed to remove item', message: error.message },
      { status: 500 }
    );
  }
}
