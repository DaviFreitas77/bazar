import type { ReactNode } from "react";

interface MetricItem {
  styleCard?:string;
  title: string;
  titleStyle?: string;
   value: ReactNode;
   valueStyle?:string;
  footer?: ReactNode;
  footerColor?: string;
}

interface MetricsProps {
  items: MetricItem[];
}

export function Metrics({ items }: MetricsProps) {
  return (
    <section className="w-full py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sha">
          {items.map((item, index) => (
            <div
              key={index}
              className={`flex flex-col gap-4 px-4 border border-gray-200 rounded-lg bg-primary-200 py-5 ${item.styleCard}`}
            >
              <span   className={`${item.titleStyle ??"text-gray-800 font-semibold text-sm"}`}>
                {item.title}
              </span>

              <span className={`${item.valueStyle ??"text-gray-700 font-semibold text-3xl"}`}>
                {item.value}
              </span>

              {item.footer && (
                <span
                  className={`text-sm ${
                    item.footerColor ?? "text-gray-500"
                  }`}
                >
                  {item.footer}
                </span>
              )}
            </div>
          ))}
        </div>
    </section>
  );
}
