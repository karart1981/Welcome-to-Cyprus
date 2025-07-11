import { Suspense } from 'react';
import NotFoundClient from './NotFoundClient';

export default function NotFound() {
  return (
  <div className="flex items-center justify-center w-full min-h-screen bg-[var(--mid-teal)] text-black overflow-y-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <NotFoundClient />
      </Suspense>
    </div>
  );
}
