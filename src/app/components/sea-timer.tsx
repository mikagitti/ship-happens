import { useAppSelector } from "@/store/store";
import { useEffect, useState } from "react";
import { updateTimer } from "../helpers/timer";

const timerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: '0.6rem',
};

export default function SeaTimer() {

    const gameIsRunning = useAppSelector((state) => state.gameStatus.gameIsRunning);

    const [timer, setTimer] = useState<number>(0);

    useEffect(() => {
        return updateTimer({ toggleStartStop: gameIsRunning, setTimer: setTimer });
    }, [gameIsRunning]);

    return (
        <div style={timerStyle}>
            <h1 style={{ backgroundColor: gameIsRunning ? 'lightblue' : 'red' }}>{gameIsRunning ? `Time used` : `Time stop in `}: {timer}s</h1>
        </div>
    );
}


