import React from "react";

interface Props {
  title: string;
  children: React.ReactNode;
}

export function ChartCard({ title, children }: Props) {
  return (
    <section className="rounded-md border flex flex-col bg-card text-card-foreground overflow-hidden">
      <header className="px-4 py-2 border-b text-sm font-medium">
        {title}
      </header>
      <div className="flex-1 p-4 relative">
        <div className="absolute inset-0 p-4">{children}</div>
      </div>
    </section>
  );
}
