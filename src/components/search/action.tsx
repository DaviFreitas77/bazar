import { BsGrid, BsGrid1X2 } from "react-icons/bs";
import { DropDown, NativeSelectOption } from "../ui/native-select";

interface ActionButtonsProps {
  products: any[];
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
  setDrawerOpen: (value: boolean) => void;
  filterOrder: string;
  setFilterOrder: (value: string) => void;
}
export function ActionButtons({ showSidebar, setShowSidebar, setDrawerOpen, filterOrder, setFilterOrder }: ActionButtonsProps) {
  return (
    <section className={`flex justify-between items-center mt-4 mb-2    ${showSidebar ? "w-full max-w-7xl xl:pr-5 pr-0" : "w-full xl:pr-8 pr-0"}`}>
      <div className="flex gap-2">
        <button onClick={() => setShowSidebar(false)} className={`hidden lg:block p-2 rounded-md hover:bg-gray-200 transition ${showSidebar ? "bg-gray-100" : "bg-gray-200"} cursor-pointer`}>
          <BsGrid />
        </button>
        <button onClick={() => setShowSidebar(true)} className={`hidden lg:block p-2 rounded-md hover:bg-gray-200 transition ${showSidebar ? "bg-gray-200" : "bg-gray-100"} cursor-pointer`}>
          <BsGrid1X2 />
        </button>

        {/* open Drawer mobile */}
        <button onClick={() => setDrawerOpen(true)} className="lg:hidden p-2 rounded-md bg-gray-100 hover:bg-gray-200">
          <BsGrid1X2 />
        </button>
      </div>
      <DropDown title="Ordenar por" value={filterOrder} onChange={setFilterOrder}>
        <NativeSelectOption value="relevance">Relevância</NativeSelectOption>
        <NativeSelectOption value="lowestPrice">Menor preço</NativeSelectOption>
        <NativeSelectOption value="highestPrice">Maior preço</NativeSelectOption>
      </DropDown>
    </section>
  );
}
