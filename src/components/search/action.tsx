import { BsGrid, BsGrid1X2 } from "react-icons/bs";
interface ActionButtonsProps {
  products: any[];
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
  setDrawerOpen: (value: boolean) => void;
}
export function ActionButtons({
  showSidebar,
  products,
  setShowSidebar,
  setDrawerOpen,
}: ActionButtonsProps) {
  return (
    <section
      className={`flex justify-between items-center mt-4 mb-2    ${
        showSidebar ? "w-full max-w-7xl pr-5" : "w-full pr-8"
      }`}
    >
      <div className="flex gap-2">
        <button
          onClick={() => setShowSidebar(false)}
          className={`hidden lg:block p-2 rounded-md hover:bg-gray-200 transition ${
            showSidebar ? "bg-gray-100" : "bg-gray-200"
          } cursor-pointer`}
        >
          <BsGrid />
        </button>
        <button
          onClick={() => setShowSidebar(true)}
          className={`hidden lg:block p-2 rounded-md hover:bg-gray-200 transition ${
            showSidebar ? "bg-gray-200" : "bg-gray-100"
          } cursor-pointer`}
        >
          <BsGrid1X2 />
        </button>

        {/* open Drawer mobile */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="lg:hidden p-2 rounded-md bg-gray-100 hover:bg-gray-200"
        >
          <BsGrid1X2 />
        </button>

        <button className="bg-gray-100 px-3 py-2 rounded-md text-sm hover:bg-gray-200 transition">
          Ordenar por
        </button>
      </div>
      <p className="underline underline-offset-4 text-sm">
        {products.length} Resultados
      </p>
    </section>
  );
}
