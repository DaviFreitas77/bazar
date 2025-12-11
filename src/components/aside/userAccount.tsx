import { FaChevronRight } from "react-icons/fa";


interface AsideUserProps{
    namePage:string
}

export  function AsideUser({namePage}:AsideUserProps){
    return(
         <section className="flex flex-col gap-8 max-w-[150px] w-full">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-gray-700 text-lg">Minha conta</h2>
            <div className="flex items-center justify-between hover:opacity-80 cursor-pointer">
              <p className={`text-sm ${namePage === 'Meus pedidos' ? 'text-primary-100' : 'text-gray-700'}`}>Meus pedidos</p>
              <FaChevronRight size={13} className="text-primary-100" />
            </div>
            <div className="flex items-center justify-between hover:opacity-80 cursor-pointer">
              <p className="text-sm">Favoritos</p>
              <FaChevronRight size={13} className="text-primary-100" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-gray-700 text-lg">Meu cadastro</h2>
            <div className="flex items-center justify-between hover:opacity-80 cursor-pointer">
              <p className="text-sm">Meus endereços</p>
              <FaChevronRight size={13} className="text-primary-100" />
            </div>
            <div className="flex items-center justify-between hover:opacity-80 cursor-pointer">
              <p className="text-sm">Meus cartões</p>
              <FaChevronRight size={13} className="text-primary-100" />
            </div>
          </div>
        </section>
    )
}