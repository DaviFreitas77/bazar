import { SheetSearch } from "../ui/sheet";
import { AccordionFilter } from "@/components/ui/accordion";
import { SliderProduct } from "@/components/ui/slider";

interface DrawerFilterMobileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allColors: string[];
  allSizes: string[];
  selectedColor: string;
  selectedSize: string;
  applyFilterProducts: (
    filter: "filterColor" | "filterSize",
    value: string
  ) => void;
}

export function DrawerFilterMobile({
  open,
  onOpenChange,
  allColors,
  allSizes,
  selectedColor,
  selectedSize,
  applyFilterProducts,
}: DrawerFilterMobileProps) {
  return (
    <SheetSearch open={open} onOpenChange={onOpenChange} side="left" tittle="Filtros">
      <AccordionFilter name="Cores">
        {allColors.map((color) => (
          <label
            key={color}
            className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-primary-100 mt-1 capitalize"
          >
            <input
              type="checkbox"
              value={color}
              checked={selectedColor === color}
              className="accent-primary-100 w-4 h-4"
              onChange={(e) =>
                applyFilterProducts("filterColor", e.target.value)
              }
            />
            <span className={selectedColor === color ? "text-primary-100" : ""}>
              {color}
            </span>
          </label>
        ))}
      </AccordionFilter>

      <AccordionFilter name="Tamanhos">
        {allSizes.map((size) => (
          <label
            key={size}
            className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-primary-100 mt-1 py-1"
          >
            <input
              type="checkbox"
              value={size}
              checked={selectedSize === size}
              className="accent-primary-100 w-4 h-4"
              onChange={(e) =>
                applyFilterProducts("filterSize", e.target.value)
              }
            />
            <span className={selectedSize === size ? "text-primary-100" : ""}>
              {size}
            </span>
          </label>
        ))}
      </AccordionFilter>

      <AccordionFilter name="Preço">
        <div className="mt-2">
          <SliderProduct />
        </div>
      </AccordionFilter>
    </SheetSearch>
  );
}
