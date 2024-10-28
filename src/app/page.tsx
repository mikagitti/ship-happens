'use client';
import { useState } from "react";

import styles from './page.module.css';

import { comboBoxValues, getShipOnMap } from "./helpers/coordination";

import SeaGrid from "./components/sea-grid";
import SeaTimer from "./components/sea-timer";
import SettingsBanner from "./components/settings-banner";

import { setGameIsRunning, resetClickCount } from "@/store/gameStatusSlice";
import { useAppSelector } from '../store/store'
import { useDispatch } from "react-redux";

export default function Home() {

  const dispatch = useDispatch();
  const clickCount = useAppSelector((state) => state.gameStatus.clickCount);
  const gameIsRunning = useAppSelector((state) => state.gameStatus.gameIsRunning);

  const defaultGridCount: number = comboBoxValues.defaultGridCount;
  const defaultShipLength: number = comboBoxValues.defaultShipLength;

  const [shipOnMap, setShipOnMap] = useState<string[] | null>(null);
  const [gridCount, setGridCount] = useState<number>(defaultGridCount);
  const [shipLength, setShipLength] = useState<number>(defaultShipLength);

  const isTargetHit = (coordinationXY: string): boolean => {
    if (shipOnMap && shipOnMap.includes(coordinationXY)) {
      return true;
    }
    return false;
  }

  const handlePlayGameButtonClick = () => {
    const ship = getShipOnMap(gridCount, shipLength);
    setShipOnMap(ship);
    dispatch(resetClickCount());
    dispatch(setGameIsRunning(true));
  }

  const handleNewGameButtonClick = () => {
    setShipOnMap(null);
    setGridCount(defaultGridCount);
    setShipLength(defaultShipLength);
  }

  return (
    <div className={styles.gridcontainer}>
      {shipOnMap ?
        <>
          {/** TOP */}
          <div className={styles.gridTop}>
            <h1>Ship Happens</h1>
            <button className={styles.buttonStyle} onClick={handleNewGameButtonClick}>New Game</button>
            <h3>Click counter: {clickCount}</h3>
            <h3>Game is running: {gameIsRunning ? 'ON' : 'OFF'}</h3>
          </div>

          {/** TIMER */}
          <div className={styles.timerArea}>
            <SeaTimer />
          </div>

          {/** PLAY AREA */}
          <div className={styles.gridBottom}>
            <SeaGrid key={shipOnMap.join(',')} gridCount={gridCount} isTargetHit={isTargetHit} />
          </div>
        </> :
        <>
          {/** TOP */}
          <div className={styles.gridTop}>
            <SettingsBanner setGridCount={setGridCount} setShipLength={setShipLength} />
          </div>

          {/** TIMER */}
          <div className={styles.timerArea}>
            <p></p>
          </div>

          {/** PLAY AREA */}
          <div className={styles.gridBottom}>
            <button className={styles.buttonStyle} onClick={handlePlayGameButtonClick}>PLAY!!</button>
          </div>
        </>
      }
    </div>
  );
}
