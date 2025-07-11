'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function NotFoundClient() {
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || 'unknown';

  return (
    <div className="text-center space-y-4">
      <h1 className="text-4xl font-bold text-white">404 - Page Not Found</h1>
      <p className="text-lg text-white">You may have come from: <strong>{from}</strong></p>
      <p className="text-white">Please check the URL or return to the homepage.</p>
      <Link
        href="/"
        className="inline-block bg-[var(--dark-blue)] text-white px-6 py-3 rounded-lg text-lg hover:bg-[var(--mid-blue)] transition-all"
      >
        ⬅ Back to Home
      </Link>
    </div>
  );
}
