export function Remove() {
  return (
    <section className="border border-gray-200 rounded-md p-4 mt-4 bg-white ">
      <h2 className="text-sm font-semibold mb-4">Endereço de retirada</h2>

      <div className="mb-3">
        <label className="block text-xs font-bold text-gray-900">Cidade</label>
        <p className="text-gray-900">São Paulo</p>
      </div>
      <div className="mb-3">
        <label className="block text-xs font-bold text-gray-900">Bairro</label>
        <p className="text-gray-900">Lageado</p>
      </div>

      <div>
        <label className="block text-xs font-bold text-gray-900">Endereço</label>
        <p className="text-gray-600">Rua Faiscadores, 108</p>
      </div>
    </section>
  );
}
