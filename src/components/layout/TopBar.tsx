import { useTheme } from '../../state/ThemeContext';

export function TopBar() {
  const { theme, toggle } = useTheme();
  return (
    <header className="h-[var(--header-height)] flex items-center justify-end px-4 border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
      <button
        onClick={toggle}
        className="text-xs px-3 py-1 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800">
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </header>
  );
}