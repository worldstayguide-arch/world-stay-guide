import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, Eye } from 'lucide-react';

import { BlogCard } from '@/components/blog/BlogCard';
import { SectionEyebrow } from '@/components/home/SectionEyebrow';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { blogContentToHtml } from '@/lib/blog-content';
import { getBlogBySlug, getBlogs } from '@/lib/blogs';

export const dynamic = 'force-dynamic';

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return { title: 'Blog | WorldStayGuide' };
  }

  return {
    title: `${post.title} | WorldStayGuide`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = (await getBlogs()).filter((item) => item.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans overflow-x-hidden">
      <Navbar />

      <section className="relative w-full h-[60vh] min-h-[440px] flex flex-col items-end justify-end">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 pb-12 text-white">
          <div className="flex items-center gap-2 mb-4">
            <SectionEyebrow label={post.category} dotClassName="bg-yellow-400" />
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
              <Eye className="w-3.5 h-3.5" />
              <span className="text-xs font-bold">{post.views} views</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.1] max-w-3xl mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/80">
            <span className="font-medium text-white">{post.author}</span>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime}
            </div>
          </div>
        </div>
      </section>

      <main>
        <section className="max-w-3xl mx-auto px-6 mt-16 mb-20">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journal
          </Link>

          <p className="text-lg text-neutral-600 leading-relaxed mb-8">{post.excerpt}</p>

          <div
            className="space-y-6 text-neutral-700 leading-relaxed [&_a]:text-[#0A5C8E] [&_a]:underline [&_img]:rounded-2xl [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: blogContentToHtml(post.content) }}
          />

        </section>

        {relatedPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 mb-24">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 mb-8">
              More from the Journal
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
