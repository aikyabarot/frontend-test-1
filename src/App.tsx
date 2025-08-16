import { AppRoutes } from './routes';
import { Sidebar } from './components/layout/Sidebar';
import { TopBar } from './components/layout/TopBar';

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}