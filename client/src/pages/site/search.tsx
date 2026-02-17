import { filterColorsProducts, filterSizesProducts } from "@/utils/productsUtild";
import { CardProduct } from "@/components/ui/cardProduct";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { DrawerFilterMobile } from "@/components/site/search/drawer";
import { BannerSearch } from "@/components/site/search/banner";
import { Pagination } from "@/components/site/search/pagination";
import { EmptyProduct } from "@/components/site/search/emptyProduct";
import { ActionButtons } from "@/components/site/search/action";
import { DrawerDesktop } from "@/components/site/search/drawerDesktop";
import { LoadingPage } from "@/components/site/loading/loadingPage";
import type { Product } from "@/@types/product";
import { hookSearchParams } from "@/hooks/site/useSearchParams";
import { useListSubCategories } from "@/hooks/site/useListSubCategories";
import { useProductsByCategory } from "@/hooks/site/useProductsByCategory";
import { useFilterSubCategory } from "@/hooks/site/useFilterProducts";

export function Search() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedcategorie, setSelectedcategorie] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [inputValue, setInputValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("q");
  const { data: subCategories } = useListSubCategories(searchParams.get("category") ?? "");
  const { data: productsByCategory } = useProductsByCategory(searchParams.get("category") ?? "");
  const { data: productsBySubCategory } = useFilterSubCategory(searchParams.get("subCategory") ?? "");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterOrder, setFilterOrder] = useState("relevance");
  const [priceRange, setPriceRange] = useState<number[]>([0, 0]);

  let productsPerPage = 16;

  const { data: productsSearched } = hookSearchParams(search);

  useEffect(() => {
    setSelectedcategorie(searchParams.get("category") ?? "");
    setSelectedSubCategory(searchParams.get("subCategory") ?? "");
  }, [searchParams]);

  const handleCategoryParams = (category: string) => {
    const params = new URLSearchParams(searchParams);
    const currentCategory = params.get("category");

    if (currentCategory === category) {
      params.delete("category");
      params.delete("subCategory");
    } else {
      params.set("category", category);
      params.delete("subCategory");
    }

    setSearchParams(params);
  };

  const handleSubCategoryParams = (subCategory: string) => {
    const params = new URLSearchParams(searchParams);
    const currentCategory = params.get("subCategory");

    if (currentCategory === subCategory) {
      params.delete("subCategory");
    } else {
      params.set("subCategory", subCategory);
    }

    setSearchParams(params);
  };

  const toggleColor = (color: string) => {
    setSelectedColor((prev) => (prev === color ? "" : color));
  };

  const toggleSize = (size: string) => {
    setSelectedSize((prev) => (prev === size ? "" : size));
  };

  const toggleCategory = (category: string) => {
    setSelectedcategorie((prev) => (prev === category ? "" : category));
    handleCategoryParams(category);
  };

  const toggleSubCategory = (subCategory: string) => {
    setSelectedSubCategory((prev) => (prev === subCategory ? "" : subCategory));
    handleSubCategoryParams(subCategory);
  };

  const baseProducts: Product[] = useMemo(() => {
    if (searchParams.get("subCategory")) {
      return productsBySubCategory ?? [];
    }

    if (searchParams.get("category")) {
      return productsByCategory ?? [];
    }

    return productsSearched ?? [];
  }, [productsByCategory, productsBySubCategory, productsSearched, searchParams]);

  const filteredProducts = useMemo(() => {
    let result: Product[] = [...baseProducts];

    if (selectedColor) {
      result = filterColorsProducts(selectedColor, result);
    }

    if (selectedSize) {
      result = filterSizesProducts(selectedSize, result);
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
  }, [selectedColor, selectedSize, selectedcategorie, productsSearched, filterOrder, priceRange, selectedSubCategory, productsByCategory, searchParams, productsBySubCategory, baseProducts]);

  const [minPrice, maxPrice] = useMemo(() => {
    if (!filteredProducts.length) return [0, 0];

    return [Math.min(...filteredProducts.map((p) => p.price)), Math.max(...filteredProducts.map((p) => p.price))];
  }, [filteredProducts]);

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

  const allCategories = [...new Set(productsSearched?.flatMap((product) => product.category.name))];

  return (
    <main className="px-2 md:px-6 flex flex-col gap-6 mt-25">
      {currentItems.length == 0 ? (
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
                  selectedSubCategory={selectedSubCategory}
                  subCategories={subCategories}
                  allCategories={allCategories}
                  selectedSize={selectedSize}
                  changeColor={toggleColor}
                  changeSize={toggleSize}
                  changeCategory={toggleCategory}
                  changeSubCategory={toggleSubCategory}
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
                  selectedcategorie={selectedcategorie}
                  selectedSubCategory={selectedSubCategory}
                  subCategories={subCategories}
                  allCategories={allCategories}
                  selectedSize={selectedSize}
                  changeColor={toggleColor}
                  changeSize={toggleSize}
                  changeCategory={toggleCategory}
                  changeSubCategory={toggleSubCategory}
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
