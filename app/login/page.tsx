'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { LockKeyhole, LogIn, Mail, MapPin } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('support123@worldstayguide.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    setIsLoading(false);

    if (!response.ok) {
      const result = (await response.json()) as { message?: string };
      setError(result.message ?? 'Unable to login.');
      return;
    }

    router.push('/admin/blogs');
    router.refresh();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-neutral-950">
      <Image
        src="/hero-pakistan-mountains.jpg"
        alt="Pakistan mountain landscape"
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-65"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-950/80 to-[#0A5C8E]/70" />

      <section className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md rounded-2xl border border-white/15 bg-white/95 p-6 shadow-2xl shadow-black/30 backdrop-blur md:p-8">
          <div className="mb-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0A5C8E] text-white">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <div className="text-xl font-semibold tracking-tight text-neutral-950">WorldStayGuide</div>
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-400">
                  Admin Login
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">Welcome back</h1>
            <p className="mt-2 text-sm leading-6 text-neutral-500">
              Sign in to manage blog posts, uploads, and travel content.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase text-neutral-500">Email</span>
              <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 focus-within:border-[#0A5C8E]">
                <Mail className="h-4 w-4 text-neutral-400" />
                <input
                  className="w-full bg-transparent text-sm font-medium outline-none"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-bold uppercase text-neutral-500">Password</span>
              <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 focus-within:border-[#0A5C8E]">
                <LockKeyhole className="h-4 w-4 text-neutral-400" />
                <input
                  className="w-full bg-transparent text-sm font-medium outline-none"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </div>
            </label>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </div>
            )}

            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0A5C8E] px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-[#08486f] disabled:cursor-not-allowed disabled:opacity-70"
              type="submit"
              disabled={isLoading}
            >
              <LogIn className="h-4 w-4" />
              {isLoading ? 'Signing in...' : 'Login'}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
