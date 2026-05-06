import ShinyText from "@/components/styles/shineText";
import { useUser } from "@/context/userContext";
// import { Search } from "lucide-react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { motion } from "framer-motion";
import { useState } from "react";
import { NotificationCard } from "./notifications";
import { useNotifications } from "@/hooks/admin/useNotifications";

export function HeaderAdmin() {
  const { name } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const { notifications } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <header className="border-b border-b-gray-200 ">
      <div className=" flex justify-between items-center py-4">
        
        <motion.div 
          animate={{ opacity: 1, y: 0 }} 
          initial={{ opacity: 0, y: -50 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
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
          {/* Botão de notificação */}
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative border rounded-full p-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition"
          >
            <IoIosNotificationsOutline size={20} />
            {/* Pontinho de notificação */}
            {unreadCount > 0 && (
              <>
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              </>
            )}
          </button>

          {/* Painel de notificações */}
          <NotificationCard show={showNotifications} onClose={() => setShowNotifications(false)} />
        </div>
      </div>
    </header>
  );
}
