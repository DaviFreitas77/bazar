import { useProductById } from "@/hooks/site/useProductById";
import { ModalEditSkeleton } from "../skeleton/modalSkeleton";
import { useState } from "react";
import { apiEditProduct } from "@/api/admin/productAdmin";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ModalEditProductProps {
  productId: number;
  onClose: () => void;
}

export function ModalEditProduct({ productId, onClose }: ModalEditProductProps) {
    const queryClient = useQueryClient();
  const { data: productById } = useProductById(productId);

  const [newName, setNewName] = useState<string | undefined>(undefined);
  const [newDescription, setNewDescription] = useState<string | undefined>(undefined);
  const [newPrice, setNewPrice] = useState<number | undefined>(undefined);
  const [newLastPrice, setNewLastPrice] = useState<number | undefined>(undefined);

  const editProduct = async () => {
    try {
      const data = {
        name: newName,
        description: newDescription,
        price: newPrice,
        lastPrice: newLastPrice,
        productId: productId,
      };
      await apiEditProduct(data);
      toast.success("Produto editado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      queryClient.invalidateQueries({ queryKey: ["allProducts"] });
      onClose();
    
    } catch (error) {
      console.log(error);
    }
  };


  
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4 py-5">
      {productById ? (
        <div className="bg-white w-[1100px] max-w-full rounded-lg p-6 shadow-lg my-10 mx-auto max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-6">Editar produto #{productById?.id}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LADO ESQUERDO - IMAGEM */}
            <div className="flex flex-col items-center justify-center border border-gray-200 rounded-lg p-4">
              <img src={productById?.image?.[0]?.image} alt={productById?.name} className=" object-contain " />
            </div>

            {/* LADO DIREITO - FORMULÁRIO */}
            <div className="flex flex-col gap-4 justify-between">
              {/* Nome */}
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-sm text-gray-600">Nome</label>
                  <input defaultValue={productById?.name} onChange={(e) => setNewName(e.target.value)} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary-50" />
                </div>
                {/* Descrição */}
                <div>
                  <label className="text-sm text-gray-600">Descrição</label>
                  <textarea onChange={(e) => setNewDescription(e.target.value)} defaultValue={productById?.description} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary-50 resize-none" rows={3} />
                </div>
                {/* Preços */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm text-gray-600">Preço atual</label>
                    <input onChange={(e) => setNewPrice(Number(e.target.value))} type="number" defaultValue={productById?.price} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">Preço anterior</label>
                    <input onChange={(e) => setNewLastPrice(Number(e.target.value))} type="number" defaultValue={productById?.lastPrice} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
                  </div>
                </div>
                {/* Categoria */}
                <div>
                  <label className="text-sm text-gray-600">Categoria</label>
                  <input disabled defaultValue={productById?.categoryName} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-primary-50" />
                </div>
                {/* Cores */}
                <div>
                  <label className="text-sm text-gray-600">Cores</label>
                  <div className="flex gap-2 flex-wrap">
                    {productById?.color.map((c) => (
                      <span key={c.id} className="px-3 py-1 text-xs rounded-full border border-gray-300 bg-gray-100">
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Botões */}
              <div className="flex justify-end gap-3 mt-4 ">
                <button onClick={onClose} className="px-4 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
                  Cancelar
                </button>

                <button onClick={editProduct} className="px-4 py-2 text-sm rounded-md bg-primary-50 text-white hover:opacity-90">
                  Salvar alterações
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white w-[900px] rounded-lg p-6 shadow-lg">
          <ModalEditSkeleton />
        </div>
      )}
    </div>
  );
}
