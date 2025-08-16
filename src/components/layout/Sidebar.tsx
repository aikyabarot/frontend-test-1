import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '../../utils/cn';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/candidates', label: 'Candidates' },
  { to: '/clients', label: 'Clients' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/users', label: 'Users' }
];

export function Sidebar() {
  const [open, setOpen] = useState(true);
  return (
    <aside className={cn(
      'h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col transition-all',
      open ? 'w-56' : 'w-16'
    )}>
      <div className="h-[var(--header-height)] flex items-center justify-between px-3">
        <span className="font-semibold text-sm truncate">Talent</span>
        <button onClick={() => setOpen(o => !o)} className="text-xs text-gray-500">
          {open ? '‹' : '›'}
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 space-y-1">
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              cn('block rounded px-3 py-2 text-sm',
                isActive
                  ? 'bg-brand-600 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800')
              }>
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}