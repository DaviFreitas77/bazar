import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotifications } from "@/api/admin/notificationsAdmin";

export function useNotifications() {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
    refetchInterval: 10000, // Refetch a cada 10 segundos
  });

  const queryClient = useQueryClient();

  const invalidateNotifications = () => {
    queryClient.invalidateQueries({
      queryKey: ["notifications"],
    });
  };

  return {
    notifications: data || [],
    isLoading,
    error,
    refetch,
    invalidateNotifications,
  };
}
