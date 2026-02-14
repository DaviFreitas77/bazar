import { useCheckout } from "@/context/checkoutContext";
import { useEffect, useRef } from "react";

interface TimerProps {
  createdAt: string;
}
export function Timer({ createdAt }: TimerProps) {
  const secondsRef = useRef(0);
  const minutesRef = useRef(0);
  const { preference } = useCheckout();
  const timerSpanRef = useRef<HTMLSpanElement>(null);

  const createdTime = new Date(createdAt).getTime();
  const expirationTime = createdTime + 15 * 60 * 1000; //minutes * seconds * milliseconds

  const calcDiference = () => {
    const diference = expirationTime - new Date().getTime();

    if (diference <= 0) {
      minutesRef.current = 0;
      secondsRef.current = 0;
      return 0;
    }

    return diference;
  };

  minutesRef.current = Math.floor(calcDiference() / 1000 / 60);
  secondsRef.current = Math.floor((calcDiference() / 1000) % 60);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (minutesRef.current !== 0 || secondsRef.current !== 0) {
        if (minutesRef.current == 0 && secondsRef.current == 0) {
          return;
        }
        if (secondsRef.current == 0) {
          minutesRef.current--;
          secondsRef.current = 59;
        } else {
          secondsRef.current--;
        }
      }
      if (timerSpanRef.current) {
        timerSpanRef.current.textContent = `${minutesRef.current}:${secondsRef.current < 10 ? "0" + secondsRef.current : secondsRef.current}`;

        if (minutesRef.current == 0 && secondsRef.current < 10) {
          timerSpanRef.current.classList.remove("text-green-900");
          timerSpanRef.current.classList.add("text-red-500");
        } else {
          timerSpanRef.current.classList.add("text-green-900");
          timerSpanRef.current.classList.remove("text-red-500");
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [preference.id]);
  return (
    <div>
      {minutesRef.current > 0 || secondsRef.current > 0 ? (
        <span ref={timerSpanRef} className="font-semibold text-green-900 text-lg">
          {minutesRef.current}:{secondsRef.current}
        </span>
      ) : null}
    </div>
  );
}
