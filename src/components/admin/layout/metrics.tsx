import type { ReactNode } from "react";

interface MetricItem {
  title: string;
   value: ReactNode;
  footer?: ReactNode;
  footerColor?: string;
}

interface MetricsProps {
  items: MetricItem[];
}

export function Metrics({ items }: MetricsProps) {
  return (
    <section className="w-full  py-4">
      <div className="border border-gray-200 rounded-lg p-4 bg-white ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200 ">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 px-4 py-4">
              <span className="text-gray-800 font-semibold text-base">{item.title}</span>

              <span className="text-2xl font-bold text-gray-700">{item.value}</span>

              <span className={`text-base ${item.footerColor ?? "text-gray-500"}`}>{item.footer}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
