import { CiDeliveryTruck } from "react-icons/ci";
import type { ChooseDelivery } from "../delivery";

interface ChooseProps {
  chooseDelivery: ChooseDelivery;
  setChooseDelivery: React.Dispatch<React.SetStateAction<ChooseDelivery>>;
}
export function Choose({ chooseDelivery, setChooseDelivery }: ChooseProps) {
  const options: { value: ChooseDelivery; title: string; description: string }[] = [
    { value: "retired", title: "Retirar", description: "Passe para buscar no endereço" },
    { value: "delivery", title: "Entregar em casa", description: "Receba rápido na sua casa" },
  ];

  return (
    <section className="mt-5 space-y-3" role="radiogroup" aria-label="Método de entrega">
      {options.map((option) => {
        const selected = chooseDelivery === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setChooseDelivery(option.value)}
            className={`flex w-full items-center gap-4 rounded-lg border px-4 py-3 text-left transition duration-200 ${selected ? "border-[#00857f] bg-[#eef8f6] shadow-[0_3px_12px_rgba(11,80,80,0.08)]" : "border-gray-200 bg-white hover:border-[#00857f]/40 hover:bg-[#fafdfc]"}`}
          >
            <span className={`flex size-12 shrink-0 items-center justify-center rounded-full ${selected ? "bg-primary-50 text-white" : "bg-[#eaf7f5] text-[#00857f]"}`}>
              <CiDeliveryTruck size={28} aria-hidden="true" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-gray-900">{option.title}</span>
              <span className="mt-0.5 block text-xs text-gray-500">{option.description}</span>
            </span>
            <span className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? "border-[#00857f]" : "border-gray-400"}`} aria-hidden="true">
              {selected && <span className="size-2.5 rounded-full bg-primary-50" />}
            </span>
          </button>
        );
      })}
    </section>
  );
}
