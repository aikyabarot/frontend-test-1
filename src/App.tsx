import { useState } from 'react';

import { Hello } from './components/Hello';

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-start gap-8 p-8">
      <header className="w-full pt-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-sky-600">
          Frontend Test Starter
        </h1>
        <p className="mt-2 text-gray-600">
          React + TypeScript + Parcel + Tailwind + Jest
        </p>
      </header>

      <section className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <Hello name="Developer" />
        <div className="mt-4 flex flex-col items-center gap-3">
          <button
            className="btn"
            onClick={() => setCount((c) => c + 1)}
            aria-label="Increment counter"
          >
            Count: {count}
          </button>
          <p className="text-sm text-gray-500">
            Edit <code className="rounded bg-gray-100 px-1 py-0.5">src/App.tsx</code> and
            save to see HMR.
          </p>
        </div>
      </section>

      <footer className="mt-auto pb-4 text-xs text-gray-400">
        MIT Licensed · {new Date().getFullYear()}
      </footer>
    </main>
  );
}