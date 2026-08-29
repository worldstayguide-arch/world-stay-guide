import { turso } from '@/lib/turso';
import type { BlogPost } from '@/types/travel';

export type BlogStatus = 'Published' | 'Draft';

export type BlogRecord = BlogPost & {
  status: BlogStatus;
  tags: string;
  seoTitle: string;
  keywords: string;
  metaDescription: string;
  updatedAt: string;
};

type BlogRow = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  read_time: string;
  views: string;
  image: string;
  alt: string;
  status: BlogStatus;
  tags: string;
  seo_title: string;
  keywords: string;
  meta_description: string;
  updated_at: string;
};

export type BlogPayload = {
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: string;
  author?: string;
  date?: string;
  readTime?: string;
  views?: string;
  image: string;
  alt?: string;
  status: BlogStatus;
  tags?: string;
  seoTitle?: string;
  keywords?: string;
  metaDescription?: string;
};

function toBlogRecord(row: BlogRow): BlogRecord {
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: JSON.parse(row.content) as string[],
    category: row.category,
    author: row.author,
    date: row.date,
    readTime: row.read_time,
    views: row.views,
    image: row.image,
    alt: row.alt,
    status: row.status,
    tags: row.tags,
    seoTitle: row.seo_title,
    keywords: row.keywords,
    metaDescription: row.meta_description,
    updatedAt: row.updated_at,
  };
}

export async function getBlogs(options: { includeDrafts?: boolean } = {}) {
  const query = options.includeDrafts
    ? 'SELECT * FROM blogs ORDER BY updated_at DESC'
    : "SELECT * FROM blogs WHERE status = 'Published' ORDER BY date DESC, updated_at DESC";

  const result = await turso.execute(query);
  return result.rows.map((row) => toBlogRecord(row as unknown as BlogRow));
}

export async function getBlogBySlug(slug: string, options: { includeDrafts?: boolean } = {}) {
  const result = await turso.execute({
    sql: options.includeDrafts
      ? 'SELECT * FROM blogs WHERE slug = ? LIMIT 1'
      : "SELECT * FROM blogs WHERE slug = ? AND status = 'Published' LIMIT 1",
    args: [slug],
  });

  const row = result.rows[0];
  return row ? toBlogRecord(row as unknown as BlogRow) : null;
}

export async function upsertBlog(payload: BlogPayload) {
  const now = new Date().toISOString();
  const date = payload.date ?? now.slice(0, 10);
  const author = payload.author ?? 'WorldStayGuide Team';
  const readTime = payload.readTime ?? '5 min read';
  const views = payload.views ?? '0';
  const alt = payload.alt ?? `${payload.title} featured image`;

  await turso.execute({
    sql: `
      INSERT INTO blogs (
        slug, title, excerpt, content, category, author, date, read_time, views,
        image, alt, status, tags, seo_title, keywords, meta_description, updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(slug) DO UPDATE SET
        title = excluded.title,
        excerpt = excluded.excerpt,
        content = excluded.content,
        category = excluded.category,
        author = excluded.author,
        date = excluded.date,
        read_time = excluded.read_time,
        views = excluded.views,
        image = excluded.image,
        alt = excluded.alt,
        status = excluded.status,
        tags = excluded.tags,
        seo_title = excluded.seo_title,
        keywords = excluded.keywords,
        meta_description = excluded.meta_description,
        updated_at = excluded.updated_at
    `,
    args: [
      payload.slug,
      payload.title,
      payload.excerpt,
      JSON.stringify(payload.content),
      payload.category,
      author,
      date,
      readTime,
      views,
      payload.image,
      alt,
      payload.status,
      payload.tags ?? payload.category,
      payload.seoTitle ?? payload.title,
      payload.keywords ?? payload.category.toLowerCase(),
      payload.metaDescription ?? payload.excerpt,
      now,
    ],
  });

  const blog = await getBlogBySlug(payload.slug, { includeDrafts: true });

  if (!blog) {
    throw new Error('Blog was saved but could not be loaded.');
  }

  return blog;
}

export async function deleteBlog(slug: string) {
  await turso.execute({
    sql: 'DELETE FROM blogs WHERE slug = ?',
    args: [slug],
  });
}
