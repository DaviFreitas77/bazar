import { apiCreateCupom } from "@/api/admin/cupomAdmin";
import { Loading } from "@/components/site/loading/loading";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export function FormRegisterCupom() {
  const queryClient = useQueryClient();
  const [nameCupom, setNameCupom] = useState("");
  const [discount, setDiscount] = useState("");
  const [validity, setValidity] = useState("");
  const [limitUse, setLimitUse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputStyle = "border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-primary-50/20 focus:border-primary-50 outline-none transition-all bg-gray-50/30 focus:bg-white";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedDiscount = Number(discount.replace(",", "."));
    const parsedLimitUse = Number(limitUse);

    if (!Number.isFinite(parsedDiscount) || parsedDiscount < 0) {
      toast.error("Informe um desconto valido.");
      return;
    }

    if (!Number.isInteger(parsedLimitUse) || parsedLimitUse < 1) {
      toast.error("O limite de uso precisa ser um numero inteiro maior que zero.");
      return;
    }

    setIsSubmitting(true);
    try {
      await apiCreateCupom({
        nameCupom: nameCupom.trim().toUpperCase(),
        discount: parsedDiscount,
        validity,
        limitUse: parsedLimitUse,
      });

      toast.success("Cupom cadastrado com sucesso!");
      setNameCupom("");
      setDiscount("");
      setValidity("");
      setLimitUse("");
      await queryClient.invalidateQueries({ queryKey: ["allCupoms"] });
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
          ? (error as { response: { data: { message: string } } }).response.data.message
          : "Erro ao cadastrar cupom.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-700 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-primary-50 rounded-full"></span>
        Informacoes do cupom
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-gray-700 tracking-wider">Codigo do cupom</label>
          <input
            required
            type="text"
            value={nameCupom}
            onChange={(event) => setNameCupom(event.target.value)}
            placeholder="Ex: PRIMEIRA10"
            className={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-gray-700 tracking-wider">Desconto (%)</label>
          <input
            required
            type="number"
            min="0"
            step="0.01"
            value={discount}
            onChange={(event) => setDiscount(event.target.value)}
            placeholder="Ex: 10"
            className={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-gray-700 tracking-wider">Validade</label>
          <input
            required
            type="date"
            value={validity}
            onChange={(event) => setValidity(event.target.value)}
            className={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-bold text-gray-700 tracking-wider">Limite de uso</label>
          <input
            required
            type="number"
            min="1"
            step="1"
            value={limitUse}
            onChange={(event) => setLimitUse(event.target.value)}
            placeholder="Ex: 100"
            className={inputStyle}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-primary-50 text-white min-w-48 h-11 rounded-md font-semibold cursor-pointer disabled:opacity-60"
        >
          {isSubmitting ? <Loading /> : "Cadastrar cupom"}
        </button>
      </div>
    </form>
  );
}
