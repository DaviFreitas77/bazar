import type { OrderProps } from "@/api/@types/order";
import { PixQRCode } from "../checkout/MCP/PixQrCode";
import { useState } from "react";
import { Timer } from "../checkout/timer";
import { FaCircle } from "react-icons/fa";
import { ChevronDown } from "lucide-react";

export function MyOrder({ 
  number_order, 
  created_at, 
  total, 
  status, 
  item, 
  pix_qr_code_base64, 
  pix_code,
  payment_method,
  name_freight,
  company_freight,
  price_freight,
  logradouro
}: OrderProps) {
  const [showPixCode, setShowPixCode] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const statusMap = {
    pending: { label: "Pendente", style: "bg-orange-300" },
    paid: { label: "Pago", style: "bg-yellow-200" },
    completed: { label: "Completo", style: "bg-green-300" },
    canceled: { label: "Cancelado", style: "bg-red-300" },
  };

  const paymentMethodMap = {
    credit_card: "Cartão de Crédito",
    bank_transfer: "Pix",
    ticket: "Boleto",
  };

  const currentStatus = statusMap[status as keyof typeof statusMap] || {
    label: "Desconhecido",
    style: "bg-gray-300",
  };

  const paymentLabel = payment_method 
    ? paymentMethodMap[payment_method as keyof typeof paymentMethodMap] || payment_method
    : "Não informado";

    
    console.log(name_freight)

  return (
    <div className="mt-8 border rounded-md border-gray-200 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b p-4 border-gray-200 bg-gray-100/60">
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

          {/* Pagamento e Total agora aparecem no painel de detalhes abaixo */}

          <div className={`${currentStatus.style} px-3 py-1 rounded-full text-center w-fit`}>
            <p className="text-xs font-medium">{currentStatus.label}</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {status === "pending" && <Timer createdAt={created_at} />}
          {status === "pending" &&
            (pix_qr_code_base64 && pix_code && (
              <button onClick={() => setShowPixCode(!showPixCode)} className="bg-green-800 text-white px-4 py-2 rounded-md hover:opacity-85 transition text-sm w-full sm:w-auto">
                {showPixCode ? "Esconder QR Code" : "Mostrar QR Code"}
              </button>
            ))}
        </div>
      </div>

      {showPixCode && status === "pending" && pix_code && pix_qr_code_base64 && (
        <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-center">
          <PixQRCode qrCode={pix_code} qrCodeBase64={pix_qr_code_base64} />
        </div>
      )}

      {/* Detalhes de Entrega e Pagamento */}
      <div className="bg-white">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition border-b border-gray-200"
        >
          <span className="font-semibold text-gray-700 text-sm">Detalhes</span>
          <ChevronDown size={18} className={`transition-transform ${showDetails ? "rotate-180" : ""}`} />
        </button>

        {showDetails && (
          <div className="px-4 py-4 space-y-3 bg-gray-50 border-b border-gray-200">
            {/* Detalhes de Pagamento */}
            <div className="pb-3">
              <p className="text-xs text-gray-500 font-bold mb-2">PAGAMENTO</p>
              <p className="text-sm font-medium text-gray-800 mt-1">{paymentLabel}</p>
            </div>

            {/* Forma de Entrega */}
            <div className="flex justify-between items-start pb-3 border-b border-gray-200">
              <div>
                <p className="text-xs text-gray-500 font-bold">FORMA DE ENTREGA</p>
                <p className="text-sm font-medium text-gray-800 mt-1">
                  {company_freight && name_freight ? `${company_freight} - ${name_freight}` : "Retirada na loja"}
                </p>
              </div>
              {price_freight && Number(price_freight) > 0 && (
                <div className="text-right">
                  <p className="text-xs text-gray-500 font-bold">VALOR FRETE</p>
                  <p className="text-sm font-semibold text-gray-800 mt-1">
                    {Number(price_freight).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </p>
                </div>
              )}
            </div>

            {/* Endereço de Entrega */}
            {logradouro && (
              <div className="pb-3">
                <p className="text-xs text-gray-500 font-bold mb-2">ENDEREÇO DE ENTREGA</p>
                <p className="text-sm text-gray-700">
                  {logradouro.type} {logradouro.number}, {logradouro.district}
                </p>
                <p className="text-sm text-gray-700">
                  {logradouro.city} - {logradouro.state}, {logradouro.zip_code}
                </p>
              </div>
            )}

            {/* Resumo Financeiro */}
            <div className="pt-3 border-t border-gray-200 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-medium text-gray-800">
                  {Number(Number(total) - (price_freight ? Number(price_freight) : 0)).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
              {price_freight && Number(price_freight) > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Frete:</span>
                  <span className="font-medium text-gray-800">
                    {Number(price_freight).toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200">
                <span className="text-gray-800">Total:</span>
                <span className="text-primary-50">
                  {Number(total).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Produtos */}
      <div className="bg-white">
      
        
        {item &&
          item.map((product, index) => (
            <div key={index} className="flex gap-4 p-4 border-b border-gray-200/60 hover:bg-gray-50/50 transition">
              <img src={product.imageProduct} alt={product.nameProduct} className="w-24 h-24 object-cover rounded" />

              <div className="text-sm flex flex-col gap-1 flex-1">
                <p className="font-medium text-gray-800">{product.nameProduct}</p>
                <p className="flex items-center gap-2 text-gray-600">
                  Cor: <FaCircle size={15} color={product.colorProduct} />
                </p>
                <p className="text-gray-600">Tamanho: {product.sizeProduct}</p>
                <p className="text-gray-600">Quantidade: {product.quantityProduct}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
