import { useAllOrders } from "@/hooks/admin/useAllOrders";

export function LastOrder() {
  const { data: allOrders } = useAllOrders();

  const limitedOrders = allOrders?.slice(0, 3);

  return (
    <section className="w-full">
      <div className="px-4 bg-primary-200 w-full max-w-xl p-5 rounded-md border border-gray-200">
        <h1 className="text-gray-800 font-semibold mb-2">Últimos pedidos</h1>

        <table className="w-full border border-gray-200 divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Nº pedido</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Lead</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">data</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {limitedOrders?.map((order: any) => (
              <tr key={order.id}>
                <td className="py-2 px-4 text-primary-50 font-semibold">#{order.number_order}</td>

                <td className="px-4 py-2">{order.user}</td>
                <td className="px-4 py-2">{order.status}</td>
                <td className="px-4 py-2">
                  {new Date(order.created_at).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
