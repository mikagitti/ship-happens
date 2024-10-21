'use client';
import { CSSProperties, use, useEffect, useState } from "react";
import { getShipOnMap } from "./helpers/coordination";
import SeaGrid from "./components/sea-grid";

const gridCount = 7;
const squereSize = '210px';
const shipLength = 3;

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

export default function Home() {

  const [shipOnMap, setShipOnMap] = useState<string[] | null>(null);

  const didItHit = (coord: string): boolean => {
    if (shipOnMap && shipOnMap.includes(coord)) {
      return true;
    }
    return false;
  }

  return (
    <>
      <div style={pageStyle}>
        <button onClick={() => setShipOnMap(getShipOnMap(gridCount, shipLength))}>Start New Game!</button>
        {shipOnMap &&
          <SeaGrid key={shipOnMap.join(',')} gridCount={gridCount} squereSize={squereSize} didItHit={didItHit} />
        }
      </div>
    </>
  );
}
