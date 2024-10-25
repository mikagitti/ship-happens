
import { Dispatch, SetStateAction, useState } from 'react';
import { createCellName } from '../helpers/coordination';
import { cellStyle, gridStyle, seaGridStyle } from './sea-grid-styles';
import './sea-grid-styles.css';


type seaGridProps = {
    gridCount: number;
    isTargetHit: (coord: string) => boolean;
    setTimerRunning: Dispatch<SetStateAction<boolean>>;
}

export default function SeaGrid({ gridCount, isTargetHit, setTimerRunning }: seaGridProps) {

    const [grid, setGrid] = useState<string[][]>(
        Array.from({ length: gridCount }, () => Array(gridCount).fill('navy'))
    );

    const checkTheHit = (row: number, col: number) => {
        //const newGrid = [...grid]; // Shallow copy. This copyis only one level deep. If the original array contains objects, only references to those objects are copied.
        const newGrid = grid.map(row => [...row]); // Deep copy. This copy is two levels deep. If the original array contains objects, the objects are also copied.

        const cellName = createCellName(row + 1, col + 1); // +1 because the array index starts from 0.

        if (isTargetHit(cellName) === true) {
            newGrid[row][col] = 'yellow';
            setTimerRunning(false);
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
                        <div className='cellStyle'
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

