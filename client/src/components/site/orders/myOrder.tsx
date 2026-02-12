import type { OrderProps } from "@/api/@types/order";
import { PixQRCode } from "../checkout/MCP/PixQrCode";
import { useState } from "react";
import { Timer } from "../checkout/timer";

export function MyOrder({ number_order, created_at, total, status, item, pix_qr_code_base64, pix_code }: OrderProps) {
  const [showPixCode, setShowPixCode] = useState(false);

  const statusMap = {
    pending: { label: "Pendente", style: "bg-orange-300" },
    paid: { label: "Pago", style: "bg-yellow-200" },
    completed: { label: "Completo", style: "bg-green-300" },
    canceled: { label: "Cancelado", style: "bg-red-300" },
  };

  const currentStatus = statusMap[status as keyof typeof statusMap] || {
    label: "Desconhecido",
    style: "bg-gray-300",
  };

  return (
    <div className="mt-8 border rounded-md border-gray-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b p-4 border-gray-200  bg-gray-100/60">
        <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:items-center text-sm">
          <p className="font-semibold">
            Pedido: <span className="text-primary-50">{number_order}</span>
          </p>

          <p className="font-semibold">
            Data:{" "}
            <span className="font-normal">
              {new Date(created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </p>

          <p className="font-semibold">
            Total:{" "}
            <span className="font-normal">
              {Number(total).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          </p>

          <div className={`${currentStatus.style} px-3 py-1 rounded-full text-center w-fit`}>
            <p className="text-xs font-medium">{currentStatus.label}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Timer createdAt={created_at}/>
        {status === "pending" && pix_code && (
            <button onClick={() => setShowPixCode(!showPixCode)} className="bg-green-800 text-white px-4 py-2 rounded-md hover:opacity-85 transition text-sm w-full sm:w-auto">
              Pagar agora
            </button>
        )}
        </div>
      </div>

      {showPixCode && status === "pending" && pix_code && pix_qr_code_base64 && (
        <div className="p-4 border-b border-gray-200  bg-gray-50 flex justify-center">
          <PixQRCode qrCode={pix_code} qrCodeBase64={pix_qr_code_base64} />
        </div>
      )}

      {item &&
        item.map((product, index) => (
          <div key={index} className="flex  gap-4 p-4 border-b border-gray-200/60">
            <img src={product.imageProduct} alt={product.nameProduct} className="w-24 h-24 object-cover rounded" />

            <div className="text-sm flex flex-col gap-1">
              <p className="font-medium">{product.nameProduct}</p>
              <p>Cor: {product.colorProduct}</p>
              <p>Tamanho: {product.sizeProduct}</p>
              <p>Quantidade: {product.quantityProduct}</p>
            </div>
          </div>
        ))}
    </div>
  );
}
