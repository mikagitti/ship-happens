import { Dispatch, SetStateAction, useEffect, useState } from "react";

type timerProps = {
    toggleStartStop: boolean;
};

const timerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    fontSize: '0.6rem',
};

export default function SeaTimer({ toggleStartStop = false }: timerProps) {

    const [timer, setTimer] = useState<number>(0);

    useEffect(() => {
        return updateTimer(toggleStartStop, setTimer);
    }, [toggleStartStop]);

    return (
        <div style={timerStyle}>
            <h1 style={{ backgroundColor: toggleStartStop ? 'lightblue' : 'red' }} >Time used: {timer}s</h1>
        </div>
    );
}

function updateTimer(toggleStartStop: boolean, setTimer: Dispatch<SetStateAction<number>>) {
    let interval: NodeJS.Timeout | undefined = undefined;
    if (toggleStartStop) {
        interval = setInterval(() => {
            setTimer(prevTimer => prevTimer + 1);
        }, 1000);
    } else if (!toggleStartStop) {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
}
