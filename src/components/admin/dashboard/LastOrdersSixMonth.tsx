import { GraphicBar, type ChartConfig } from "@/components/ui/chart";


const chartData = [
  { month: "January", pedidos: 186 },
  { month: "February", pedidos: 305 },
  { month: "March", pedidos: 237 },
  { month: "April", pedidos: 73 },
  { month: "May", pedidos: 209 },
  { month: "June", pedidos: 214 },
];

const chartConfig = {
  Pedidos: {
    label: "Pedidos",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;


export function LastOrdersSixMonth() {
  return (
    <main className="border border-gray-200 rounded-md bg-white max-w-4xl w-full ">
      <GraphicBar config={chartConfig} data={chartData} title="Pedidos nos ultimos meses" dataKey="pedidos" titleColunm="month"/>
    </main>
  );
}
