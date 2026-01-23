export function LastLeads() {
  return (

      <section className="w-full ">
        <div className="px-4 bg-primary-200 w-full max-w-xl p-5 rounded-md border border-gray-200 h-auto ">
          <h1 className="text-gray-800 font-semibold mb-2">Utimos leads</h1>
          <table className=" w-full border border-gray-200 divide-y divide-gray-200">
            <thead>
              <tr>

              <th className=" py-2 text-left text-sm font-semibold text-gray-700 px-4">Nome</th>
              <th className=" py-2 text-left text-sm font-semibold text-gray-700 px-4">email</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="py-2 px-4 text-primary-50 font-semibold">
                  <span>Davi Freitas</span>
                </td>
                <td className="px-4 py-2">
                  <span>davi@gmail.com</span>
                </td>
              </tr>
              <tr>
                <td className=" py-2  px-4 text-primary-50 font-semibold">
                  <span>Ana Souza</span>
                </td>
                <td className="px-4 py-2">
                  <span>ana.souza@gmail.com</span>
                </td>
              </tr>
              <tr>
                <td className=" py-2  px-4 text-primary-50 font-semibold">
                  <span>Carlos Lima</span>
                </td>
                <td className="px-4 py-2">
                  <span>carloslima@gmail.com</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

  );
}
