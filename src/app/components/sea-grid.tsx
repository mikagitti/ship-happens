
import { useState } from 'react';
import { createCellName } from '../helpers/coordination';

const seaGridStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
    border: '1px solid black',
};

const gridStyle = {
    width: '100%',
    height: '100%',
    display: 'grid',
};

const cellStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1.5rem',
    height: '100%',
    width: '100%',
    backgroundColor: 'navy',
    color: 'red',
    border: '1px solid darkblue',
    cursor: 'pointer',
};



type seaGridProps = {
    gridCount: number;
    isTargetHit: (coord: string) => boolean;
}

export default function SeaGrid({ gridCount, isTargetHit }: seaGridProps) {

    const [grid, setGrid] = useState<string[][]>(
        Array.from({ length: gridCount }, () => Array(gridCount).fill('navy'))
    );

    const checkTheHit = (row: number, col: number) => {
        //const newGrid = [...grid]; // Shallow copy. This copyis only one level deep. If the original array contains objects, only references to those objects are copied.
        const newGrid = grid.map(row => [...row]); // Deep copy. This copy is two levels deep. If the original array contains objects, the objects are also copied.

        const cellName = createCellName(row + 1, col + 1); // +1 because the array index starts from 0.

        if (isTargetHit(cellName) === true) {
            newGrid[row][col] = 'yellow';
        }
        else {
            newGrid[row][col] = 'gray';
        }
        setGrid(newGrid);
    };

    return (
        <div style={seaGridStyle}>

            <div style={{
                ...gridStyle,
                gridTemplateColumns: `repeat(${gridCount}, 1fr)`,
                gridTemplateRows: `repeat(${gridCount}, 1fr)`,
            }}>
                {grid.map((row, rowIndex) =>
                    row.map((color, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => checkTheHit(rowIndex, colIndex)}
                            style={{
                                ...cellStyle,
                                backgroundColor: color,
                            }}
                        >
                            {createCellName(rowIndex + 1, colIndex + 1)}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

