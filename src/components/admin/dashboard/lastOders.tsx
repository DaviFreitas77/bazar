export function LastOrder() {
  return (
      <section className="w-full ">
        <div className="px-4 bg-white w-full max-w-xl p-5 rounded-md border border-gray-200 ">
          <h1 className="text-gray-800 font-semibold mb-2">Utimos pedidos</h1>
          <table className=" w-full border border-gray-200 divide-y divide-gray-200">
            <thead>
              <th className=" py-2 text-left text-sm font-semibold text-gray-700 px-4">N pedido</th>
              <th className=" py-2 text-left text-sm font-semibold text-gray-700 px-4">Lead</th>
              <th className=" py-2 text-left text-sm font-semibold text-gray-700 px-4">Status</th>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="py-2 px-4 text-primary-50 font-semibold">
                  <span >#000123</span>
                </td>
                <td className="px-4 py-2">
                  <span >Davi</span>
                </td>
                <td className="px-4 py-2">
                  <span>Pago</span>
                </td>
              </tr>
              <tr>
                <td className=" py-2  px-4 text-primary-50 font-semibold">
                  <span >#000123</span>
                </td>
                <td className="px-4 py-2">
                  <span >Davi</span>
                </td>
                <td className="px-4 py-2">
                  <span >Pago</span>
                </td>
              </tr>
              <tr>
                <td className=" py-2  px-4 text-primary-50 font-semibold">
                  <span >#000123</span>
                </td>
                <td className="px-4 py-2">
                  <span >Davi</span>
                </td>
                <td className="px-4 py-2">
                  <span >Pago</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

  );
}
