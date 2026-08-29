'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Edit3,
  ImageIcon,
  Landmark as LandmarkIconLucide,
  LogOut,
  Newspaper,
  Package,
  Plus,
  Save,
  Search,
  Star,
  Tag,
  Trash2,
  Upload,
  UserCircle,
} from 'lucide-react';

import { LANDMARK_ICON_NAMES, resolveLandmarkIcon } from '@/lib/landmark-icons';
import type { LandmarkRecord, LandmarkStatus } from '@/types/travel';

type LandmarkDraft = {
  name: string;
  category: string;
  iconName: string;
  rating: string;
  reviews: string;
  price: string;
  status: LandmarkStatus;
  image: string;
};

const MAX_IMAGE_BYTES = 300 * 1024;

const navItems = [
  { label: 'Blogs', href: '/admin/blogs', icon: Newspaper, active: false },
  { label: 'Packages', href: '/admin/packages', icon: Package, active: false },
  { label: 'Landmarks', href: '/admin/landmarks', icon: LandmarkIconLucide, active: true },
];

const emptyDraft: LandmarkDraft = {
  name: 'New Landmark',
  category: 'Tourist attraction',
  iconName: 'Landmark',
  rating: '',
  reviews: '',
  price: '',
  status: 'Open',
  image: '/hero-pakistan-mountains.jpg',
};

function landmarkToDraft(item: LandmarkRecord): LandmarkDraft {
  return {
    name: item.name,
    category: item.category,
    iconName: item.iconName,
    rating: item.rating ?? '',
    reviews: item.reviews ?? '',
    price: item.price ?? '',
    status: item.status,
    image: item.image,
  };
}

