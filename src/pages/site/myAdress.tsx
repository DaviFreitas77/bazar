
import { deleteLogradouro } from "@/api/logradouro.api";
import { AsideUser } from "@/components/site/aside/userAccount";
import { useMyLogradouro } from "@/hooks/useMyLogradouro";
import { Trash2Icon } from "lucide-react";
import { HiOutlineHome } from "react-icons/hi2";

export function MyAdress() {
  const { data: myLogradouro, isLoading, refetch } = useMyLogradouro();

  const delAdress = async (id: number) => {
    try {
      const response = await deleteLogradouro(id);
      refetch();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex justify-center px-5 py-10">
      <div className="w-full flex max-w-[1450px]">
        <AsideUser namePage="Meus endereços" />

        <section className="w-full lg:ml-15  ">
          <div className="flex justify-between items-center w-full">
            <h1 className="text-xl text-gray-700 font-bold">Meus endereços</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10 ">
            {isLoading ? (
              <p className="text-gray-500 col-span-3">Carregando endereços...</p>
            ) : myLogradouro && myLogradouro.length > 0 ? (
              myLogradouro.map((adress) => (
                <div key={adress.id} className="flex items-start gap-3 p-4 border border-gray-200 rounded-lg bg-white hover:border-primary-50/50 transition-colors">
                  {/* Ícone de Pin */}
                  <div className="mt-1 text-primary-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>

                  <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900 capitalize">
                        {adress.type}, {adress.number}
                      </span>

                      <button onClick={() => delAdress(adress.id)} title="Excluir endereço">
                        <Trash2Icon size={17} className="text-primary-50 hover:text-red-500 transition-colors cursor-pointer" />
                      </button>
                    </div>

                    <p className="text-sm text-gray-600 leading-relaxed">
                      {adress.district} — {adress.city}, {adress.state} <br />
                      <span className="text-xs font-medium text-gray-400">CEP: {adress.zip_code}</span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center flex-col col-span-3 mt-10">
                <HiOutlineHome size={45} className="text-primary-50" />
                <p className="text-gray-500 text-center py-3">Você não possui endereços cadastrados.</p>
              </div>
            )}
          </div>
          <button className="w-full lg:w-60 mt-10 bg-primary-50 px-8 py-3 rounded-sm text-white cursor-pointer hover:bg-primary-100 transition-colors ease-in-out duration-300 text-sm">Adicionar endereço</button>
        </section>
      </div>
    </main>
  );
}
