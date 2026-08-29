import { NextResponse } from 'next/server';

import { getBlogs, upsertBlog } from '@/lib/blogs';
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

function isAuthenticated(request: Request) {
  const cookie = request.headers.get('cookie') ?? '';
  const token = cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${AUTH_COOKIE_NAME}=`))
    ?.split('=')[1];

  return token ? Boolean(verifySessionToken(decodeURIComponent(token))) : false;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const includeDrafts = searchParams.get('admin') === '1';

  if (includeDrafts && !isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const blogs = await getBlogs({ includeDrafts });
  return NextResponse.json({ blogs });
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const payload = await request.json();
  const blog = await upsertBlog(payload);
  return NextResponse.json({ blog });
}