export default function LandmarksAdminPage() {
  const router = useRouter();
  const [landmarks, setLandmarks] = useState<LandmarkRecord[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [draft, setDraft] = useState<LandmarkDraft>(emptyDraft);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  const selectedLandmark = useMemo(
    () => landmarks.find((item) => item.id === selectedId),
    [landmarks, selectedId]
  );

  useEffect(() => {
    let active = true;

    async function loadLandmarks() {
      setIsLoading(true);
      setMessage('');

      try {
        const response = await fetch('/api/landmarks', { cache: 'no-store' });
        const data = (await response.json()) as { landmarks?: LandmarkRecord[]; error?: string };

        if (!response.ok) {
          throw new Error(data.error ?? 'Unable to load landmarks');
        }

        if (!active) return;
        setLandmarks(data.landmarks ?? []);
      } catch (error) {
        if (!active) return;
        setMessage(error instanceof Error ? error.message : 'Unable to load landmarks');
      } finally {
        if (active) setIsLoading(false);
      }
    }

    loadLandmarks();

    return () => {
      active = false;
    };
  }, []);

  const updateDraft = (field: keyof LandmarkDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const startNewLandmark = () => {
    setSelectedId(null);
    setDraft(emptyDraft);
    setIsEditing(true);
    setMessage('');
  };

  const openEditor = (item: LandmarkRecord) => {
    setSelectedId(item.id);
    setDraft(landmarkToDraft(item));
    setIsEditing(true);
    setMessage('');
  };

  const handleImageUpload = (file: File | undefined) => {
    if (!file) return;

    if (file.size > MAX_IMAGE_BYTES) {
      setMessage('Image size must be 300KB or less.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        updateDraft('image', reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const saveLandmark = async () => {
    setIsSaving(true);
    setMessage('');

    try {
      const response = await fetch(selectedId ? `/api/landmarks/${selectedId}` : '/api/landmarks', {
        method: selectedId ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(draft),
      });
      const data = (await response.json()) as { landmark?: LandmarkRecord; error?: string };

      if (!response.ok || !data.landmark) {
        throw new Error(data.error ?? 'Unable to save landmark');
      }

      setLandmarks((current) => {
        if (!selectedId) return [...current, data.landmark!];
        return current.map((item) => (item.id === selectedId ? data.landmark! : item));
      });
      setSelectedId(data.landmark.id);
      setDraft(landmarkToDraft(data.landmark));
      setMessage('Landmark saved to database.');
      setIsEditing(false);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to save landmark');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteLandmarkItem = async (id: number) => {
    setMessage('');

    try {
      const response = await fetch(`/api/landmarks/${id}`, { method: 'DELETE' });
      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? 'Unable to delete landmark');
      }

      setLandmarks((current) => current.filter((item) => item.id !== id));
      setMessage('Landmark deleted from database.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Unable to delete landmark');
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
          <h1 className="text-lg font-semibold tracking-tight">Landmarks Management</h1>
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
          <section className="rounded-[1.75rem] bg-gradient-to-br from-neutral-950 via-[#143C46] to-[#0A5C8E] p-6 text-white shadow-xl shadow-neutral-900/10 md:p-8">
            <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-start">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-bold text-white/80">
                  <LandmarkIconLucide className="h-3.5 w-3.5" />
                  Iconic Landmarks
                </div>
                <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Manage Landmark Listings</h2>
                <p className="mt-2 max-w-xl text-sm text-white/70">
                  Add, edit, or remove landmarks shown in the Iconic Landmarks section on the home page. Images are stored in the database.
                </p>
              </div>
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#0A5C8E] hover:bg-neutral-100"
                type="button"
                onClick={startNewLandmark}
              >
                <Plus className="h-4 w-4" />
                Add Landmark
              </button>
            </div>
          </section>

          {message && (
            <div className="mt-6 rounded-2xl border border-[#0A5C8E]/15 bg-[#0A5C8E]/10 px-4 py-3 text-sm font-semibold text-[#08486f]">
              {message}
            </div>
          )}

          {isEditing ? (
            <LandmarkEditor
              draft={draft}
              isSaving={isSaving}
              selectedLandmark={selectedLandmark}
              onBack={() => setIsEditing(false)}
              onChange={updateDraft}
              onImageUpload={handleImageUpload}
              onSave={saveLandmark}
            />
          ) : (
            <LandmarkList
              isLoading={isLoading}
              landmarks={landmarks}
              onDelete={deleteLandmarkItem}
              onEdit={openEditor}
              onNew={startNewLandmark}
            />
          )}
        </main>
      </div>
    </div>
  );
}

type LandmarkListProps = {
  landmarks: LandmarkRecord[];
  isLoading: boolean;
  onEdit: (item: LandmarkRecord) => void;
  onDelete: (id: number) => void | Promise<void>;
  onNew: () => void;
};

function LandmarkList({ landmarks, isLoading, onEdit, onDelete, onNew }: LandmarkListProps) {
  const [search, setSearch] = useState('');

  const filtered = landmarks.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="mt-10">
      <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h2 className="text-2xl font-semibold tracking-tight">Landmarks</h2>
        <div className="hidden items-center gap-2 rounded-2xl border border-neutral-200 bg-white px-4 py-2 md:flex">
          <Search className="h-4 w-4 text-neutral-400" />
          <input
            className="w-56 bg-transparent text-sm outline-none"
            placeholder="Search landmarks"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <div className="space-y-5">
        {isLoading && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-8 text-sm font-semibold text-neutral-500 shadow-sm">
            Loading landmarks from database...
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white p-10 text-center shadow-sm">
            <h3 className="text-lg font-semibold">No landmarks yet</h3>
            <p className="mt-2 text-sm text-neutral-500">Add the first landmark for the Iconic Landmarks section.</p>
            <button className="mt-5 rounded-2xl bg-neutral-900 px-5 py-3 text-sm font-semibold text-white hover:bg-neutral-800" type="button" onClick={onNew}>
              Add Landmark
            </button>
          </div>
        )}

        {filtered.map((item) => {
          const Icon = resolveLandmarkIcon(item.iconName);

          return (
            <article
              key={item.id}
              className="flex flex-col gap-5 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md xl:flex-row xl:items-center"
            >
              <div className="relative h-32 w-full overflow-hidden rounded-xl bg-neutral-100 xl:w-52">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(min-width: 1280px) 208px, 100vw"
                  className="object-cover"
                  unoptimized
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <Badge icon={Icon}>{item.category}</Badge>
                  {item.rating && <Badge icon={Star}>{item.rating} ({item.reviews ?? '0'})</Badge>}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold ${
                      item.status === 'Open' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <h3 className="truncate text-lg font-semibold">{item.name}</h3>
              </div>
              <div className="text-sm font-semibold text-neutral-700 xl:w-32">
                {item.price || 'Free'}
              </div>
              <div className="flex gap-2">
                <button className="rounded-xl bg-neutral-100 p-3 text-neutral-600 hover:bg-[#0A5C8E]/10 hover:text-[#0A5C8E]" type="button" onClick={() => onEdit(item)} aria-label={`Edit ${item.name}`}>
                  <Edit3 className="h-4 w-4" />
                </button>
                <button className="rounded-xl bg-neutral-100 p-3 text-neutral-600 hover:bg-red-50 hover:text-red-600" type="button" onClick={() => onDelete(item.id)} aria-label={`Delete ${item.name}`}>
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

type LandmarkEditorProps = {
  draft: LandmarkDraft;
  selectedLandmark?: LandmarkRecord;
  isSaving: boolean;
  onBack: () => void;
  onChange: (field: keyof LandmarkDraft, value: string) => void;
  onImageUpload: (file: File | undefined) => void;
  onSave: () => void | Promise<void>;
};

function LandmarkEditor({ draft, selectedLandmark, isSaving, onBack, onChange, onImageUpload, onSave }: LandmarkEditorProps) {
  return (
    <section className="mt-10">
      <div className="mb-6 flex flex-col justify-between gap-4 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm xl:flex-row xl:items-center">
        <div className="flex min-w-0 items-center gap-4">
          <button className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-500 hover:text-neutral-900" type="button" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
            Exit
          </button>
          <div className="h-6 w-px bg-neutral-200" />
          <div className="truncate text-sm font-semibold">{draft.name}</div>
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">{draft.status}</span>
        </div>
        <button
          className="inline-flex items-center gap-2 rounded-xl bg-[#0A5C8E] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#08486f] disabled:cursor-not-allowed disabled:opacity-60"
          type="button"
          onClick={onSave}
          disabled={isSaving}
        >
          <Save className="h-4 w-4" />
          {isSaving ? 'Saving...' : selectedLandmark ? 'Update' : 'Create'}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid grid-cols-1 gap-5 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-2">
          <Field label="Name" value={draft.name} onChange={(value) => onChange('name', value)} />
          <Field label="Category" value={draft.category} onChange={(value) => onChange('category', value)} />
          <Field label="Rating" value={draft.rating} onChange={(value) => onChange('rating', value)} />
          <Field label="Reviews" value={draft.reviews} onChange={(value) => onChange('reviews', value)} />
          <Field label="Price (blank = Free)" value={draft.price} onChange={(value) => onChange('price', value)} />

          <label className="block">
            <span className="text-xs font-bold uppercase text-neutral-500">Status</span>
            <select
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0A5C8E]"
              value={draft.status}
              onChange={(event) => onChange('status', event.target.value)}
            >
              <option>Open</option>
              <option>Closed</option>
            </select>
          </label>

          <label className="block">
            <span className="text-xs font-bold uppercase text-neutral-500">Icon</span>
            <select
              className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0A5C8E]"
              value={draft.iconName}
              onChange={(event) => onChange('iconName', event.target.value)}
            >
              {LANDMARK_ICON_NAMES.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <aside className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-sm font-bold">
            <ImageIcon className="h-4 w-4 text-[#0A5C8E]" />
            Landmark Image
          </div>
          <div className="relative mb-3 h-44 overflow-hidden rounded-xl bg-neutral-100">
            <Image src={draft.image} alt={draft.name} fill sizes="320px" className="object-cover" unoptimized />
          </div>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-neutral-300 bg-neutral-50 px-4 py-6 text-center text-xs font-semibold text-neutral-500 hover:border-[#0A5C8E] hover:text-[#0A5C8E]">
            <Upload className="mb-2 h-5 w-5" />
            Upload image up to 300KB
            <input className="hidden" type="file" accept="image/*" onChange={(event) => onImageUpload(event.target.files?.[0])} />
          </label>
        </aside>
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

type FieldProps = {
  label: string;
  value: string;
  type?: string;
  onChange: (value: string) => void;
};

function Field({ label, value, type = 'text', onChange }: FieldProps) {
  return (
    <label className="block">
      <span className="text-xs font-bold uppercase text-neutral-500">{label}</span>
      <input
        className="mt-2 w-full rounded-xl border border-neutral-200 bg-white px-3 py-3 text-sm outline-none focus:border-[#0A5C8E]"
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
