import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const user = await getAdminSession();

    if (!user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error('Get admin user error:', error);
    return NextResponse.json(
      { error: 'Failed to get user', message: error.message },
      { status: 500 }
    );
  }
}
