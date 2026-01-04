import { BreadcrumbPages } from "@/components/ui/breadcrumb";
import { AccordionFilter } from "@/components/ui/accordion";
import { SliderProduct } from "@/components/ui/slider";
import { useProductsSearched } from "@/context/productsSearchedContext";
interface DrawerDesktopProps {
  allColors: string[];
  allSizes: string[];
  allCategories: string[];
  selectedColor: string;
  selectedSize: string;
  selectedcategorie: string;

  applyFilterProducts: (filter: "filterColor" | "filterSize" | "filtercategory", value: string) => void;
}
export function DrawerDesktop({ allColors, allSizes, selectedColor, selectedSize, selectedcategorie, allCategories, applyFilterProducts }: DrawerDesktopProps) {
    const { nameProduct } = useProductsSearched();
  return (
    <section className="max-w-xs w-full h-screen rounded-md mt-10 hidden lg:block">
      <div className="w-full max-w-7xl">
        <BreadcrumbPages pageName={['Pesquisa', nameProduct || ""]} />

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
          {allColors.map((color, index) => (
            <label key={index} className={`flex items-center gap-2 cursor-pointer text-gray-500 hover:text-primary-100 mt-1 capitalize`}>
              <input
                type="checkbox"
                value={color}
                checked={selectedColor === color}
                className="accent-primary-100 w-4 h-4"
                onChange={(e) => {
                  applyFilterProducts("filterColor", e.target.value);
                }}
              />
              <span className={`${selectedColor === color ? "text-primary-100" : ""}`}>{color}</span>
            </label>
          ))}
        </AccordionFilter>
        <AccordionFilter name="Tamanhos">
          {allSizes.map((sizes, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-primary-100 mt-1 py-1">
              <input
                type="checkbox"
                value={sizes}
                checked={selectedSize === sizes}
                className="accent-primary-100 w-4 h-4"
                onChange={(e) => {
                  applyFilterProducts("filterSize", e.target.value);
                }}
              />
              <span className={`${selectedSize === sizes ? "text-primary-100" : ""}`}>{sizes}</span>
            </label>
          ))}
        </AccordionFilter>
        <AccordionFilter name="Preço">
          <div className="mt-2">
            <SliderProduct />
          </div>
        </AccordionFilter>
      </div>
    </section>
  );
}
