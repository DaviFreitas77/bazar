import { api } from "@/lib/api";

export interface Notification {
  id: number;
  type: string;
  content: string;
  is_read: boolean;
  created_at: string;
  updated_at: string;
}

export const getNotifications = async (): Promise<Notification[]> => {
  try {
    const { data } = await api.get<Notification[]>("/notifications");
    return data;
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
    throw error;
  }
};

export const markNotificationAsRead = async (id: number) => {
  try {
    const { data } = await api.patch(`/notifications/${id}/read`);
    return data;
  } catch (error) {
    console.error("Erro ao marcar notificação como lida:", error);
    throw error;
  }
};

export const deleteNotification = async (id: number) => {
  try {
    const { data } = await api.delete(`/notifications/${id}`);
    return data;
  } catch (error) {
    console.error("Erro ao deletar notificação:", error);
    throw error;
  }
};
