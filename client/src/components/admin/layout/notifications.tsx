
interface NotificationCardProps {
    show: boolean;
    onClose: () => void;
}

export function NotificationCard  ({ show, onClose }: NotificationCardProps) {
  if (!show) return null;
    return(
        <div className=" w-full h-96  bg-white rounded-md flex items-center justify-between px-4">
         a
        </div>
    )
}