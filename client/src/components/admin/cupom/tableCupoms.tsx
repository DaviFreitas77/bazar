import { apiDeleteCupom } from "@/api/admin/cupomAdmin";
import { Loading } from "@/components/site/loading/loading";
import { useAllCupoms } from "@/hooks/admin/useAllCupoms";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function TableCupoms() {
  const queryClient = useQueryClient();
  const { data: cupoms, isLoading } = useAllCupoms();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleDeleteCupom = async (id: number) => {
    const canDelete = window.confirm("Deseja realmente excluir este cupom?");
    if (!canDelete) return;

    setDeletingId(id);
    try {
      await apiDeleteCupom(id);
      toast.success("Cupom removido com sucesso.");
      await queryClient.invalidateQueries({ queryKey: ["allCupoms"] });
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
          ? (error as { response: { data: { message: string } } }).response.data.message
          : "Erro ao remover cupom.";

      toast.error(message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <section className="bg-white px-4 rounded-md pb-4 border border-gray-200">
      <div className="w-full pt-4 my-4">
        <h3 className="text-lg font-semibold text-gray-700">Cupons cadastrados</h3>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
          <thead className="bg-primary-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Codigo</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Desconto</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Validade</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Limite de uso</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Acoes</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  <Loading />
                </td>
              </tr>
            ) : cupoms && cupoms.length > 0 ? (
              cupoms.map((cupom) => (
                <tr key={cupom.id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2 text-primary-50 font-bold">{cupom.id}</td>
                  <td className="px-4 py-2 font-semibold">{cupom.nameCupom}</td>
                  <td className="px-4 py-2">{Number(cupom.discount).toFixed(2)}%</td>
                  <td className="px-4 py-2">{new Date(cupom.validity).toLocaleDateString("pt-BR")}</td>
                  <td className="px-4 py-2">{cupom.limitUse}</td>
                  <td className="px-4 py-2">
                    <button
                      type="button"
                      title="Excluir cupom"
                      onClick={() => handleDeleteCupom(cupom.id)}
                      disabled={deletingId === cupom.id}
                      className="p-2 rounded-md hover:bg-red-50 transition cursor-pointer"
                    >
                      {deletingId === cupom.id ? <Loading width={18} height={18} /> : <Trash size={18} className="text-red-500" />}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-6 text-gray-400">
                  Nenhum cupom cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
