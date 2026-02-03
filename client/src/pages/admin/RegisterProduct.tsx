import { uploadImage } from "@/api/admin/uploadImage";
import { HeaderAdmin } from "@/components/admin/headerAdmin/header";
import LayoutSidebar from "@/components/admin/sidebar";
import { DropDown, NativeSelectOption } from "@/components/ui/native-select";
import { toast } from "sonner";
import { useCategoriesAdmin } from "@/hooks/admin/useCategoryAdmin.";
import { useColors } from "@/hooks/admin/useColors";
import { useSizesAdmin } from "@/hooks/admin/useSizesAdmin";
import { useState } from "react";
import { FaCircle, FaCloudUploadAlt, FaSpinner, FaTrash } from "react-icons/fa";
import { createdProduct } from "@/api/admin/productAdmin";
import { useListSubCategoriesById } from "@/hooks/admin/useListSubCategoryById";

export function RegisterProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [price, setPrice] = useState("");
  const [selectedSize, setSelectedSize] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  const { data: categories } = useCategoriesAdmin();
  const { data: subCategories } = useListSubCategoriesById(Number(selectedCategory));
  const { data: colors } = useColors();
  const { data: sizes } = useSizesAdmin();

  const toggleColor = (idColor: number) => {
    setSelectedColors((prev) => (prev.includes(idColor) ? prev.filter((color) => color !== idColor) : [...prev, idColor]));
  };

  const toggleSize = (idSize: number) => {
    setSelectedSize((prev) => (prev.includes(idSize) ? prev.filter((size) => size !== idSize) : [...prev, idSize]));
  };

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await uploadImage(formData);
      setImages((prev) => [...prev, response.url]);
      toast.success("Imagem enviada!");
    } catch {
      toast.error("Erro ao subir imagem.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove: number) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleCreatedProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return toast.error("Selecione uma categoria");

    setLoading(true);
    try {
      const data = {
        name,
        description,
        idCategory: Number(selectedCategory),
        idSubCategory: Number(selectedSubCategory),
        oldPrice: oldPrice ? Number(oldPrice.replace(",", ".")) : null,
        lastPrice: Number(oldPrice.replace(",", ".")),
        price: Number(price.replace(",", ".")),
        colors: selectedColors,
        sizes: selectedSize,
        images,
      };

      await createdProduct(data);
      toast.success("Produto cadastrado com sucesso!");

      // Reset states
      setName("");
      setDescription("");
      setOldPrice("");
      setPrice("");
      setSelectedSize([]);
      setSelectedColors([]);
      setSelectedCategory("");
      setSelectedSubCategory("");
      setImages([]);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erro ao cadastrar");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = "border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50 outline-none transition-all bg-gray-50/30 focus:bg-white";

  return (
    <main className="bg-primary-300 px-4">
      <LayoutSidebar>
        <section className="min-h-screen pb-20">
          <HeaderAdmin />
          <div className="w-full mx-auto mt-10">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-gray-700">Cadastrar Novo Produto</h1>
              <p className="text-gray-500 text-sm">Preencha as informações abaixo para adicionar um item à loja.</p>
            </div>
            <form onSubmit={handleCreatedProduct} className="flex flex-col gap-8">
              {/* INFORMAÇÕES BÁSICAS */}
              <div className="bg-white p-8 rounded-xl  border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary-50 rounded-full"></span>
                  Informações Básicas
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700  tracking-wider">Nome do Produto</label>
                    <input required onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Ex: Camiseta Oversized" className={inputStyle} />
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2 lg:col-span-1">
                    <label className="text-sm font-bold text-gray-700  tracking-wider">Descrição Curta</label>
                    <input required onChange={(e) => setDescription(e.target.value)} value={description} type="text" placeholder="Ex: Camiseta básica 100% algodão" className={inputStyle} />
                  </div>
                  <div className="flex gap-6">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-bold text-gray-700  tracking-wider">Categoria</label>
                      <DropDown title="Selecione..." value={selectedCategory} onChange={setSelectedCategory} style="border-gray-300 rounded-lg h-[46px] shadow-none">
                        {categories?.map((category) => (
                          <NativeSelectOption key={category.id} value={category.id}>
                            {category.name}
                          </NativeSelectOption>
                        ))}
                      </DropDown>
                    </div>
                    <div className={`flex flex-col gap-1.5 ${subCategories ? "" : "hidden"}`}>
                      <label className="text-sm font-bold text-gray-700  tracking-wider">Modelo</label>
                      <DropDown title="Selecione..." value={selectedSubCategory} onChange={setSelectedSubCategory} style="border-gray-300 rounded-lg h-[46px] shadow-none">
                        {subCategories?.map((subCategory: any) => (
                          <NativeSelectOption key={subCategory.id} value={subCategory.id}>
                            {subCategory.name}
                          </NativeSelectOption>
                        ))}
                      </DropDown>
                    </div>
                  </div>
                </div>
              </div>
              {/* PREÇOS */}
              <div className="bg-white p-8 rounded-xl  border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-700 mb-6 flex items-center gap-2">
                  <span className="w-1 h-6 bg-primary-50 rounded-full"></span>
                  Precificação
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700  tracking-wider">Preço Antigo (Opcional)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400 text-sm">R$</span>
                      <input onChange={(e) => setOldPrice(e.target.value)} value={oldPrice} type="text" placeholder="0,00" className={`${inputStyle} w-full pl-10`} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-bold text-gray-700  tracking-wider">Preço de Venda</label>
                    <div className="relative">
                      <span className="absolute left-3 top-3 text-gray-400 text-sm">R$</span>
                      <input required onChange={(e) => setPrice(e.target.value)} value={price} type="text" placeholder="0,00" className={`${inputStyle} w-full pl-10`} />
                    </div>
                  </div>
                </div>
              </div>
              {/* VARIAÇÕES E MÍDIA */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CORES */}
                <div className="bg-white p-6 rounded-xl  border border-gray-200">
                  <label className="text-sm font-bold text-gray-700  tracking-wider mb-4 block">Cores disponíveis</label>
                  <div className="flex flex-wrap gap-3">
                    {colors?.map((color) => (
                      <button
                        key={color.id}
                        type="button"
                        title={color.name}
                        onClick={() => toggleColor(color.id)}
                        className={`cursor-pointer p-1 rounded-full border-2 transition-all transform hover:scale-110
                          ${selectedColors.includes(color.id) ? "border-primary-50 ring-4 ring-primary-50/10" : "border-transparent"}
                        `}
                      >
                        <FaCircle size={24} color={color.name} className="drop- border border-gray-100 rounded-full" />
                      </button>
                    ))}
                  </div>
                </div>
                {/* TAMANHOS */}
                <div className="bg-white p-6 rounded-xl  border border-gray-200">
                  <label className="text-sm font-bold text-gray-700  tracking-wider mb-4 block">Tamanhos</label>
                  <div className="flex flex-wrap gap-2">
                    {sizes?.map((size) => (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => toggleSize(size.id)}
                        className={`cursor-pointer min-w-[45px] h-[45px] rounded-lg border flex items-center justify-center text-sm font-bold transition-all
                          ${selectedSize.includes(size.id) ? "bg-primary-50 text-white border-primary-50 shadow-md" : "border-gray-200 text-gray-600 hover:border-primary-50 hover:text-primary-50 bg-white"}
                        `}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
                {/* IMAGENS */}
                <div className="bg-white p-6 rounded-xl  border border-gray-200">
                  <label className="text-sm font-bold text-gray-700  tracking-wider mb-4 block">Fotos do Produto</label>

                  <label className="group cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-4 hover:border-primary-50 hover:bg-primary-50/5 transition-all">
                    {uploading ? (
                      <FaSpinner className="animate-spin text-primary-50 text-2xl" />
                    ) : (
                      <>
                        <FaCloudUploadAlt className="text-gray-400 group-hover:text-primary-50 text-3xl mb-2" />
                        <span className="text-xs text-gray-500 group-hover:text-primary-50 font-medium">Upload de imagem</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handleUploadImage} className="hidden" />
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group aspect-square">
                      <img src={image} alt="" className="w-full h-full object-cover rounded-lg border" />
                      <button type="button" onClick={() => removeImage(index)} className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                        <FaTrash size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* BOTÃO DE AÇÃO */}
              <div className="flex justify-end items-center gap-4 mt-4">
                <button type="button" onClick={() => window.history.back()} className="px-8 py-3 text-gray-500 font-semibold hover:text-gray-700 transition-colors">
                  Cancelar
                </button>
                <button type="submit" disabled={loading} className={`cursor-pointer bg-primary-50 px-12 py-4 text-white font-bold rounded-xl shadow-lg shadow-primary-50/20 hover:bg-primary-50/90 transition-all flex items-center gap-3 ${loading && "opacity-70 cursor-not-allowed"}`}>
                  {loading ? (
                    <>
                      {" "}
                      <FaSpinner className="animate-spin" /> Cadastrando...
                    </>
                  ) : (
                    "Finalizar Cadastro"
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      </LayoutSidebar>
    </main>
  );
}
