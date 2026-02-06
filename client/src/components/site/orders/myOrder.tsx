import type { OrderProps } from "@/api/@types/order";
import { CiTimer } from "react-icons/ci";

export function MyOrder({ number_order, created_at, total, status, item }: OrderProps) {


  const formatedStatus = status == 'preparando' ? 'Preparando' : status == 'pending' ? 'Pendente' : 'Completo'

  return (
    <div className="mt-10 border  rounded-sm border-gray-200">
      <div className=" flex flex-col md:flex-row  gap-5 md:items-center justify-between border-b p-4 border-gray-200/50 bg-gray-100/50">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2">
          <p className="font-bold">
            Numero do pedido: <span className="text-primary-50">{number_order} </span>
            |
          </p>

          <p className="font-bold">
            Data do pedido: <span className="font-normal">{new Date(created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })} </span>
            |
          </p>
      
          <p className="font-bold lg:-ml-6 ">
            Valor total: <span className="font-normal">{Number(total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })} </span>
          </p>
        </div>

        <div className={`${formatedStatus == 'Pendente' ? 'bg-orange-300 ': formatedStatus == 'Preparando' ? 'bg-yellow-200': 'bg-green-300' }  text-center px-4 rounded-xs py-3 flex items-center gap-1`}>
          <CiTimer size={15} />
          <p className={`text-sm`}>{formatedStatus}</p>
        </div>
      </div>

      {item &&
        item.map((product, index) => (
          <div key={index} className="flex items-start gap-2 mt-4 border-b pb-4 px-4 border-gray-200/50">
            <img src={product.imageProduct} alt="" className="max-w-18" />

            <div className="mt-2 text-sm flex flex-col gap-1">
              <p className="">{product.nameProduct}</p>
              <p>Cor:{product.colorProduct}</p>
              <p>Tam:{product.sizeProduct}</p>
              <p>Quantidade: {product.quantityProduct}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
