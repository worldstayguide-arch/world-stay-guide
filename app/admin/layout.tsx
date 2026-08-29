import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { AUTH_COOKIE_NAME, verifySessionToken } from '@/lib/auth';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = verifySessionToken(cookieStore.get(AUTH_COOKIE_NAME)?.value);

  if (!session) {
    redirect('/login');
  }

  return children;
}
