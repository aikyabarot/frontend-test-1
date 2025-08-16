import { SampleBarChart } from '../../components/charts/SampleBarChart';
import { mockMetrics } from '../../state/mockData';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {mockMetrics.map(m => (
          <div key={m.key} className="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
            <div className="text-sm text-gray-500">{m.label}</div>
            <div className="mt-1 text-2xl font-bold">{m.value}</div>
            <div className="text-xs text-gray-400">{m.delta >= 0 ? '+' : ''}{m.delta}% vs last week</div>
          </div>
        ))}
      </div>
      <div className="rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4">
        <h2 className="font-medium mb-4">Applications Overview</h2>
        <SampleBarChart />
      </div>
    </div>
  );
}