
import { BreadcrumbPages } from "@/components/ui/breadcrumb";
import { AccordionFilter } from "@/components/ui/accordion";
import { SliderProduct } from "@/components/ui/slider";
interface DrawerDesktopProps{
    allColors:string[],
    allSizes:string[],
    selectedColor:string,
    selectedSize:string,
    applyFilterProducts:(filter:"filterColor"|"filterSize",value:string)=>void
}
export function DrawerDesktop({allColors,allSizes,selectedColor,selectedSize,applyFilterProducts}:DrawerDesktopProps){
    return(
          <section className="max-w-xs w-full h-screen rounded-md mt-10 hidden lg:block">
            <div className="w-full max-w-7xl">
              <BreadcrumbPages />

              <AccordionFilter name="Cores">
                {allColors.map((color) => (
                  <label
                    key={color}
                    className={`flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black mt-1 capitalize`}
                  >
                    <input
                      type="checkbox"
                      value={color}
                      checked={selectedColor === color}
                      className="accent-black w-4 h-4"
                      onChange={(e) => {
                        applyFilterProducts("filterColor", e.target.value);
                      }}
                    />
                    <span
                      className={`${
                        selectedColor === color ? "text-black" : ""
                      }`}
                    >
                      {color}
                    </span>
                  </label>
                ))}
              </AccordionFilter>
              <AccordionFilter name="Tamanhos">
                {allSizes.map((sizes) => (
                  <label
                    key={sizes}
                    className="flex items-center gap-2 cursor-pointer text-gray-500 hover:text-black mt-1 py-1"
                  >
                    <input
                      type="checkbox"
                      value={sizes}
                      checked={selectedSize === sizes}
                      className="accent-black w-4 h-4"
                      onChange={(e) => {
                        applyFilterProducts("filterSize", e.target.value);
                      }}
                    />
                    <span
                      className={`${
                        selectedSize === sizes ? "text-black" : ""
                      }`}
                    >
                      {sizes}
                    </span>
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
    )
}