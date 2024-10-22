'use client';
import { CSSProperties, useState } from "react";
import { getShipOnMap } from "./helpers/coordination";
import SeaGrid from "./components/sea-grid";
import SettingsBanner from "./components/settings-banner";


const pageStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
}

const playgroundStyle: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid black'
}

const comboBoxValues = {
  gridCount: [5, 7, 10] as number[],
  shipLength: [1, 2, 3] as number[],
}

export default function Home() {

  const [shipOnMap, setShipOnMap] = useState<string[] | null>(null);
  const [gridCount, setGridCount] = useState<number>(5);
  const [shipLength, setShipLength] = useState<number>(1);

  const isTargetHit = (coordinationXY: string): boolean => {
    if (shipOnMap && shipOnMap.includes(coordinationXY)) {
      return true;
    }
    return false;
  }

  const handleStartNewGameButtonClick = () => {
    const ship = getShipOnMap(gridCount, shipLength);
    setShipOnMap(ship);

    console.log(ship);

  }

  const handleNewGameButtonClick = () => {
    setShipOnMap(null);
  }


  return (
    <>
      <div style={pageStyle}>
        {shipOnMap ?
          <>
            <button style={{ padding: '10px', marginTop: '20px' }} onClick={handleNewGameButtonClick}>New Game</button>
            <SeaGrid key={shipOnMap.join(',')} gridCount={gridCount} isTargetHit={isTargetHit} />
          </> :
          <>
            <SettingsBanner setGridCount={setGridCount} setShipLength={setShipLength} comboBoxValues={comboBoxValues} />
            <button style={{ padding: '10px' }} onClick={handleStartNewGameButtonClick}>LET'S PLAY!!</button>
          </>
        }
      </div>
    </>
  );
}
