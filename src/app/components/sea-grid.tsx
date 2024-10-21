
import { useState } from 'react';
import { createCellName } from '../helpers/coordination';

const cellStyle = {
    backgroundColor: 'navy',
    border: '2px solid darkblue',
    cursor: 'pointer',
    color: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '1rem',
};

const gridStyle = {
    width: '80vw',
    height: '80vw',
    maxHeight: '90vh',
    display: 'grid',
    margin: 'auto',
    gap: '1px',
};

type seaGridProps = {
    gridCount: number;
    squereSize: string;
    didItHit: (coord: string) => boolean;
}

export default function SeaGrid({ gridCount, squereSize, didItHit }: seaGridProps) {

    const [grid, setGrid] = useState<string[][]>(
        Array.from({ length: gridCount }, () => Array(gridCount).fill('navy'))
    );

    const checkTheHit = (row: number, col: number) => {
        //const newGrid = [...grid]; // Shallow copy. This copyis only one level deep. If the original array contains objects, only references to those objects are copied.
        const newGrid = grid.map(row => [...row]); // Deep copy. This copy is two levels deep. If the original array contains objects, the objects are also copied.

        const cellName = createCellName(row + 1, col + 1); // +1 because the array index starts from 0.

        if (didItHit(cellName) === true) {
            newGrid[row][col] = 'yellow';
        }
        else {
            newGrid[row][col] = 'gray';
        }
        setGrid(newGrid);
    };

    return (
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
    );
};

