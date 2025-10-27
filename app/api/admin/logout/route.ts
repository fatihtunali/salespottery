import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/lib/db';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;

    if (sessionToken) {
      // Delete session from database
      const deleteQuery = `DELETE FROM admin_sessions WHERE session_token = ?`;
      await query(deleteQuery, [sessionToken]);
    }

    // Clear cookie
    cookieStore.delete('admin_session');

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed', message: error.message },
      { status: 500 }
    );
  }
}
