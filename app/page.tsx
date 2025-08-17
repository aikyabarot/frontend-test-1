"use client";

import dynamic from "next/dynamic";
import { ChartCard } from "@/components/charts/ChartCard";
import { useMemo } from "react";

const Line = dynamic(() => import("react-chartjs-2").then(m => m.Line), { ssr: false });

export default function HomePage() {
  const data = useMemo(
    () => ({
      labels: Array.from({ length: 7 }, (_, i) => `Day ${i + 1}`),
      datasets: [
        {
          label: "Sessions",
          data: [120, 180, 150, 220, 300, 280, 350],
          borderColor: "rgb(59,130,246)",
          backgroundColor: "rgba(59,130,246,0.3)",
          tension: 0.3,
          fill: true
        }
      ]
    }),
    []
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "top" }
      },
      interaction: { intersect: false, mode: "index" },
      scales: {
        x: {
          grid: { display: false }
        },
        y: {
          beginAtZero: true
        }
      }
    }),
    []
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3 auto-rows-[220px]">
      <ChartCard title="Sessions (Last 7 Days)">
        <Line data={data} options={options} />
      </ChartCard>
      <ChartCard title="Placeholder Metric">
        <div className="flex items-center justify-center h-full text-muted-foreground">
          Coming soon...
        </div>
      </ChartCard>
      <ChartCard title="Another Metric">
        <div className="flex items-center justify-center h-full text-muted-foreground">
          TBD
        </div>
      </ChartCard>
    </div>
  );
}
