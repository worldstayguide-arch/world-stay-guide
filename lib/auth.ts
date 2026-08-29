import 'server-only';

import { createHmac, randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

export const AUTH_COOKIE_NAME = 'pak_travels_session';

const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

type SessionPayload = {
  email: string;
  exp: number;
};

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error('AUTH_SECRET is not configured.');
  }

  return secret;
}

function base64UrlEncode(input: Buffer | string) {
  return Buffer.from(input).toString('base64url');
}

function base64UrlDecode(input: string) {
  return Buffer.from(input, 'base64url').toString('utf8');
}

function sign(value: string) {
  return createHmac('sha256', getAuthSecret()).update(value).digest('base64url');
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString('base64url');
  const hash = scryptSync(password, salt, 64).toString('base64url');

  return `scrypt:${salt}:${hash}`;
}

export function verifyPassword(password: string, storedHash: string) {
  const [algorithm, salt, hash] = storedHash.split(':');

  if (algorithm !== 'scrypt' || !salt || !hash) {
    return false;
  }

  const expected = Buffer.from(hash, 'base64url');
  const actual = scryptSync(password, salt, 64);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

export function createSessionToken(email: string) {
  const payload: SessionPayload = {
    email,
    exp: Math.floor(Date.now() / 1000) + SESSION_DURATION_SECONDS,
  };
  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return null;

  const [encodedPayload, signature] = token.split('.');

  if (!encodedPayload || !signature || sign(encodedPayload) !== signature) {
    return null;
  }

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload)) as SessionPayload;

    if (!payload.email || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
  path: '/',
  maxAge: SESSION_DURATION_SECONDS,
};
