import { NextResponse } from 'next/server';

import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth';
import { createLandmark, getLandmarks } from '@/lib/landmarks';

const MAX_IMAGE_BYTES = 300 * 1024;

function isAuthenticated(request: Request) {
  const cookie = request.headers.get('cookie') ?? '';
  const token = cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${AUTH_COOKIE_NAME}=`))
    ?.split('=')[1];

  return token ? Boolean(verifySessionToken(decodeURIComponent(token))) : false;
}

function imageTooLarge(image: string) {
  if (!image.startsWith('data:')) return false;
  const base64 = image.split(',')[1] ?? '';
  return Math.ceil((base64.length * 3) / 4) > MAX_IMAGE_BYTES;
}

export async function GET() {
  const landmarks = await getLandmarks();
  return NextResponse.json({ landmarks });
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();

  if (imageTooLarge(payload.image ?? '')) {
    return NextResponse.json({ error: 'Image must be 300KB or less.' }, { status: 400 });
  }

  const landmark = await createLandmark(payload);
  return NextResponse.json({ landmark });
}
