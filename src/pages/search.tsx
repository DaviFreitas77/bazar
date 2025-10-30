
import {
  getProducts,
  searchProducts,
  filterColorsProducts,
  filterSizesProducts,
} from "@/utils/productsUtild";
import { CardProduct } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DrawerFilterMobile } from "@/components/search/drawer";
import { BannerSearch } from "@/components/search/banner";
import { PaginationSearch } from "@/components/search/pagination";
import { EmptyProduct } from "@/components/search/emptyProduct";
import { ActionButtons } from "@/components/search/action";
import { DrawerDesktop } from "@/components/search/drawerDesktop";

export function Search() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q");
  const [currentPage, setCurrentPage] = useState(1);
  let productsPerPage = 16;

  const applyFilterProducts = (filter: string, value: string) => {
    if (filter === "filterColor") {
      setSelectedColor((prev) => (prev === value ? "" : value));
    }
    if (filter === "filterSize") {
      setSelectedSize((prev) => (prev === value ? "" : value));
    }
  };
  const products = useMemo(() => {
    return search ? searchProducts(search) : getProducts();
  }, [search]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (selectedColor) {
      result = filterColorsProducts(selectedColor, result);
    }

    if (selectedSize) {
      result = filterSizesProducts(selectedSize, result);
    }

    return result;
  }, [products, selectedColor, selectedSize]);

  const indexOfLastItem = currentPage * productsPerPage;
  const indexOfFirstItem = indexOfLastItem - productsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  //cores do produto para filtro
  const allColors = [
    ...new Set(currentItems.flatMap((product) => product.color)),
  ];
  const allSizes = [
    ...new Set(currentItems.flatMap((product) => product.sizes)),
  ];

  return (
    <main className=" px-2 md:px-6 flex flex-col gap-6">
      <section className="flex gap-6 justify-center ">
        {showSidebar ? (
          <DrawerDesktop allColors={allColors}  allSizes={allSizes} selectedColor={selectedColor} selectedSize={selectedSize} applyFilterProducts={applyFilterProducts}/>
        ) : null}


        <DrawerFilterMobile
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          allColors={allColors}
          allSizes={allSizes}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          applyFilterProducts={applyFilterProducts}
        />

        {/* Conteúdo principal */}
        <div
          className={` flex flex-col   items-center ${
            showSidebar ? "w-full max-w-[1300px]" : "w-full max-w-[1920px]"
          }`}
        >
          <BannerSearch showSidebar={showSidebar}/>

          
        <ActionButtons showSidebar={showSidebar} products={products} setShowSidebar={setShowSidebar} setDrawerOpen={setDrawerOpen}/>

          {/* Grid de produtos */}
          <div
            className={` grid gap-2 w-full  ${
              showSidebar
                ? "grid-cols-2 md:grid-cols-3  xl:grid-cols-4"
                : "grid-cols-2 md:grid-cols-3  lg:grid-cols-4 2xl:grid-cols-5 max-w-[1920px]"
            }`}
          >
            {currentItems.map((product) => (
              <CardProduct
                key={product.id}
                idProduct={product.id}
                nameProduct={product.productName}
                tamanhos={product.sizes}
                currentPrice={product.currentPrice}
                originalPrice={product.originalPrice}
                imageUrl={product.image[0]}
              />
            ))}
          </div>

          {currentItems.length === 0 ? (
           <EmptyProduct inputValue={inputValue} setInputValue={setInputValue} setSearchParams={setSearchParams} />
          ) : (
           <PaginationSearch  currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} />
          )}
        </div>
      </section>
    </main>
  );
}
