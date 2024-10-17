'use client';
import SeaButton from "./components/sea-button";

const tileCount = 5;
const squereSize = 40;

const pageStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh'
}

const playgroundStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '500px',
  height: '500px',
  border: '1px solid black'
}

const buttonContainerStyle = {
  display: 'grid',
  gridTemplateColumns: `repeat(${tileCount}, 1fr)`,
  gap: '10px'
}

const boatsLocation = ['A1', 'A2', 'A3'];

export default function Home() {

  const didItHit = (coord: string): boolean => {
    if (boatsLocation.includes(coord)) {
      return true;
    }
    return false;
  }


  return (
    <div style={pageStyle}>
      <div style={playgroundStyle}>
        <div style={buttonContainerStyle}>
          {[...Array(tileCount * tileCount)].map((_, index) => {

            return (
              <SeaButton key={index} squereSize={squereSize} name={createCoordinationName()} didItHit={didItHit} />
            );

            function getRowAndColumn() {
              const row: string = String.fromCharCode(65 + Math.floor(index / tileCount));
              const col: number = (index % tileCount) + 1;
              return { row, col };
            }

            function createCoordinationName() {
              const { row, col }: { row: string; col: number; } = getRowAndColumn();
              return `${row}${col}`;
            }

          })}
        </div>
      </div>
    </div>
  );
}
