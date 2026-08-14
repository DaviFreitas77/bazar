import Echo from "laravel-echo";
import Pusher from "pusher-js";


(window as any).Pusher = Pusher;

const echo = new Echo({
    broadcaster: "reverb",
    key: "3hub7jghiune934zlf0r",
    wsHost: "localhost",
    wsPort: 8080,
    wssPort: 8080,
    forceTLS: false,
    enabledTransports: ["ws"],
});

export default echo;

