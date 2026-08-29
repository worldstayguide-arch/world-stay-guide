import { NextResponse } from 'next/server';

import { deleteBlog, getBlogBySlug, upsertBlog } from '@/lib/blogs';
import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

type BlogRouteProps = {
  params: Promise<{ slug: string }>;
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

export async function GET(request: Request, { params }: BlogRouteProps) {
  const { slug } = await params;
  const { searchParams } = new URL(request.url);
  const includeDrafts = searchParams.get('admin') === '1';

  if (includeDrafts && !isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const blog = await getBlogBySlug(slug, { includeDrafts });

  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json({ blog });
}

export async function PATCH(request: Request, { params }: BlogRouteProps) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  const payload = await request.json();
  const blog = await upsertBlog({ ...payload, slug: payload.slug ?? slug });

  if (slug !== blog.slug) {
    await deleteBlog(slug);
  }

  return NextResponse.json({ blog });
}

export async function DELETE(request: Request, { params }: BlogRouteProps) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { slug } = await params;
  await deleteBlog(slug);
  return NextResponse.json({ ok: true });
}
