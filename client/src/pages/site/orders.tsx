
import type { OrderProps } from "@/api/@types/order";
import { AsideUser } from "@/components/site/aside/userAccount";
import { Loading } from "@/components/site/loading/loading";
import { MyOrder } from "@/components/site/orders/myOrder";
import { DropDown, NativeSelectOption } from "@/components/ui/native-select";
import { useMyOrders } from "@/hooks/site/useMyOrders";
import { useMemo, useState } from "react";
import { BsBoxSeam } from "react-icons/bs";

export function Orders() {
  const { data: myOrders, isLoading: isLoadingMyOrders } = useMyOrders();

  const [filterOrder, setFilterOrder] = useState("relevance");

  const sortedOrders = useMemo(() => {
    let ordersCopy = [...(myOrders || [])];

    switch (filterOrder) {
      case "relevance":
        return ordersCopy.sort((a: OrderProps, b: OrderProps) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      case "highestTotal":
        return ordersCopy.sort((a: OrderProps, b: OrderProps) => Number(b.total) - Number(a.total));

      case "lowestTotal":
        return ordersCopy.sort((a: OrderProps, b: OrderProps) => Number(a.total) - Number(b.total));

      default:
        return ordersCopy;
    }
  }, [filterOrder, myOrders]);

 
  return (
    <main className="flex justify-center px-5 py-10 ">
      <div className="w-full flex max-w-[1450px]">
        <AsideUser namePage="Meus pedidos" />

        <section className="w-full lg:ml-15 ">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-xl text-gray-700 font-bold">Meus pedidos</h1>
            <DropDown title="Ordenar por" value={filterOrder} onChange={setFilterOrder}>
              <NativeSelectOption value="relevance">Relevância</NativeSelectOption>
              <NativeSelectOption value="highestTotal">Maior total</NativeSelectOption>
              <NativeSelectOption value="lowestTotal">Menor total</NativeSelectOption>
            </DropDown>
          </div>

          {isLoadingMyOrders ? (
            <div className="flex justify-center items-center w-full">
              <Loading />
            </div>
          ) : sortedOrders && sortedOrders.length > 0 ? (
            sortedOrders.map((order: any) => <MyOrder key={order.numberOrder} number_order={order.numberOrder} created_at={order.created_at} total={order.total} status={order.status} item={order.items} />)
          ) : (
            <div className="flex justify-center items-center mt-30">
              <p className="text-center text-gray-500  flex flex-col items-center gap-4">
                <span className="text-2xl text-primary-50">
                  <BsBoxSeam size={40} />
                </span>
                Você ainda não realizou nenhum pedido.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
