import { NextResponse } from 'next/server';

import {
  AUTH_COOKIE_NAME,
  createSessionToken,
  sessionCookieOptions,
  verifyPassword,
} from '@/lib/auth';
import { turso } from '@/lib/turso';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    return NextResponse.json({ ok: false, message: 'Email and password are required.' }, { status: 400 });
  }

  const userResult = await turso.execute({
    sql: 'SELECT email, password_hash FROM users WHERE email = ? LIMIT 1',
    args: [email.toLowerCase()],
  });
  const user = userResult.rows[0];

  if (!user || typeof user.password_hash !== 'string' || !verifyPassword(password, user.password_hash)) {
    return NextResponse.json({ ok: false, message: 'Invalid email or password.' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(AUTH_COOKIE_NAME, createSessionToken(String(user.email)), sessionCookieOptions);

  return response;
}
