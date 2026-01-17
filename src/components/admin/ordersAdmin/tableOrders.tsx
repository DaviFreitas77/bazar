import { Pagination } from "@/components/site/search/pagination";
import { useMemo, useState } from "react";
import { ActionOrder } from "./actionsOrders";
import { Graphic } from "@/components/ui/chart";

interface Order {
  id: number;
  orderNumber: string;
  productId: number;
  customerName: string;
  coupon?: string;
  status: "Pago" | "Pendente" | "Cancelado";
  paymentMethod: "Cartão" | "Pix" | "Boleto";
  total: number;
  createdAt: string;
}

const orders: Order[] = [
  {
    id: 1,
    orderNumber: "#000123",
    productId: 101,
    customerName: "João Silva",
    coupon: "PROMO10",
    status: "Pago",
    paymentMethod: "Cartão",
    total: 250.9,
    createdAt: "10/01/2026",
  },
  {
    id: 2,
    orderNumber: "#000124",
    productId: 102,
    customerName: "Maria Santos",
    status: "Pendente",
    paymentMethod: "Pix",
    total: 120,
    createdAt: "11/01/2026",
  },
  {
    id: 3,
    orderNumber: "#000125",
    productId: 103,
    customerName: "Carlos Lima",
    coupon: "FRETEGRATIS",
    status: "Cancelado",
    paymentMethod: "Boleto",
    total: 89.9,
    createdAt: "12/01/2026",
  },
  {
    id: 4,
    orderNumber: "#000126",
    productId: 104,
    customerName: "Ana Paula",
    status: "Pago",
    paymentMethod: "Cartão",
    total: 430,
    createdAt: "13/01/2026",
  },
  {
    id: 5,
    orderNumber: "#000127",
    productId: 105,
    customerName: "Rafael Costa",
    status: "Pago",
    paymentMethod: "Pix",
    total: 199.99,
    createdAt: "14/01/2026",
  },
  {
    id: 6,
    orderNumber: "#000128",
    productId: 106,
    customerName: "Fernanda Rocha",
    status: "Pendente",
    paymentMethod: "Boleto",
    total: 310,
    createdAt: "15/01/2026",
  },
  {
    id: 7,
    orderNumber: "#000129",
    productId: 107,
    customerName: "Lucas Mendes",
    status: "Pago",
    paymentMethod: "Cartão",
    total: 99.9,
    createdAt: "15/01/2026",
  },
  {
    id: 8,
    orderNumber: "#000130",
    productId: 108,
    customerName: "Paulo Henrique",
    status: "Pago",
    paymentMethod: "Pix",
    total: 560,
    createdAt: "16/01/2026",
  },
];

export function TableOrders() {
  const [filterOrder, setFilterOrder] = useState("relevance");
  const ordersPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const parseDate = (date: string) => {
    const [day, month, year] = date.split("/");
    return new Date(`${year}-${month}-${day}`).getTime();
  };

  const filteredAndSortedOrders = useMemo(() => {
    let result = [...orders];

    if (filterOrder === "paid") {
      result = result.filter((order) => order.status === "Pago");
    }

    if (filterOrder === "pending") {
      result = result.filter((order) => order.status === "Pendente");
    }

    if (filterOrder === "canceled") {
      result = result.filter((order) => order.status === "Cancelado");
    }

    switch (filterOrder) {
      case "relevance":
        result.sort((a, b) => b.id - a.id);
        break;

      case "recents":
        result.sort((a, b) => parseDate(b.createdAt) - parseDate(a.createdAt));
        break;

      case "oldest":
        result.sort((a, b) => parseDate(a.createdAt) - parseDate(b.createdAt));
        break;
    }

    return result;
  }, [filterOrder]);

  const indexOfLastItem = currentPage * ordersPerPage;
  const indexOfFirstItem = indexOfLastItem - ordersPerPage;
  const currentItems = filteredAndSortedOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="mt-4 px-4 w-full pb-20">
      <section className="flex w-full gap-2">
        <Graphic title="Métodos de pagamento" />
        <Graphic title="Métodos de pagamento" />
      </section>
      <section className="my-3">
        <ActionOrder filterOrder={filterOrder} setFilterOrder={setFilterOrder} />
      </section>

      <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Pedido</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Produto ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Cliente</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Cupom</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Pagamento</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Total</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Data</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-200">
          {currentItems.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 font-semibold text-primary-50">{order.orderNumber}</td>
              <td className="px-4 py-2">{order.productId}</td>
              <td className="px-4 py-2">{order.customerName}</td>
              <td className="px-4 py-2">{order.coupon ?? "-"}</td>
              <td className="px-4 py-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold
                    ${order.status === "Pago" ? "bg-green-100 text-green-700" : order.status === "Pendente" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}
                >
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-2">{order.paymentMethod}</td>
              <td className="px-4 py-2 font-semibold">R$ {order.total.toFixed(2)}</td>
              <td className="px-4 py-2">{order.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <Pagination currentPage={currentPage} totalPages={totalPages} nextPage={nextPage} prevPage={prevPage} />
      </div>
    </div>
  );
}
