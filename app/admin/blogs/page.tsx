'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  ArrowLeft,
  Bold,
  CheckCircle2,
  Edit3,
  ExternalLink,
  Eye,
  FileText,
  Grid2X2,
  ImageIcon,
  Italic,
  Landmark,
  Link2,
  List,
  ListOrdered,
  LogOut,
  Newspaper,
  Package,
  Plus,
  Save,
  Search,
  Settings,
  Tag,
  Trash2,
  Underline,
  Upload,
  UserCircle,
} from 'lucide-react';

import { blogContentToHtml } from '@/lib/blog-content';
import type { BlogRecord } from '@/lib/blogs';

type EditorMode = 'list' | 'edit';

type AdminPost = BlogRecord;

type DraftPost = {
  title: string;
  slug: string;
  status: 'Published' | 'Draft';
  category: string;
  tags: string;
  excerpt: string;
  seoTitle: string;
  keywords: string;
  metaDescription: string;
  content: string;
  image: string;
};

const navItems = [
  { label: 'Blogs', href: '/admin/blogs', icon: Newspaper, active: true },
  { label: 'Packages', href: '/admin/packages', icon: Package, active: false },
  { label: 'Landmarks', href: '/admin/landmarks', icon: Landmark, active: false },
];

const toolbarItems = [
  { label: 'Bold', icon: Bold, command: 'bold' as const },
  { label: 'Italic', icon: Italic, command: 'italic' as const },
  { label: 'Underline', icon: Underline, command: 'underline' as const },
  { label: 'Align left', icon: AlignLeft, command: 'justifyLeft' as const },
  { label: 'Align center', icon: AlignCenter, command: 'justifyCenter' as const },
  { label: 'Align right', icon: AlignRight, command: 'justifyRight' as const },
  { label: 'Bulleted list', icon: List, command: 'insertUnorderedList' as const },
  { label: 'Numbered list', icon: ListOrdered, command: 'insertOrderedList' as const },
  { label: 'Link', icon: Link2, command: 'link' as const },
  { label: 'Image', icon: ImageIcon, command: 'image' as const },
];

function postToDraft(post: AdminPost): DraftPost {
  return {
    title: post.title,
    slug: post.slug,
    status: post.status,
    category: post.category,
    tags: `${post.category}, Pakistan Travel, ${post.author}`,
    excerpt: post.excerpt,
    seoTitle: post.title,
    keywords: `${post.category.toLowerCase()}, pakistan travel, gilgit baltistan`,
    metaDescription: post.excerpt,
    content: blogContentToHtml(post.content),
    image: post.image,
  };
}

const emptyDraft: DraftPost = {
  title: 'New Pakistan Travel Guide',
  slug: 'new-pakistan-travel-guide',
  status: 'Draft',
  category: 'Destination Guide',
  tags: 'Pakistan Travel, Mountains, Adventure',
  excerpt: 'Write a short summary for travelers before publishing this guide.',
  seoTitle: 'New Pakistan Travel Guide',
  keywords: 'pakistan travel, adventure, northern areas',
  metaDescription: 'A practical Pakistan travel guide with route notes, timing, and local tips.',
  content:
    '<p>Start your story here. Add practical details, personal notes, route planning, budget guidance, and safety information for travelers.</p><p>Use this editor area to draft the full article before publishing.</p>',
  image: '/hero-pakistan-mountains.jpg',
};

