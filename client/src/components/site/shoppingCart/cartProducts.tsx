import { Plus, Minus } from "lucide-react";
import { TotalShoppingCart } from "./totalShoppingCart";
import { useCart, type CartItem } from "@/context/cartContext";
import { TbMoodConfuzed } from "react-icons/tb";
import { useAllProducts } from "@/hooks/site/useAllProducts";
import { GoArrowLeft } from "react-icons/go";
import { useUI } from "@/context/UIContext";
import { useNavigate } from "react-router-dom";
import { apiAddProduct } from "@/api/site/shoppingCart.api";
import { toast } from "sonner";

import { SkeletonRecomendedProducts } from "./skeletonRecomendedProduct";
import { useState } from "react";
import { Loading } from "../loading/loading";

export function CartProducts() {
  const { state, dispatch } = useCart();
  const { data: products } = useAllProducts();
  const navigate = useNavigate();
  const { setOpenCart } = useUI();
  const [loadingId, setLoadingId] = useState<string | number | null>(null);

  const limited = products?.slice(0, 3);

  const handleIncrement = async (item: CartItem) => {
    const uniqueId = `${item.id}-${item.color}-${item.size}`;

    setLoadingId(uniqueId); 
    try {
      await apiAddProduct({
        id: item.id,
        name: item.name,
        price: Number(item.price),
        image: item.image,
        quantity: 1,
        color: item.color,
        size: item.size,
      });

      dispatch({
        type: "increment",
        payload: { id: item.id, color: item.color, size: item.size },
      });
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao adicionar produto");
      }
    } finally {
      setLoadingId(null);
    }
  };

  const handleDecrement = (item: CartItem) => {
    dispatch({ type: "decrement", payload: { id: item.id, color: item.color, size: item.size } });
  };
  return (
    <section className="mt-2 flex flex-col gap-2">
      {state.length > 0 ? (
        state.map((item, index) => {
          const uniqueId = `${item.id}-${item.color}-${item.size}`;
          return (
            <div key={index} className="flex gap-3 border-b pb-3 border-gray-200">
              <img src={item.image} alt={item.name} className="w-20 object-cover" />
              <div className="w-full">
                <p className="font-semibold text-gray-700">{item.name}</p>
                <p className="text-xs text-gray-400">Quantidade: {item.quantity}</p>
                <p className="text-xs text-gray-400">Cor: {item.colorName}</p>
                <p className="text-xs text-gray-400">Tamanho: {item.sizeName}</p>

                <div className="flex items-end justify-between">
                  <p className="font-semibold text-gray-900 mt-10">{Number(item.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>

                  <div className="flex items-center gap-3 mt-1">
                    <button onClick={() => handleDecrement(item)} className="p-1 rounded-full border border-primary-50 hover:bg-primary-100 hover:text-white cursor-pointer">
                      <Minus size={16} />
                    </button>

                    <p className="text-sm font-medium text-gray-700">{item.quantity}</p>

                    <button onClick={() => handleIncrement(item)} className="p-1 border rounded-full border-primary-50 hover:bg-primary-100 hover:text-white cursor-pointer">
                      {/* Verifica se o ID carregando é igual ao ID deste botão */}
                      {loadingId === uniqueId ? <Loading  width={16} height={16}/> : <Plus size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-gray-600 flex flex-col justify-center items-center gap-2 mt-4">
          <TbMoodConfuzed size={40} />
          <div className="text-center">
            <p>sua sacola ainda está vazia,</p>
            <p>quer ajuda para escolher?</p>
          </div>

          {limited && limited.length > 0 ? (
            limited?.map((product) => (
              <div className="flex gap-2 w-full mt-5">
                <div className="flex gap-2 w-full">
                  <img src={product.image[0]} alt="" className="w-20" />
                  <div className="w-full">
                    <p>{product.name}</p>
                    <div className="flex gap-2 items-center ">
                      <p className="line-through text-xs">
                        {Number(product.lastPrice).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>

                      <p className="text-base text-primary-50 font-semibold">
                        {Number(product.price).toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        (setOpenCart(false), navigate(`/product/${product.id}`));
                      }}
                      className="bg-primary-50 text-white text-sm w-full cursor-pointer mt-12 py-1"
                    >
                      Ver Produto
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <SkeletonRecomendedProducts />
          )}
          <button onClick={() => setOpenCart(false)} className="bg-primary-100  w-full py-2 mt-10 text-gray-700 flex items-center gap-4 justify-center cursor-pointe text-sm">
            <GoArrowLeft size={20} />
            CONTINUAR COMPRANDO
          </button>
        </div>
      )}

      {state.length > 0 && <TotalShoppingCart />}
    </section>
  );
}
