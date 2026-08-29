import type { Metadata } from 'next';

import { BlogCard } from '@/components/blog/BlogCard';
import { SectionEyebrow } from '@/components/home/SectionEyebrow';
import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { getBlogs } from '@/lib/blogs';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Blog | WorldStayGuide',
  description:
    'Guides, trekking notes, and destination stories from the WorldStayGuide team — Hunza, Skardu, K2, Fairy Meadows, and beyond.',
};

export default async function BlogPage() {
  const blogPosts = await getBlogs();

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans overflow-x-hidden">
      <Navbar />

      <section className="relative w-full h-[45vh] min-h-[340px] flex flex-col items-center justify-center bg-neutral-900">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/80 to-neutral-900/40" />
        <div className="relative z-10 text-center text-white px-4">
          <div className="flex justify-center">
            <SectionEyebrow label="The Journal" dotClassName="bg-yellow-400" />
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1]">
            Stories from the road
          </h1>
        </div>
      </section>

      <main>
        <section className="max-w-7xl mx-auto px-6 mt-16 mb-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
