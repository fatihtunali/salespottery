import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { requireAdmin } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require admin authentication
    await requireAdmin();

    const { id } = await params;

    // Get order details
    const orderQuery = `
      SELECT * FROM orders
      WHERE id = ?
    `;
    const orders = await query(orderQuery, [id]) as any[];

    if (orders.length === 0) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    const order = orders[0];

    // Get order items
    const itemsQuery = `
      SELECT * FROM order_items
      WHERE order_id = ?
      ORDER BY id
    `;
    const items = await query(itemsQuery, [id]) as any[];

    return NextResponse.json({
      order,
      items,
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.error('Get order error:', error);
    return NextResponse.json(
      { error: 'Failed to get order', message: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Require admin authentication
    await requireAdmin();

    const { id } = await params;
    const body = await request.json();
    const { payment_status, order_status, admin_notes } = body;

    // Build update query
    const updates: string[] = [];
    const values: any[] = [];

    if (payment_status) {
      updates.push('payment_status = ?');
      values.push(payment_status);
    }

    if (order_status) {
      updates.push('order_status = ?');
      values.push(order_status);
    }

    if (admin_notes !== undefined) {
      updates.push('admin_notes = ?');
      values.push(admin_notes);
    }

    if (updates.length === 0) {
      return NextResponse.json(
        { error: 'No fields to update' },
        { status: 400 }
      );
    }

    values.push(id);

    const updateQuery = `
      UPDATE orders
      SET ${updates.join(', ')}
      WHERE id = ?
    `;

    await query(updateQuery, values);

    // Get updated order
    const orderQuery = `SELECT * FROM orders WHERE id = ?`;
    const orders = await query(orderQuery, [id]) as any[];

    return NextResponse.json({
      success: true,
      order: orders[0],
    });
  } catch (error: any) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.error('Update order error:', error);
    return NextResponse.json(
      { error: 'Failed to update order', message: error.message },
      { status: 500 }
    );
  }
}
