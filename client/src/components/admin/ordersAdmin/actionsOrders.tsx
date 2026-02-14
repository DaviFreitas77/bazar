import { DropDown, NativeSelectOption } from "@/components/ui/native-select";



interface OrderPros{
  filterOrder: string;
  setFilterOrder: (value: string) => void;
}
export function ActionOrder({ filterOrder, setFilterOrder }:OrderPros) {
  return (
    <section className="w-full  mt-4">
      <div className="text-end w-full flex  text-sm gap-4">
        <DropDown title="Ordenar por" value={filterOrder} onChange={setFilterOrder} >
          <NativeSelectOption value="relevance">Relevância</NativeSelectOption>
          <NativeSelectOption value="recents">Mais recentes</NativeSelectOption>
          <NativeSelectOption value="oldest">Mais antigos</NativeSelectOption>
          <NativeSelectOption value="paid">Pagos</NativeSelectOption>
          <NativeSelectOption value="completed">Completo</NativeSelectOption>
          <NativeSelectOption value="pending">Pendentes</NativeSelectOption>
          <NativeSelectOption value="canceled">Cancelados</NativeSelectOption>
        </DropDown>
      </div>
    </section>
  );
}
