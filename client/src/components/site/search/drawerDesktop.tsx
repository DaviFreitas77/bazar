import { BreadcrumbPages } from "@/components/ui/breadcrumb";
import { AccordionFilter } from "@/components/ui/accordion";
import { SliderProduct } from "@/components/ui/slider";
import { useProductsSearched } from "@/context/productsSearchedContext";

type SubCategoriesType = {
  id: number;
  name: string;
  id_category: number;
};
export interface DrawerDesktopProps {
  allColors: string[];
  allSizes: string[];
  changeColor: (color: string) => void;
  changeSize: (size: string) => void;
  changeCategory: (category: string) => void;
  changeSubCategory: (subCategory: string) => void;
  allCategories?: string[];
  selectedColor: string;
  selectedSize: string;
  selectedcategorie: string;
  subCategories: SubCategoriesType[];
  selectedSubCategory: string;
  maxPrice: number;
  minPrice: number;
  valueChange: React.Dispatch<React.SetStateAction<number[]>>;
}
export function DrawerDesktop({ allColors, allSizes, selectedColor, selectedSize, selectedcategorie, allCategories, subCategories, maxPrice, minPrice, selectedSubCategory, changeCategory, changeColor, changeSize, changeSubCategory, valueChange }: DrawerDesktopProps) {
  const { nameProduct } = useProductsSearched();
  return (
    <section className="max-w-xs w-full h-screen rounded-md mt-10 hidden lg:block">
      <div className="w-full max-w-7xl">
        <BreadcrumbPages pageName={["Pesquisa", nameProduct || ""]} />

        {allCategories && allCategories?.length > 0 && (
          <AccordionFilter name="Categorias" value="item-1">
            {allCategories &&
              allCategories.map((category, index) => (
                <label key={index} className={`flex items-center gap-2 cursor-pointer text-gray-500 hover:text-primary-50 mt-1 capitalize`}>
                  <input type="checkbox" value={category} checked={selectedcategorie === category} className="accent-primary-50 w-4 h-4" onChange={(e) => changeCategory(e.target.value)} />
                  <span className={`${selectedcategorie === category ? "text-primary-50" : ""}`}>{category}</span>
                </label>
              ))}
          </AccordionFilter>
        )}

        {subCategories && subCategories.length > 0 && (
          <AccordionFilter name="Modelos" value="item-1">
            {subCategories.map((subCategory) => (
              <label key={subCategory.id} className={`flex items-center gap-2 cursor-pointer text-gray-500 hover:text-primary-50 mt-1 capitalize`}>
                <input type="checkbox" value={subCategory.name} checked={selectedSubCategory === subCategory.name} className="accent-primary-50 w-4 h-4" onChange={() => changeSubCategory(subCategory.name)} />
                <span className={`${selectedSubCategory === subCategory.name ? "text-primary-50" : ""}`}>{subCategory.name}</span>
              </label>
            ))}
          </AccordionFilter>
        )}

        <AccordionFilter name="Cores" value="item-1">
          {allColors.map((color, index) => (
            <label key={index} className={`flex items-center gap-2 cursor-pointer text-gray-500 hover:text-primary-50 mt-1 capitalize`}>
              <input type="checkbox" value={color} checked={selectedColor === color} className="accent-primary-50 w-4 h-4" onChange={(e) => changeColor(e.target.value)} />
              <span className={`${selectedColor === color ? "text-primary-50" : ""}`}>{color}</span>
            </label>
          ))}
        </AccordionFilter>
        <AccordionFilter name="Tamanhos" value="item-1">
          {allSizes.map((sizes, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-primary-100 mt-1 py-1">
              <input type="checkbox" value={sizes} checked={selectedSize === sizes} className="accent-primary-100 w-4 h-4" onChange={(e) => changeSize(e.target.value)} />
              <span className={`${selectedSize === sizes ? "text-primary-50" : ""}`}>{sizes}</span>
            </label>
          ))}
        </AccordionFilter>
        <AccordionFilter name="Preço" value="item-2">
          <div className="mt-2">
            <SliderProduct maxPrice={maxPrice} minPrice={minPrice} valueChange={valueChange} />
          </div>
        </AccordionFilter>
      </div>
    </section>
  );
}
