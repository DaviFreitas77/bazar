import type { myOrderProps } from "@/api/@types/order";
import { AsideUser } from "@/components/aside/userAccount";
import { Loading } from "@/components/loading/loading";
import { MyOrder } from "@/components/orders/myOrder";
import { DropDown, NativeSelectOption } from "@/components/ui/native-select";
import { useMyOrders } from "@/hooks/useMyOrders";
import { useMemo, useState } from "react";

export function Orders() {
  const { data: myOrders, isLoading: isLoadingMyOrders } = useMyOrders();
  const [filterOrder, setFilterOrder] = useState("relevance");

  const sortedOrders = useMemo(() => {
    switch (filterOrder) {
      case "relevance":
        return myOrders;

      case "highestTotal":
        return myOrders?.sort((a: myOrderProps, b: myOrderProps) => b.total - a.total);

      case "lowestTotal":
        return myOrders?.sort((a: myOrderProps, b: myOrderProps) => a.total - b.total);

      default:
        return myOrders;
    }
  }, [filterOrder, myOrders]);

  return (
    <main className="flex justify-center px-5 py-10">
      <div className="w-full flex max-w-[1450px]">
        <AsideUser namePage="Meus pedidos" />

        <section className="w-full ml-15 ">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-xl text-gray-700 font-bold">Meus pedidos</h1>
            <DropDown title="Ordenar por" value={filterOrder} onChange={setFilterOrder}>
              <NativeSelectOption value="relevance">Relevância</NativeSelectOption>
              <NativeSelectOption value="highestTotal">Maior total</NativeSelectOption>
              <NativeSelectOption value="lowestTotal">Menor total</NativeSelectOption>
            </DropDown>
          </div>

          {isLoadingMyOrders ? (
            <div className="flex justify-center items-center h-80 w-full">
              <Loading />
            </div>
          ) : (
            sortedOrders?.map((order: any) => <MyOrder key={order.numberOrder} numberOrder={order.numberOrder} dateOrder={order.created_at} totalOrder={order.total} statusOrder={order.status} item={order.items} />)
          )}
        </section>
      </div>
    </main>
  );
}
