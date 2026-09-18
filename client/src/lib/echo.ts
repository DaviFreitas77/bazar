import Echo from "laravel-echo";
import Pusher from "pusher-js";


(window as any).Pusher = Pusher
const token = localStorage.getItem("token");

const echo = new Echo({
    broadcaster: "reverb",
    key: "sk9tvwlypxvpbgiiytie",
    wsHost: "127.0.0.1",
    wsPort: 8080,
    wssPort: 8080,
    forceTLS: false,
    enabledTransports: ["ws"],
    authEndpoint: "https://16d9-2804-214-8023-5dee-cc8b-194b-6231-2ec8.ngrok-free.app/api/broadcasting/auth",
    withCredentials: true,


    auth: {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    },
});

export default echo;

