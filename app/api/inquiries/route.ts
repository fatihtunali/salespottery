import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { Inquiry } from '@/types/database';

// POST /api/inquiries - Create a new wholesale inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      product_id,
      product_name,
      customer_name,
      customer_email,
      customer_phone,
      company_name,
      quantity,
      message,
    } = body;

    // Validation
    if (!product_id || !product_name || !customer_name || !customer_email || !quantity) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate minimum quantity
    if (quantity < 50) {
      return NextResponse.json(
        { error: 'Minimum order quantity is 50 pieces' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer_email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Insert inquiry into database
    const result = await query(
      `INSERT INTO inquiries (
        product_id,
        product_name,
        customer_name,
        customer_email,
        customer_phone,
        company_name,
        quantity,
        message,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
      [
        product_id,
        product_name,
        customer_name,
        customer_email,
        customer_phone || null,
        company_name || null,
        quantity,
        message || null,
      ]
    );

    const insertId = (result as any).insertId;

    // Fetch the created inquiry
    const inquiries = await query(
      'SELECT * FROM inquiries WHERE id = ?',
      [insertId]
    ) as Inquiry[];

    const inquiry = inquiries[0];

    // TODO: Send email notification to admin
    // TODO: Send confirmation email to customer

    return NextResponse.json(
      {
        success: true,
        inquiry,
        message: 'Inquiry submitted successfully. We will contact you within 24 hours.',
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { error: 'Failed to submit inquiry' },
      { status: 500 }
    );
  }
}

// GET /api/inquiries - Get all inquiries (for admin)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let sql = 'SELECT * FROM inquiries';
    const params: any[] = [];

    if (status) {
      sql += ' WHERE status = ?';
      params.push(status);
    }

    sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    const inquiries = await query(sql, params) as Inquiry[];

    // Get total count
    let countSql = 'SELECT COUNT(*) as total FROM inquiries';
    if (status) {
      countSql += ' WHERE status = ?';
    }
    const countResult = await query(
      countSql,
      status ? [status] : []
    ) as { total: number }[];
    const total = countResult[0].total;

    return NextResponse.json({
      inquiries,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + limit < total,
      },
    });

  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries' },
      { status: 500 }
    );
  }
}