export default function BlogAdminPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [mode, setMode] = useState<EditorMode>('list');
  const [selectedSlug, setSelectedSlug] = useState('');
  const [draft, setDraft] = useState<DraftPost>(emptyDraft);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const selectedPost = useMemo(
    () => posts.find((post) => post.slug === selectedSlug),
    [posts, selectedSlug]
  );

  const publishedCount = posts.filter((post) => post.status === 'Published').length;
  const draftCount = posts.filter((post) => post.status === 'Draft').length;

  const openEditor = (post: AdminPost) => {
    setSelectedSlug(post.slug);
    setDraft(postToDraft(post));
    setMode('edit');
  };

  const startNewPost = () => {
    setSelectedSlug('');
    setDraft(emptyDraft);
    setMode('edit');
  };

  const updateDraft = (field: keyof DraftPost, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  useEffect(() => {
    let active = true;

    async function loadBlogs() {
      setIsLoading(true);
      setMessage('');

      try {
        const response = await fetch('/api/blogs?admin=1', { cache: 'no-store' });
        const data = (await response.json()) as { blogs?: AdminPost[]; error?: string };

        if (!response.ok) {
          throw new Error(data.error ?? 'Unable to load blogs');
        }

        if (!active) return;
        const loadedPosts = data.blogs ?? [];
        setPosts(loadedPosts);

        if (loadedPosts[0]) {
          setSelectedSlug(loadedPosts[0].slug);
          setDraft(postToDraft(loadedPosts[0]));
        }
      } catch (error) {
        if (!active) return;
        setMessage(error instanceof Error ? error.message : 'Unable to load blogs');
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadBlogs();

    return () => {
      active = false;
    };
  }, []);

  const handleImageUpload = (file: File | undefined) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateDraft('image', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const saveDraft = async () => {
    setIsSaving(true);
    setMessage('');

    const payload = {
      slug: draft.slug,
      title: draft.title,
      excerpt: draft.excerpt,
      content: [draft.content],
      category: draft.category,
      author: selectedPost?.author ?? 'WorldStayGuide Team',
      date: selectedPost?.date ?? new Date().toISOString().slice(0, 10),
      readTime: selectedPost?.readTime ?? '5 min read',
      views: selectedPost?.views ?? '0',
      image: draft.image,
      alt: `${draft.title} featured image`,
      status: draft.status as AdminPost['status'],
      tags: draft.tags,
      seoTitle: draft.seoTitle,
      keywords: draft.keywords,
      metaDescription: draft.metaDescription,
    };

    try {
      const response = await fetch(selectedSlug ? `/api/blogs/${selectedSlug}` : '/api/blogs', {
        method: selectedSlug ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { blog?: AdminPost; error?: string };

      if (!response.ok || !data.blog) {
        throw new Error(data.error ?? 'Unable to save blog');
      }

      setPosts((currentPosts) => {
        const existingIndex = currentPosts.findIndex((post) => post.slug === selectedSlug);

        if (existingIndex === -1) {
          return [data.blog!, ...currentPosts];
        }

        return currentPosts.map((post, index) => (index === existingIndex ? data.blog! : post));
      });
      setSelectedSlug(data.blog.slug);
      setDraft(postToDraft(data.blog));
      setMessage('Blog saved to database.');
      setMode('list');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save blog');
    } finally {
      setIsSaving(false);
    }
  };

  const deletePost = async (slug: string) => {
    setMessage('');

    try {
      const response = await fetch(`/api/blogs/${slug}`, { method: 'DELETE' });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to delete blog');
      }

      setPosts((currentPosts) => currentPosts.filter((post) => post.slug !== slug));
      setMessage('Blog deleted from database.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to delete blog');
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-neutral-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-neutral-950 text-white lg:flex">
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A5C8E] text-lg font-bold">
            WS
          </div>
          <div>
            <div className="text-sm font-semibold leading-tight">WorldStayGuide</div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Admin Portal
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4 py-8">
          {navItems.map(({ label, href, icon: Icon, active }) => (
            <Link
              key={label}
              href={href}
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                active
                  ? 'bg-[#0A5C8E] text-white shadow-lg shadow-[#0A5C8E]/30'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="border-t border-white/10 p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0A5C8E] text-sm font-bold">
              A
            </div>
            <div>
              <div className="text-sm font-semibold">Admin</div>
              <div className="max-w-[150px] truncate text-xs text-white/50">support@worldstayguide.com</div>
            </div>
          </div>
          <button className="flex items-center gap-2 text-xs font-semibold text-white/60 hover:text-white" type="button" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-neutral-200 bg-white/90 px-5 backdrop-blur md:px-8">
          <h1 className="text-lg font-semibold tracking-tight">Blogs Management</h1>
          <div className="flex items-center gap-4 text-sm font-semibold text-neutral-500">
            <span className="hidden items-center gap-1 md:flex">
              <UserCircle className="h-4 w-4" />
              Profile
            </span>
            <Link href="/" className="flex items-center gap-1 hover:text-neutral-900">
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Link>
          </div>
        </header>

        <main className="px-5 py-8 md:px-8">
            <BlogAdminHero
              draftCount={draftCount}
              publishedCount={publishedCount}
            totalPosts={posts.length}
            onNewPost={startNewPost}
          />

          {message && (
            <div className="mt-6 rounded-2xl border border-[#0A5C8E]/15 bg-[#0A5C8E]/10 px-4 py-3 text-sm font-semibold text-[#08486f]">
              {message}
            </div>
          )}

          {mode === 'list' ? (
            <BlogList
              posts={posts}
              isLoading={isLoading}
              onEdit={openEditor}
              onDelete={deletePost}
              onNewPost={startNewPost}
              setViewMode={setViewMode}
              viewMode={viewMode}
            />
          ) : (
            <BlogEditor
              draft={draft}
              selectedPost={selectedPost}
              onBack={() => setMode('list')}
              onChange={updateDraft}
              onImageUpload={handleImageUpload}
              onSave={saveDraft}
              isSaving={isSaving}
            />
          )}
        </main>
      </div>
    </div>
  );
}

type BlogAdminHeroProps = {
  totalPosts: number;
  publishedCount: number;
  draftCount: number;
  onNewPost: () => void;
};

function BlogAdminHero({ totalPosts, publishedCount, draftCount, onNewPost }: BlogAdminHeroProps) {
  return (
    <section className="rounded-[1.75rem] bg-gradient-to-br from-neutral-950 via-[#143C46] to-[#0A5C8E] p-6 text-white shadow-xl shadow-neutral-900/10 md:p-8">
      <div className="mb-8 flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
        <div>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80">
            <Settings className="h-3.5 w-3.5" />
            Content Hub
          </div>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Blog Management</h2>
          <p className="mt-2 max-w-xl text-sm text-white/70">
            Craft stories, manage publications, and keep Pakistan travel guides ready for your audience.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15" type="button">
            <UserCircle className="h-4 w-4" />
            Edit Profile
          </button>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-semibold hover:bg-white/15"
          >
            <ExternalLink className="h-4 w-4" />
            Live Blog
          </Link>
          <button
            className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0A5C8E] hover:bg-neutral-100"
            type="button"
            onClick={onNewPost}
          >
            <Plus className="h-4 w-4" />
            Write New Post
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard icon={FileText} label="Total Posts" value={String(totalPosts)} tone="blue" />
        <StatCard icon={CheckCircle2} label="Published" value={String(publishedCount)} tone="green" />
        <StatCard icon={Edit3} label="Drafts" value={String(draftCount)} tone="gold" />
      </div>
    </section>
  );
}

type StatCardProps = {
  icon: typeof FileText;
  label: string;
  value: string;
  tone: 'blue' | 'green' | 'gold';
};

function StatCard({ icon: Icon, label, value, tone }: StatCardProps) {
  const toneClass = {
    blue: 'bg-sky-400/15 text-sky-200',
    green: 'bg-emerald-400/15 text-emerald-200',
    gold: 'bg-amber-400/15 text-amber-200',
  }[tone];

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/10 p-5">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${toneClass}`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs font-bold uppercase tracking-wide text-white/55">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

type BlogListProps = {
  posts: AdminPost[];
  isLoading: boolean;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  onEdit: (post: AdminPost) => void;
  onDelete: (slug: string) => void | Promise<void>;
  onNewPost: () => void;
};

function BlogList({ posts, isLoading, viewMode, setViewMode, onEdit, onDelete, onNewPost }: BlogListProps) {
  return (
    <section className="mt-10">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Recent Articles</h2>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2 md:flex">
            <Search className="h-4 w-4 text-neutral-400" />
            <input className="w-56 bg-transparent text-sm outline-none" placeholder="Search posts" />
          </div>
          <div className="flex rounded-2xl border border-neutral-200 bg-white p-1 shadow-sm">
            <button
              className={`rounded-xl p-2 ${viewMode === 'grid' ? 'bg-[#0A5C8E]/10 text-[#0A5C8E]' : 'text-neutral-400'}`}
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
            >
              <Grid2X2 className="h-4 w-4" />
            </button>
            <button
              className={`rounded-xl p-2 ${viewMode === 'list' ? 'bg-[#0A5C8E]/10 text-[#0A5C8E]' : 'text-neutral-400'}`}
              type="button"
              onClick={() => setViewMode('list')}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
          <button className="rounded-2xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-neutral-800" type="button" onClick={onNewPost}>
            New Post
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {isLoading && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-sm font-semibold text-neutral-500 shadow-sm">
            Loading blogs from database...
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center shadow-sm">
            <h3 className="text-lg font-semibold">No blogs yet</h3>
            <p className="mt-2 text-sm text-neutral-500">Create your first travel guide and it will be saved in Turso.</p>
            <button className="mt-5 rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800" type="button" onClick={onNewPost}>
              New Post
            </button>
          </div>
        )}

        {posts.map((post) => (
          <article
            key={post.slug}
            className="flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md xl:flex-row xl:items-center"
          >
            <div className="relative h-32 w-full overflow-hidden rounded-xl bg-neutral-100 xl:w-52">
              <Image
                src={post.image}
                alt={post.alt}
                fill
                sizes="(min-width: 1280px) 208px, 100vw"
                className="object-cover"
                unoptimized={post.image.startsWith('data:') || post.image.startsWith('blob:')}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <Badge icon={Tag}>{post.category}</Badge>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="h-3 w-3" />
                  {post.status}
                </span>
              </div>
              <h3 className="truncate text-lg font-semibold">{post.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-neutral-500">{post.excerpt}</p>
            </div>
            <div className="flex items-center justify-between gap-4 xl:w-60">
              <div className="text-xs font-bold uppercase text-neutral-400">
                Last Updated
                <div className="mt-1 text-sm normal-case text-neutral-700">
                  {new Date(post.updatedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="rounded-xl bg-neutral-100 p-3 text-neutral-600 hover:bg-[#0A5C8E]/10 hover:text-[#0A5C8E]" type="button" onClick={() => onEdit(post)} aria-label={`Edit ${post.title}`}>
                  <Edit3 className="h-4 w-4" />
                </button>
                <button className="rounded-xl bg-neutral-100 p-3 text-neutral-600 hover:bg-red-50 hover:text-red-600" type="button" aria-label={`Delete ${post.title}`} onClick={() => onDelete(post.slug)}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Badge({ children, icon: Icon }: { children: React.ReactNode; icon: typeof Tag }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-bold text-neutral-600">
      <Icon className="h-3 w-3" />
      {children}
    </span>
  );
}

type BlogEditorProps = {
  draft: DraftPost;
  selectedPost?: AdminPost;
  onBack: () => void;
  onChange: (field: keyof DraftPost, value: string) => void;
  onImageUpload: (file: File | undefined) => void;
  onSave: () => void | Promise<void>;
  isSaving: boolean;
};

function BlogEditor({ draft, selectedPost, onBack, onChange, onImageUpload, onSave, isSaving }: BlogEditorProps) {
  const previewTitle = draft.seoTitle || draft.title;
  const previewDescription = draft.metaDescription || draft.excerpt;

  return (
    <section className="mt-10">
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm xl:flex-row xl:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-neutral-900" type="button" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
            Exit
          </button>
          <div className="h-6 w-px bg-neutral-200" />
          <div className="truncate text-sm font-semibold">{draft.title}</div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{draft.status}</span>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-neutral-50" type="button">
            <Eye className="h-4 w-4" />
            Preview
          </button>
          <button className="inline-flex items-center gap-2 rounded-xl bg-[#0A5C8E] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#08486f] disabled:cursor-not-allowed disabled:opacity-60" type="button" onClick={onSave} disabled={isSaving}>
            <Save className="h-4 w-4" />
            {isSaving ? 'Saving...' : selectedPost ? 'Update' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-6">
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <input
              className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none md:text-4xl"
              value={draft.title}
              onChange={(event) => onChange('title', event.target.value)}
            />
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-neutral-50 px-4 py-3 text-xs text-neutral-500">
              <Link2 className="h-4 w-4" />
              <span className="font-semibold">Permalink:</span>
              <span>https://worldstayguide.com/blog/</span>
              <input
                className="min-w-0 flex-1 bg-transparent font-semibold text-[#0A5C8E] outline-none"
                value={draft.slug}
                onChange={(event) => onChange('slug', event.target.value)}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <div className="border-b border-neutral-200 px-5 py-4 text-xs font-bold uppercase text-neutral-500">
              Story Content
            </div>
            <RichTextEditor
              key={selectedPost?.slug ?? 'new'}
              initialHtml={draft.content}
              onChange={(html) => onChange('content', html)}
            />
          </div>
        </div>

        <aside className="space-y-5">
          <Panel title="Publishing" icon={Save}>
            <label className="text-xs font-bold uppercase text-neutral-500">Status</label>
            <select
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm font-semibold outline-none focus:border-[#0A5C8E]"
              value={draft.status}
              onChange={(event) => onChange('status', event.target.value)}
            >
              <option>Published</option>
              <option>Draft</option>
            </select>
          </Panel>

          <Panel title="Featured Image" icon={ImageIcon}>
            <div className="relative mb-3 h-32 overflow-hidden rounded-xl bg-neutral-100">
              <Image src={draft.image} alt={draft.title} fill sizes="300px" className="object-cover" unoptimized={draft.image.startsWith('data:') || draft.image.startsWith('blob:')} />
            </div>
            <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 text-center text-xs font-semibold text-neutral-500 hover:border-[#0A5C8E] hover:text-[#0A5C8E]">
              <Upload className="mb-2 h-5 w-5" />
              Click to upload image
              <input className="hidden" type="file" accept="image/*" onChange={(event) => onImageUpload(event.target.files?.[0])} />
            </label>
          </Panel>

          <Panel title="Organization" icon={Tag}>
            <Field label="Category" value={draft.category} onChange={(value) => onChange('category', value)} />
            <Field label="Tags" value={draft.tags} onChange={(value) => onChange('tags', value)} />
            <TextAreaField label="Excerpt" value={draft.excerpt} onChange={(value) => onChange('excerpt', value)} rows={4} />
          </Panel>

          <Panel title="SEO Details" icon={Search}>
            <Field label="Slug" value={draft.slug} onChange={(value) => onChange('slug', value)} />
            <Field label="SEO Title" value={draft.seoTitle} onChange={(value) => onChange('seoTitle', value)} />
            <Field label="Keywords" value={draft.keywords} onChange={(value) => onChange('keywords', value)} />
            <TextAreaField label="Meta Description" value={draft.metaDescription} onChange={(value) => onChange('metaDescription', value)} rows={4} />

            <div className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <div className="mb-2 text-xs font-bold uppercase text-neutral-400">SEO Preview</div>
              <div className="truncate text-sm font-semibold text-blue-700">{previewTitle}</div>
              <div className="truncate text-xs text-green-700">worldstayguide.com/blog/{draft.slug}</div>
              <p className="mt-1 line-clamp-4 text-xs leading-5 text-neutral-500">{previewDescription}</p>
            </div>

            <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-4">
              <div className="mb-2 text-xs font-bold uppercase text-neutral-400">Article JSON-LD</div>
              <pre className="max-h-36 overflow-auto rounded-lg bg-neutral-950 p-3 text-[10px] leading-4 text-emerald-200">
{`{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "${draft.title}",
  "author": "${selectedPost?.author ?? 'WorldStayGuide Team'}"
}`}
              </pre>
            </div>
          </Panel>
        </aside>
      </div>
    </section>
  );
}

type RichTextEditorProps = {
  initialHtml: string;
  onChange: (html: string) => void;
};

function RichTextEditor({ initialHtml, onChange }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = initialHtml;
    }
    // Only seed the editor once on mount so live typing never gets clobbered.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emitChange = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const runCommand = (command: string) => {
    editorRef.current?.focus();
    document.execCommand(command);
    emitChange();
  };

  const handleToolbarClick = (command: (typeof toolbarItems)[number]['command']) => {
    if (command === 'link') {
      const url = window.prompt('Enter link URL');
      if (!url) return;
      editorRef.current?.focus();
      document.execCommand('createLink', false, url);
      emitChange();
      return;
    }

    if (command === 'image') {
      fileInputRef.current?.click();
      return;
    }

    runCommand(command);
  };

  const handleImageSelected = (file: File | undefined) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        editorRef.current?.focus();
        document.execCommand('insertImage', false, reader.result);
        emitChange();
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1 border-b border-neutral-200 px-4 py-3">
        {toolbarItems.map(({ label, icon: Icon, command }) => (
          <button
            key={label}
            className="rounded-lg p-2 text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900"
            type="button"
            aria-label={label}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => handleToolbarClick(command)}
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(event) => handleImageSelected(event.target.files?.[0])}
        />
      </div>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onBlur={emitChange}
        className="min-h-[430px] w-full rounded-b-2xl bg-white p-5 text-sm leading-7 text-neutral-700 outline-none [&_a]:text-[#0A5C8E] [&_a]:underline [&_img]:my-3 [&_img]:max-w-full [&_img]:rounded-xl [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6"
      />
    </div>
  );
}

type PanelProps = {
  title: string;
  icon: typeof Save;
  children: React.ReactNode;
};

function Panel({ title, icon: Icon, children }: PanelProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-neutral-200 px-4 py-4 text-sm font-bold">
        <Icon className="h-4 w-4 text-[#0A5C8E]" />
        {title}
      </div>
      <div className="space-y-4 p-4">{children}</div>
    </div>
  );
}

type FieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

function Field({ label, value, onChange }: FieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase text-neutral-500">{label}</span>
      <input
        className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0A5C8E]"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

type TextAreaFieldProps = FieldProps & {
  rows: number;
};

function TextAreaField({ label, value, onChange, rows }: TextAreaFieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase text-neutral-500">{label}</span>
      <textarea
        className="mt-2 w-full resize-y rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm leading-6 outline-none focus:border-[#0A5C8E]"
        rows={rows}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
