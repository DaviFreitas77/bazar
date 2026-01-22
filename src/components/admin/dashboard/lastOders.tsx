export function LastOrder() {
  return (
    <section className="w-full">
      <div className="px-4 bg-white w-full max-w-xl p-5 rounded-md border border-gray-200">
        <h1 className="text-gray-800 font-semibold mb-2">
          Últimos pedidos
        </h1>

        <table className="w-full border border-gray-200 divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Nº pedido
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Lead
              </th>
              <th className="py-2 px-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="py-2 px-4 text-primary-50 font-semibold">
                #000123
              </td>
              <td className="px-4 py-2">Davi</td>
              <td className="px-4 py-2">Pago</td>
            </tr>

            <tr>
              <td className="py-2 px-4 text-primary-50 font-semibold">
                #000124
              </td>
              <td className="px-4 py-2">Davi</td>
              <td className="px-4 py-2">Pago</td>
            </tr>

            <tr>
              <td className="py-2 px-4 text-primary-50 font-semibold">
                #000125
              </td>
              <td className="px-4 py-2">Davi</td>
              <td className="px-4 py-2">Pago</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
