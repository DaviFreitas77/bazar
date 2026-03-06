import { useNavigate } from "react-router-dom";
import type { Product } from "@/@types/product";
import { useUI } from "@/context/UIContext";
import { FaCircle } from "react-icons/fa";
import { useState } from "react";
import { useCheckout } from "@/context/checkoutContext";
import { apiAddProduct } from "@/api/site/shoppingCart.api";
import { useCart } from "@/context/cartContext";
import { toast } from "sonner";
import { useUser } from "@/context/userContext";


export interface Size {
  nameSize: string;
  idSize: number;
}

export interface Color {
  nameColor: string;
  idColor: number;
  hexadecimal: string
}

export function CardProduct({ id, image, lastPrice, name, price, sizes, color }: Product) {
  const navigate = useNavigate();
  const { setOpenSearch } = useUI();
  function handleClick() {
    navigate(`/product/${id}`);
    if (setOpenSearch) {
      setOpenSearch(false);
    }
  }

  // const [loading, setLoading] = useState(false)
  const { setModalAuth } = useUI();
  const { setDiscount, setStep, setPreference } = useCheckout();
  const { dispatch } = useCart()
  const { email } = useUser()
  const [selectedSize, setSelectedSize] = useState<Size>({
    nameSize: '',
    idSize: 0,
  });
  const [selectedColor, setSelectedColor] = useState<Color>({
    nameColor: '',
    idColor: 0,
    hexadecimal: ''
  })


  const handleAddCart = async (id: number, name: string, price: number, image: string,) => {

    if (!email) {
      setModalAuth(true);
      return;
    }

    if (!selectedColor.idColor || !selectedColor.nameColor || !selectedSize.idSize || !selectedSize.nameSize) {
      toast.error("Selecione cor e tamanho para continuar");
      return;
    }

    // setLoading(true);
    setDiscount(0);
    setStep(1);
    setPreference({
      id: "",
      total: 0,
      orderId: "",
      created_at: "",
    });

    try {
      if (name) {
        await apiAddProduct({
          id: id,
          name: name,
          price: Number(price),
          image: image,
          quantity: 1,
          color: selectedColor.idColor,
          size: selectedSize.idSize,
        });
      }

      dispatch({
        type: "addItem",
        payload: {
          id: id,
          name: name,
          price: Number(price),
          image: image,
          quantity: 1,
          color: selectedColor.idColor,
          size: selectedSize.idSize,
          colorName: selectedColor.hexadecimal,
          sizeName: selectedSize.nameSize,
        },
      });


      toast.success("Produto adicionado ao carrinho!");
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Erro ao adicionar produto");
      }
    } finally {
      // setLoading(false);
      setSelectedColor({ idColor: 0, nameColor: '', hexadecimal: '' })
      setSelectedSize({ idSize: 0, nameSize: '' })
    }


  };


  return (
    <div className="max-w-[250px] w-full bg-white rounded-sm shadow-sm max-h-130  ">
      <div onClick={handleClick} >
        <img className="w-full aspect-3/3 object-cover object-top hover:opacity-85 cursor-pointer" src={image[0]} alt="Vestido um ombro Aura" />
      </div>

      <div className="px-2 py-4 space-y-3">
        <h3 className="text-base lg:text-base  text-gray-700 font-semibold capitalize">{name}</h3>

        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs lg:text-base font-medium text-gray-500">Tam:</span>
            {sizes && sizes.map((size) => (
              <span key={size.id}
                onClick={() => setSelectedSize({ idSize: size.id, nameSize: size.name })}
                className={`flex items-center justify-center w-5 h-5  rounded-full  text-xs font-semibold text-gray-700 ring-1 ring-gray-300 cursor-pointer ${selectedSize.idSize == size.id ? 'border border-primary-50' : ''}`}>
                {size.name}
              </span>
            ))}

          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs lg:text-base font-medium text-gray-500">Cor:</span>
            {color && color.map((c) => (
              <span
                key={c.id}
                onClick={() => setSelectedColor({ idColor: c.id, nameColor: c.name, hexadecimal: c.hexadecimal })}
                className={`
        flex items-center justify-center w-6 h-6 rounded-full cursor-pointer
        ring-1 ring-gray-300
        ${selectedColor.idColor == c.id ? 'border border-primary-50' : ''}
      `}
              >
                <FaCircle size={16} color={c.hexadecimal} className="block" />
              </span>
            ))}
          </div>
        </div>

        <div className="flex  items-center gap-2 min-h-10">


          <p className="text-base font-semibold text-gray-700">
            {Number(price).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          {lastPrice && lastPrice > 0 && (
            <p className="text-gray-600 text-xs line-through">
              {Number(lastPrice).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          )}
        </div>

        <button
          onClick={() => handleAddCart(id, name, Number(price), image[0],)}
          className="text-sm  w-full bg-primary-50 text-white py-2 px-2 rounded-xs font-semibold hover:bg-primary-100 cursor-pointer transition-colors">Adicionar à sacola</button>
      </div>
    </div>
  );
}
