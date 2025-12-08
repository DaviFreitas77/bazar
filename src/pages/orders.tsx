import { AsideUser } from "@/components/aside/userAccount";
import { Loading } from "@/components/loading/loading";
import { MyOrder } from "@/components/orders/myOrder";
import { useMyOrders } from "@/hooks/useMyOrders";

export function Orders() {
  const { data: myOrders, isLoading: isLoadingMyOrders } = useMyOrders();
   
  return (
    <main className="flex justify-center px-5 py-10">
      <div className="w-full flex max-w-[1450px]">
        <AsideUser namePage="Meus pedidos" />

        <section className="w-full ml-15 ">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-xl text-gray-700 font-bold">Meus pedidos</h1>
            Utimos 3 meses
          </div>

          {isLoadingMyOrders ? <div className="flex justify-center items-center h-80 w-full">
        <Loading />
      </div>: myOrders.map((order: any) => <MyOrder key={order.numberOrder} numberOrder={order.numberOrder} dateOrder={order.created_at} totalOrder={order.total} statusOrder={order.status} item={order.items}/>)}
        </section>
      </div>
    </main>
  );
}
