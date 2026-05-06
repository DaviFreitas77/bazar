
import { useNotifications } from "@/hooks/admin/useNotifications";
import { markNotificationAsRead, deleteNotification } from "@/api/admin/notificationsAdmin";
import { X, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface NotificationCardProps {
  show: boolean;
  onClose: () => void;
}

export function NotificationCard({ show, onClose }: NotificationCardProps) {
  const { notifications, isLoading, invalidateNotifications } = useNotifications();
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleMarkAsRead = async (id: number) => {
    try {
      await markNotificationAsRead(id);
      invalidateNotifications();
      toast.success("Notificação marcada como lida");
    } catch (error) {
      toast.error("Erro ao marcar notificação como lida");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      setDeletingId(id);
      await deleteNotification(id);
      invalidateNotifications();
      toast.success("Notificação removida");
    } catch (error) {
      toast.error("Erro ao remover notificação");
    } finally {
      setDeletingId(null);
    }
  };

  if (!show) return null;

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <div className="absolute right-0 top-14 w-80 max-h-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Notificações</h3>
          {unreadCount > 0 && (
            <span className="text-xs text-gray-500">
              {unreadCount} nova{unreadCount !== 1 ? "s" : ""}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <X size={18} />
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto max-h-80">
        {isLoading ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            Carregando notificações...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500 text-sm">
            Nenhuma notificação no momento
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition flex justify-between items-start gap-3 ${
                !notification.is_read ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-start gap-2">
                  {!notification.is_read && (
                    <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></span>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 capitalize">
                      {notification.type}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 break-words">
                      {notification.content}
                    </p>
                    <span className="text-xs text-gray-400 mt-1 block">
                      {new Date(notification.created_at).toLocaleDateString(
                        "pt-BR",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 flex-shrink-0">
                {!notification.is_read && (
                  <button
                    onClick={() => handleMarkAsRead(notification.id)}
                    className="p-1 hover:bg-white rounded transition text-gray-400 hover:text-green-600"
                    title="Marcar como lido"
                  >
                    <Check size={16} />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(notification.id)}
                  disabled={deletingId === notification.id}
                  className="p-1 hover:bg-white rounded transition text-gray-400 hover:text-red-600 disabled:opacity-50"
                  title="Remover"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}