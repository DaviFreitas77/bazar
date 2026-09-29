import Echo from "laravel-echo";
import Pusher from "pusher-js";


(window as any).Pusher = Pusher
const token = localStorage.getItem("token");

const echo = new Echo({
    broadcaster: "reverb",
    key: "jrqr4eddotexvnvo4fod",
    wsHost: "127.0.0.1",
    wsPort: 8080,
    wssPort: 8080,
    forceTLS: false,
    enabledTransports: ["ws"],
    authEndpoint: "http://localhost:8000/api/broadcasting/auth",
    withCredentials: true,


    auth: {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        },
    },
});

export default echo;

