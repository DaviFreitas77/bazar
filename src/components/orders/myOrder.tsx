import { CiTimer } from "react-icons/ci";

interface myOrderProps {
  numberOrder: string;
  dateOrder: string;
  totalOrder: string;
  statusOrder: string;
  item: itemsProps[];
}
interface itemsProps {
  nameProduct: string;
  quantityProduct: string;
  imageProduct:string;
  colorProduct:string;
  sizeProduct:string;
}

export function MyOrder({ numberOrder, dateOrder, totalOrder, statusOrder, item }: myOrderProps) {
  console.log(item)
  return (
    <div className="mt-10 border  rounded-sm border-gray-200">
      <div className="flex items-center justify-between border-b p-4 border-gray-200/50 bg-gray-100/50">
        <div className="flex items-center gap-2">
          <p className="font-bold">
            Numero do pedido: <span className="text-primary-100">{numberOrder}</span>
          </p>
          |
          <p className="font-bold">
            Data do pedido: <span className="font-normal">{new Date(dateOrder).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}</span>
          </p>
          |
          <p className="font-bold">
            Valor total: <span className="font-normal">{Number(totalOrder).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
          </p>
        </div>

        <div className="bg-orange-300  text-center px-4 rounded-xs py-3 flex items-center gap-1">
          <CiTimer size={15} />
          <p className="text-sm">{statusOrder}</p>
        </div>
      </div>


      {item &&
        item.map((product,index) => (
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
