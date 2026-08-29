import { NextResponse } from 'next/server';

import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth';
import { deleteLandmark, getLandmarkById, updateLandmark } from '@/lib/landmarks';

const MAX_IMAGE_BYTES = 300 * 1024;

type LandmarkRouteProps = {
  params: Promise<{ id: string }>;
};

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

export async function GET(_request: Request, { params }: LandmarkRouteProps) {
  const { id } = await params;
  const landmark = await getLandmarkById(Number(id));

  if (!landmark) {
    return NextResponse.json({ error: 'Landmark not found' }, { status: 404 });
  }

  return NextResponse.json({ landmark });
}

export async function PATCH(request: Request, { params }: LandmarkRouteProps) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const payload = await request.json();

  if (imageTooLarge(payload.image ?? '')) {
    return NextResponse.json({ error: 'Image must be 300KB or less.' }, { status: 400 });
  }

  const landmark = await updateLandmark(Number(id), payload);

  if (!landmark) {
    return NextResponse.json({ error: 'Landmark not found' }, { status: 404 });
  }

  return NextResponse.json({ landmark });
}

export async function DELETE(request: Request, { params }: LandmarkRouteProps) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  await deleteLandmark(Number(id));
  return NextResponse.json({ ok: true });
}
