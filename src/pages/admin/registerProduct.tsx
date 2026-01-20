import { HeaderAdmin } from "@/components/admin/headerAdmin/header";
import LayoutSidebar from "@/components/admin/sidebar";
import { useCategoriesAdmin } from "@/hooks/admin/useCategoryAdmin.";
import { useColors } from "@/hooks/admin/useColors";
import { useSizesAdmin } from "@/hooks/admin/useSizesAdmin";
import { useState } from "react";
import { FaCircle } from "react-icons/fa";

export function RegisterProduct() {
  const [selectedSize, setSelectedSize] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);

  const { data: categories } = useCategoriesAdmin();
  const { data: colors } = useColors();
  const { data: sizes } = useSizesAdmin();

  const toggleColor = (idColor: number) => {
    setSelectedColors((prev) => (prev.includes(idColor) ? prev.filter((color) => color !== idColor) : [...prev, idColor]));
  };

  const toggleSize = (idSize: number) => {
    setSelectedSize((prev) => (prev.includes(idSize) ? prev.filter((size) => size !== idSize) : [...prev, idSize]));
  };

  return (
    <LayoutSidebar>
      <section>
        <HeaderAdmin />
        <section className="flex justify-center mt-20">
          <form className="flex flex-col gap-10">
            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-base font-semibold">Nome do produto</label>
                <input type="text" placeholder="Ex: Camiseta " className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-base font-semibold">Descrição do produto</label>
                <input type="text" placeholder="Ex: Camiseta básica de manga curta " className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-base font-semibold">Categoria do produto</label>
                <input type="text" placeholder="Ex: Camiseta " className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-base font-semibold">Preço antigo</label>
                <input type="text" placeholder="Ex: R$ 100,00" className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-base font-semibold">Novo preço</label>
                <input type="text" placeholder="Ex: R$ 69,99" className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-base font-semibold">Estoque</label>
                <input type="text" placeholder="Ex: 1 " className="border border-gray-300 rounded-sm px-2 text-sm py-3 w-100 outline-none focus:right-2 focus:border-primary-50" />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-base font-semibold">Cores</label>
                <div className="grid grid-cols-5 gap-2">
                  {colors &&
                    colors.map((color) => (
                      <div className="flex gap-3 mt-2 flex-wrap ">
                        <button
                          type="button"
                          onClick={() => {
                            toggleColor(color.id);
                          }}
                          key={color.id}
                          className={`border p-0.5 rounded-full border-gray-200 hover:border-primary-100 cursor-pointer ${selectedColors.includes(color.id) ? "border-primary-50 " : ""}`}
                        >
                          <FaCircle size={30} color={color.name} />
                        </button>
                      </div>
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-700 text-base font-semibold">Tamanhos</label>
                <div className="grid grid-cols-5 gap-2">
                  {sizes &&
                    sizes.map((size) => (
                      <button
                        type="button"
                        onClick={() => {
                          toggleSize(size.id);
                        }}
                        key={size.id}
                        className={`w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 cursor-pointer hover:bg-primary-50 hover:text-white transition ${selectedSize.includes(size.id) ? "bg-primary-50 text-white" : ""}`}
                      >
                        {size.name}
                      </button>
                    ))}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-700 text-base font-semibold">Imagens</label>
                <input type="file" accept="image/*" className="border border-gray-300 px-2 py-3 rounded-sm"/>
              </div>
            </div>

            <div>
              <button className="bg-primary-50 px-20 py-3 text-white rounded-sm cursor-pointer hover:opacity-85">Cadastrar Produto</button>
            </div>
          </form>
        </section>
      </section>
    </LayoutSidebar>
  );
}
