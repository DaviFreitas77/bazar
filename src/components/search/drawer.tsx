import { SheetSearch } from "../ui/sheet";
import { AccordionFilter } from "@/components/ui/accordion";
import { SliderProduct } from "@/components/ui/slider";

interface DrawerFilterMobileProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  allColors: string[];
  allSizes: string[];
  allCategories: string[];
  selectedColor: string;
  selectedSize: string;
  selectedcategorie: string;
    maxPrice:number;
  minPrice:number;
  valueChange:React.Dispatch<React.SetStateAction<number[]>>
  applyFilterProducts: (
    filter: "filterColor" | "filterSize" | "filtercategory",
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
  allCategories,
  selectedcategorie,
  applyFilterProducts,
  maxPrice,minPrice,valueChange
}: DrawerFilterMobileProps) {
  return (
    <SheetSearch open={open} onOpenChange={onOpenChange} side="left" tittle="Filtros">

      <AccordionFilter name="Categorias">
          {allCategories.map((category, index) => (
            <label key={index} className={`flex items-center gap-2 cursor-pointer text-gray-500 hover:text-primary-100 mt-1 capitalize`}>
              <input
                type="checkbox"
                value={category}
                checked={selectedcategorie === category}
                className="accent-primary-100 w-4 h-4"
                onChange={(e) => {
                  applyFilterProducts("filtercategory", e.target.value);
                }}
              />
              <span className={`${selectedcategorie === category ? "text-primary-100" : ""}`}>{category}</span>
            </label>
          ))}
        </AccordionFilter>

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
          <SliderProduct maxPrice={maxPrice} minPrice={minPrice} valueChange={valueChange}/>
        </div>
      </AccordionFilter>
    </SheetSearch>
  );
}
