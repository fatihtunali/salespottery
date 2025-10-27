import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Get all active currencies with their exchange rates
    const currenciesQuery = `
      SELECT
        c.id,
        c.code,
        c.name,
        c.symbol,
        c.is_active,
        c.display_order,
        COALESCE(er.rate, 1.000000) as rate
      FROM currencies c
      LEFT JOIN exchange_rates er ON c.code = er.currency_code
      WHERE c.is_active = TRUE
      ORDER BY c.display_order
    `;

    const currencies = await query(currenciesQuery, []) as any[];

    return NextResponse.json({ currencies });
  } catch (error: any) {
    console.error('Get currencies error:', error);
    return NextResponse.json(
      { error: 'Failed to get currencies', message: error.message },
      { status: 500 }
    );
  }
}
