import { filterCategory, filterColorsProducts, filterSizesProducts } from "@/utils/productsUtild";
import { CardProduct } from "@/components/ui/card";
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { DrawerFilterMobile } from "@/components/search/drawer";
import { BannerSearch } from "@/components/search/banner";
import { PaginationSearch } from "@/components/search/pagination";
import { EmptyProduct } from "@/components/search/emptyProduct";
import { ActionButtons } from "@/components/search/action";
import { DrawerDesktop } from "@/components/search/drawerDesktop";
import { useAllProducts } from "@/hooks/useAllProducts";
import { LoadingPage } from "@/components/loading/loadingPage";
import type { Product } from "@/@types/product";
import { hookSearchParams } from "@/hooks/useSearchParams";

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
  let productsPerPage = 16;

  const { data: allProducts, isLoading: isLoadingAllProducts } = useAllProducts();

  const { data: productsSearched } = hookSearchParams(search);

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

    return result;
  }, [selectedColor, selectedSize, allProducts, selectedcategorie, productsSearched]);

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
              {showSidebar && <DrawerDesktop allColors={allColors} allSizes={allSizes} selectedColor={selectedColor} selectedcategorie={selectedcategorie} allCategories={allCategories} selectedSize={selectedSize} applyFilterProducts={applyFilterProducts} />}

              <DrawerFilterMobile open={drawerOpen} onOpenChange={setDrawerOpen} allColors={allColors} allSizes={allSizes} selectedColor={selectedColor} selectedSize={selectedSize} applyFilterProducts={applyFilterProducts} />
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

                <ActionButtons showSidebar={showSidebar} products={filteredProducts} setShowSidebar={setShowSidebar} setDrawerOpen={setDrawerOpen} />

                <div className={`grid gap-2 w-full ${showSidebar ? "grid-cols-2 sm:grid-cols-3 xl:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 max-w-[1920px]"}`}>
                  {currentItems.map((product) => (
                    <CardProduct key={product.id} id={product.id} name={product.name} sizes={product.sizes} price={product.price} image={product.image[0]} lastPrice={product.lastPrice} />
                  ))}
                </div>

                {/* Paginação */}
                <PaginationSearch currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} />
              </>
            )}
          </div>
        </section>
      )}
    </main>
  );
}
