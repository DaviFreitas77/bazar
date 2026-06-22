import { apiDeleteCard } from "@/api/site/customer.api";
import { AsideUser } from "@/components/site/aside/userAccount";
import { Loading } from "@/components/site/loading/loading";
import { useGetCardsSaved } from "@/hooks/site/useCustomer";
import { useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";
import { CiCreditCard2 } from "react-icons/ci";
import { toast } from "sonner";
import { SeoOrders } from "../orders/layout";

export function SavedCard() {
    const { data: savedCards, isLoading } = useGetCardsSaved();
    const queryClient = useQueryClient();
    const [deletingCardId, setDeletingCardId] = useState<string | null>(null);

    const handleDeleteCard = async (cardId?: string) => {
        if (!cardId) return;

        const canDelete = window.confirm("Deseja realmente excluir este cartao salvo?");
        if (!canDelete) return;

        setDeletingCardId(cardId);

        try {
            await apiDeleteCard(cardId);
            toast.success("Cartao removido com sucesso.");
            await queryClient.invalidateQueries({ queryKey: ["cardsSaved"] });
        } catch (error: unknown) {
            const message =
                typeof error === "object" &&
                error !== null &&
                "response" in error &&
                typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
                    ? (error as { response: { data: { message: string } } }).response.data.message
                    : "Erro ao remover cartao.";

            toast.error(message);
        } finally {
            setDeletingCardId(null);
        }
    };

    return (
        <main className="flex justify-center px-5 pt-10 pb-28 mt-25 min-h-[70vh]">
            <SeoOrders />
            <div className="w-full flex max-w-[1450px]">
                <AsideUser namePage="Meus cartões" />

                <section className="w-full lg:ml-15">
                    <h1 className="text-xl text-gray-700 font-bold">Meus cartões</h1>
                    <p className="text-gray-800 text-sm">Cartões salvos a partir das suas compras no nosso site.</p>

                    {isLoading ? (
                        <div className="flex justify-center items-center w-full mt-30">
                            <Loading />
                        </div>
                    ) : savedCards && savedCards.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-8">
                            {savedCards.map((card, index) => {
                                const brand = card.payment_method?.name || card.payment_method?.id || "Cartão";
                                const issuer = card.issuer?.name || "Emissor não informado";
                                const lastDigits = card.last_four_digits ? `**** ${card.last_four_digits}` : "Final não informado";
                                const expiration =
                                    card.expiration_month && card.expiration_year
                                        ? `${String(card.expiration_month).padStart(2, "0")}/${card.expiration_year}`
                                        : "Validade não informada";

                                return (
                                    <article key={card.id || `${brand}-${index}`} className="border border-gray-200 rounded-md p-5 bg-white flex flex-col gap-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-[#F4EDE7] p-3 rounded-full text-primary-50">
                                                    <CiCreditCard2 size={24} />
                                                </div>
                                                <div>
                                                    <h2 className="font-semibold text-gray-800">{brand}</h2>
                                                    <p className="text-xs text-gray-500">{issuer}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                {card.payment_method?.thumbnail && <img src={card.payment_method.thumbnail} alt={brand} className="h-6 max-w-12 object-contain" />}

                                                <button
                                                    type="button"
                                                    title="Excluir cartao"
                                                    aria-label="Excluir cartao salvo"
                                                    onClick={() => handleDeleteCard(card.id)}
                                                    disabled={!card.id || deletingCardId === card.id}
                                                    className="p-2 rounded-md text-red-500 hover:bg-red-50 transition cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                                                >
                                                    {deletingCardId === card.id ? <Loading width={18} height={18} /> : <Trash size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="flex items-end justify-between gap-4">
                                            <div>
                                                <p className="text-xs text-gray-500">Número</p>
                                                <p className="font-semibold text-gray-800 tracking-wide">{lastDigits}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">Validade</p>
                                                <p className="font-semibold text-gray-800">{expiration}</p>
                                            </div>
                                        </div>

                                        {card.cardholder?.name && (
                                            <div className="border-t border-gray-100 pt-4">
                                                <p className="text-xs text-gray-500">Titular</p>
                                                <p className="text-sm text-gray-800 font-medium">{card.cardholder.name}</p>
                                            </div>
                                        )}
                                    </article>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="flex justify-center items-center mt-30">
                            <p className="text-center text-gray-500 flex flex-col items-center gap-4">
                                <span className="text-2xl text-primary-50">
                                    <CiCreditCard2 size={40} />
                                </span>
                                Você ainda não possui cartões salvos.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
}
