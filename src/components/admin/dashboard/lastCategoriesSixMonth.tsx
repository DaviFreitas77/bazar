import { GraphicBar, type ChartConfig } from "@/components/ui/chart";


const chartData = [
  { categorias: "camiseta", vendido: 186 },
  { categorias: "calça", vendido: 305 },
  { categorias: "vestido", vendido: 237 },
  { categorias: "tenis", vendido: 73 },
  { categorias: "meia", vendido: 209 },
  { categorias: "chapéu", vendido: 214 },
];

const chartConfig = {
  categories: {
    label: "categories",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;


export function LastCategoriesSixMonth() {
  return (
    <main className="border border-gray-200 rounded-md bg-white max-w-4xl w-full ">
      <GraphicBar config={chartConfig} data={chartData} title="Categorias mais vendidas " dataKey="vendido" titleColunm="categorias"/>
    </main>
  );
}
