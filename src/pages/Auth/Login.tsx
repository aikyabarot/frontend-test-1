import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  return (
    <div className="max-w-sm mx-auto mt-16 p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <h1 className="text-lg font-semibold mb-4">Login</h1>
      <form className="space-y-4" onSubmit={e => e.preventDefault()}>
        <div>
          <label className="block text-sm mb-1" htmlFor="email">Email</label>
          <input id="email" type="email" className="w-full rounded border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm"
                 value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label className="block text-sm mb-1" htmlFor="password">Password</label>
          <input id="password" type="password" className="w-full rounded border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-sm" />
        </div>
        <button className="w-full py-2 rounded bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium">
          Sign In
        </button>
      </form>
    </div>
  );
}