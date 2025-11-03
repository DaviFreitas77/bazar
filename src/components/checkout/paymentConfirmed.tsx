import { MdDone } from "react-icons/md";

export function PaymentConfirmed() {
  return (
    <section className=" justify-center items-center flex py-10 flex-col gap-15">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-green-500/20 p-2 rounded-full text-green-700">
          <MdDone size={40} />
        </div>
        <div className="text-center">
          <p className="text-2xl mt-2">Pedido confirmado!</p>
          <p className="text-gray-600 mt-5">
            Em breve você receberá um email com os detalhes do seu pedido.
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-2xl border border-green-200 max-w-md mx-auto mt-5">
          <p className="text-green-800 font-semibold">
            Número do pedido: #12345
          </p>
          <p className="text-green-700 text-sm mt-1">
            Guarde este número para acompanhar seu pedido
          </p>
        </div>
      </div>

      <div className="w-full px-4">
          <button className="bg-primary-50 hover:bg-primary-100 text-white font-medium transition duration-200 shadow-sm cursor-pointer  px-10 py-3 rounded-md">
            Acompanhar pedido
          </button>
      </div>
    </section>
  );
}
