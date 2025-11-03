import { PeopleInformation } from "@/components/checkout/peopleInformation";
import { ChooseDelivery } from "@/components/checkout/delivery";
import { Progress } from "@/components/ui/progress";
import { TitlePage } from "@/components/checkout/sub-component/titlePage";
import { Summary } from "@/components/checkout/sub-component/summary";

export function Checkout() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
      <TitlePage />

      <div className="w-full max-w-[1450px] grid grid-cols-1 lg:grid-cols-3 gap-10">
        <ChooseDelivery />

        <Summary />
      </div>
    </main>
  );
}
