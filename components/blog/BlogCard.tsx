import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';

import type { BlogPost } from '@/types/travel';

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="relative w-full h-56">
        <Image
          src={post.image}
          alt={post.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
          unoptimized={post.image.startsWith('data:')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">
          {post.category}
        </div>
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1.5 rounded-full border border-white/20 text-white">
          <Eye className="w-3.5 h-3.5" />
          <span className="text-xs font-bold">{post.views}</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h3 className="font-semibold text-lg leading-tight mb-1">{post.title}</h3>
          <p className="text-xs text-white/80">
            {post.readTime} · {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="p-4">
        <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
      </div>
    </Link>
  );
}
