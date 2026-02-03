import ShinyText from "@/components/styles/shineText";
import { useUser } from "@/context/userContext";
import { Search } from "lucide-react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { motion } from "framer-motion";

export function HeaderAdmin() {
   const {name} = useUser();
  return (
    <header className="border-b border-b-gray-200 ">
      <div className=" flex justify-between items-center py-4">
        
          <motion.div 
          animate={{ opacity: 1,y:0 }} initial={{ opacity: 0, y: -50 }}transition={{
            duration:0.8,
            delay:0.1,
            ease: [0, 0.71, 0.2, 1.01],
          }} 
          >  
          <p className="text-2xl">
            Olá <ShinyText
              text={`${name}`}
              speed={2}
              delay={0}
              color="#000"
              shineColor="#ffffff"
              spread={120}
              direction="left"
              yoyo={false}
              pauseOnHover={false}
              disabled={false}
            />
             
          </p>
          <p className="text-gray-400">Acompanhe o desempenho do seu negócio</p>
        </motion.div>
        <div className="relative flex items-center gap-4">
          {/* Input de pesquisa com ícone */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" className="rounded-full bg-white w-72 py-1.5 pl-10 pr-4 border border-gray-200 outline-primary-50" placeholder="Pesquisa..." />
          </div>

          {/* Botão de notificação */}
          <button className="relative border rounded-full p-2 border-gray-200">
            <IoIosNotificationsOutline size={20} />
            {/* Pontinho de notificação */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>
      </div>
    </header>
  );
}
