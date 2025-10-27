import { cookies } from 'next/headers';
import { query } from './db';

export interface AdminUser {
  id: number;
  email: string;
  full_name: string;
  role: 'admin' | 'manager' | 'staff';
  is_active: boolean;
}

export async function getAdminSession(): Promise<AdminUser | null> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('admin_session')?.value;

    if (!sessionToken) {
      return null;
    }

    // Get session with user data
    const sessionQuery = `
      SELECT
        u.id, u.email, u.full_name, u.role, u.is_active,
        s.expires_at
      FROM admin_sessions s
      JOIN admin_users u ON s.admin_user_id = u.id
      WHERE s.session_token = ? AND s.expires_at > NOW() AND u.is_active = TRUE
      LIMIT 1
    `;

    const sessions = await query(sessionQuery, [sessionToken]) as any[];

    if (sessions.length === 0) {
      return null;
    }

    const session = sessions[0];
    return {
      id: session.id,
      email: session.email,
      full_name: session.full_name,
      role: session.role,
      is_active: session.is_active,
    };
  } catch (error) {
    console.error('Get admin session error:', error);
    return null;
  }
}

export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminSession();

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}
