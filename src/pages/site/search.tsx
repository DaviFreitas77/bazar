import { filterCategory, filterColorsProducts, filterSizesProducts } from "@/utils/productsUtild";
import { CardProduct } from "@/components/ui/cardProduct";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DrawerFilterMobile } from "@/components/site/search/drawer";
import { BannerSearch } from "@/components/site/search/banner";
import { Pagination } from "@/components/site/search/pagination";
import { EmptyProduct } from "@/components/site/search/emptyProduct";
import { ActionButtons } from "@/components/site/search/action";
import { DrawerDesktop } from "@/components/site/search/drawerDesktop";
import { useAllProducts } from "@/hooks/site/useAllProducts";
import { LoadingPage } from "@/components/site/loading/loadingPage";
import type { Product } from "@/@types/product";
import { hookSearchParams } from "@/hooks/site/useSearchParams";


export function Search() {

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedcategorie, setSelectedcategorie] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOrder, setFilterOrder] = useState("relevance");



  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);
  let productsPerPage = 16;
  const { data: allProducts, isLoading: isLoadingAllProducts } = useAllProducts();
  const { data: productsSearched } = hookSearchParams(search);

  const baseProducts = allProducts ?? productsSearched ?? [];

  const [minPrice, maxPrice] = useMemo(() => {
    if (!baseProducts.length) return [0, 0];

    return [Math.min(...baseProducts.map((p) => p.price)), Math.max(...baseProducts.map((p) => p.price))];
  }, [baseProducts]);

  if (baseProducts.length && priceRange[0] === 0 && priceRange[1] === 0) {
    setPriceRange([minPrice, maxPrice]);
  }

  const applyFilterProducts = (filter: string, value: string) => {
    if (filter === "filterColor") {
      setSelectedColor((prev) => (prev === value ? "" : value));
    }
    if (filter === "filterSize") {
      setSelectedSize((prev) => (prev === value ? "" : value));
    }
    if (filter === "filtercategory") {
      setSelectedcategorie((prev) => (prev === value ? "" : value));
    }
  };

  const filteredProducts = useMemo(() => {
    let result: Product[] = productsSearched ?? allProducts ?? [];

    if (selectedColor) {
      result = filterColorsProducts(selectedColor, result);
    }

    if (selectedSize) {
      result = filterSizesProducts(selectedSize, result);
    }

    if (selectedcategorie) {
      result = filterCategory(selectedcategorie, result);
    }

    //order
    if (filterOrder === "highestPrice") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (filterOrder === "lowestPrice") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (priceRange) {
      const filteredByPrice = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

      if (filteredByPrice.length > 0) {
        result = filteredByPrice;
      }
    }

    return result;
  }, [selectedColor, selectedSize, allProducts, selectedcategorie, productsSearched, filterOrder, priceRange]);

  const indexOfLastItem = currentPage * productsPerPage;
  const indexOfFirstItem = indexOfLastItem - productsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const allColors = [...new Set(filteredProducts.flatMap((product) => product.color))];
  const allSizes = [...new Set(filteredProducts.flatMap((product) => product.sizes))];
  const allCategories = [...new Set(filteredProducts.flatMap((product) => product.category.name))];

  return (
    <main className="px-2 md:px-6 flex flex-col gap-6">
      {isLoadingAllProducts ? (
        <section className="flex items-center justify-center h-screen w-full">
          <LoadingPage />
        </section>
      ) : (
        <section className="flex gap-6 justify-center">
          {currentItems.length === 0 ? null : (
            <>
              {showSidebar && (
                <DrawerDesktop
                  allColors={allColors}
                  allSizes={allSizes}
                  selectedColor={selectedColor}
                  selectedcategorie={selectedcategorie}
                  allCategories={allCategories}
                  selectedSize={selectedSize}
                  applyFilterProducts={applyFilterProducts}
                  maxPrice={maxPrice}
                  minPrice={minPrice}
                  valueChange={setPriceRange}
                />
              )}

              <DrawerFilterMobile
                open={drawerOpen}
                onOpenChange={setDrawerOpen}
                allColors={allColors}
                allSizes={allSizes}
                selectedColor={selectedColor}
                selectedSize={selectedSize}
                applyFilterProducts={applyFilterProducts}
                selectedcategorie={selectedcategorie}
                allCategories={allCategories}
                maxPrice={maxPrice}
                minPrice={minPrice}
                valueChange={setPriceRange}
              />
            </>
          )}

          <div className={`flex flex-col items-center ${showSidebar ? "w-full max-w-[1100px]" : "w-full max-w-[1420px]"}`}>
            {currentItems.length === 0 ? (
              <div className="flex h-[80vh] w-full justify-center items-center">
                <EmptyProduct inputValue={inputValue} setInputValue={setInputValue} setSearchParams={setSearchParams} />
              </div>
            ) : (
              <>
                <BannerSearch showSidebar={showSidebar} />

                <ActionButtons showSidebar={showSidebar} products={filteredProducts} setShowSidebar={setShowSidebar} setDrawerOpen={setDrawerOpen} filterOrder={filterOrder} setFilterOrder={setFilterOrder} />

                <div className={`grid gap-2 w-full ${showSidebar ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 max-w-[1920px]"}`}>
                  {currentItems.map((product) => (
                    <CardProduct key={product.id} id={product.id} name={product.name} sizes={product.sizes} price={product.price} image={product.image[0]} lastPrice={product.lastPrice} />
                  ))}
                </div>

                {/* Paginação */}
                <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} />
              </>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
