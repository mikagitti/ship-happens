import { Dispatch, SetStateAction } from "react";

type timerProps = {
     toggleStartStop: boolean;
     setTimer: Dispatch<SetStateAction<number>>;
};

export function updateTimer({ toggleStartStop, setTimer }: timerProps) {
     let interval: NodeJS.Timeout | undefined = undefined;
     if (toggleStartStop) {
          interval = setInterval(() => {
               setTimer((prevTimer) => prevTimer + 1);
          }, 1000);
     } else if (!toggleStartStop) {
          clearInterval(interval);
     }
     return () => clearInterval(interval);
}
