import { Loading } from "@/components/site/loading/loading";
import { useListItemsOrder } from "@/hooks/admin/useListItemsOrder";
import { X, CreditCard, Calendar, Receipt, Package } from "lucide-react";

type OrderDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  idOrder: number;
};

export function OrderDetailsModal({ isOpen, onClose, idOrder }: OrderDetailsModalProps) {
  const { data: itemsOrder, isLoading } = useListItemsOrder(idOrder);

  if (!isOpen || !idOrder) return null;

  const getStatusBadge = (status: string) => {
    const styles: any = {
      pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
      completed: "bg-green-100 text-green-700 border-green-200",
      canceled: "bg-red-100 text-red-700 border-red-200",
      preparando: "bg-gray-100 text-gray-700 border-gray-200",
    };
    const style = styles[status] || styles.preparando;
    return <span className={`px-3 py-1 rounded-full text-sm font-bold border ${style}`}>{status === "canceled" ? "Cancelado" : status === "completed" ? "Completo" : status === "pending" ? "Pendente" : "Preparando"}</span>;
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center px-4 py-5">
      {!isLoading && itemsOrder ? (
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Detalhes do Pedido</h2>
              <p className="text-sm text-gray-500">Gerencie as informações dos itens e pagamento</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition cursor-pointer">
              <X size={20} />
            </button>
          </div>

          <div className="p-6">
            {itemsOrder.map((order: any) => (
              <div key={order.id} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100/70 rounded-full text-primary-50">
                      <Receipt size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold">N/Pedido</p>
                      <p className="font-mono font-semibold text-gray-800">#{order.numberOrder}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100/70 rounded-full text-primary-50">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold">Data</p>
                      <p className="font-semibold text-gray-800">{new Date(order.created_at).toLocaleDateString("pt-BR")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100/70 rounded-full text-primary-50">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold">Pagamento</p>
                      <p className="font-semibold text-gray-800">{order.payment_method === "credit_card" ? "Cartão de Crédito" : "Pix / Boleto"}</p>
                    </div>
                  </div>
                </div>

                {/* Status e Total */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 block">Valor Total</span>
                    <span className="text-xl font-bold text-primary-50">{Number(order.total).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                  </div>
                </div>

                {/* Lista de Itens */}
                <div>
                  <div className="flex items-center gap-2 mb-4 text-gray-800 font-semibold">
                    <Package size={18} />
                    <h3>Itens do Pedido ({order.items?.length})</h3>
                  </div>

                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {order.items?.map((item: any, index: number) => (
                      <div key={index} className="flex items-center gap-4 border border-gray-100 p-3 rounded-xl transition-all bg-white">
                        <div className="relative group">
                          <img src={item.imageProduct} alt={item.nameProduct} className="w-16 h-16 object-cover rounded-lg" />
                          <span className="absolute -top-2 -right-2 bg-gray-900 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">{item.quantityProduct}</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-gray-800 truncate leading-tight">{item.nameProduct}</p>
                          <div className="flex gap-2 mt-1">
                            <span className="text-[11px] px-2 py-0.5 bg-gray-100 rounded text-gray-600 border border-gray-200">Cor: {item.colorProduct}</span>
                            <span className="text-[11px] px-2 py-0.5 bg-gray-100 rounded text-gray-600 border border-gray-200">Tam: {item.sizeProduct}</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-bold text-primary-50">{(Number(item.price) || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 flex justify-end">
            <button onClick={onClose} className="px-6 py-2 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-all">
              Fechar Detalhes
            </button>
          </div>
        </div>
      ) : (
        /* Estado de Loading centralizado na tela */
        <div className="flex flex-col items-center justify-center py-12 space-y-4">
          <Loading />
          <p className="text-white text-sm italic font-light">Buscando informações do pedido...</p>
        </div>
      )}
    </div>
  );
}
