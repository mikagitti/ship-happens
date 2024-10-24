'use client';
import { CSSProperties, useState } from "react";
import { getShipOnMap } from "./helpers/coordination";
import SeaGrid from "./components/sea-grid";
import SettingsBanner from "./components/settings-banner";
import styles from './page.module.css';
import { comboBoxValues } from "./helpers/coordination";


export default function Home() {

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

  const handleStartNewGameButtonClick = () => {
    const ship = getShipOnMap(gridCount, shipLength);
    setShipOnMap(ship);
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
          <div className={styles.gridTop}>
            <h1>Ship Happens</h1>
            <button className={styles.buttonStyle} onClick={handleNewGameButtonClick}>New Game</button>
          </div>

          <div className={styles.gridBottom}>
            <SeaGrid key={shipOnMap.join(',')} gridCount={gridCount} isTargetHit={isTargetHit} />
          </div>
        </> :
        <>
          <div className={styles.gridTop}>
            <SettingsBanner setGridCount={setGridCount} setShipLength={setShipLength} />
          </div>

          <div className={styles.gridBottom}>
            <button className={styles.buttonStyle} onClick={handleStartNewGameButtonClick}>PLAY!!</button>
          </div>
        </>
      }
    </div>
  );
}
