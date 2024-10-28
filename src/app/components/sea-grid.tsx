
import { useState } from 'react';
import { createCellName } from '../helpers/coordination';
import { cellStyle, gridStyle, seaGridStyle } from './sea-grid-styles';
import './sea-grid-styles.css';

import { incrementClickCount, setGameIsRunning } from '../../store/gameStatusSlice';
import { useAppSelector } from '@/store/store';
import { useDispatch } from 'react-redux';

type seaGridProps = {
    gridCount: number;
    isTargetHit: (coord: string) => boolean;
}

export default function SeaGrid({ gridCount, isTargetHit }: seaGridProps) {

    const dispatch = useDispatch();
    const isGameRunning = useAppSelector((state) => state.gameStatus.gameIsRunning);

    const [grid, setGrid] = useState<string[][]>(
        Array.from({ length: gridCount }, () => Array(gridCount).fill('navy'))
    );

    const checkTheHit = (row: number, col: number) => {
        //const newGrid = [...grid]; // Shallow copy. This copyis only one level deep. If the original array contains objects, only references to those objects are copied.
        const newGrid = grid.map(row => [...row]); // Deep copy. This copy is two levels deep. If the original array contains objects, the objects are also copied.

        const cellName = createCellName(row + 1, col + 1); // +1 because the array index starts from 0.

        /**Game is over: Stop reacting mouse click on cells*/
        if (isGameRunning === false) {
            return;
        }

        if (isTargetHit(cellName) === true) {
            newGrid[row][col] = 'yellow';
            dispatch(setGameIsRunning(false));
        }
        else {
            newGrid[row][col] = 'gray';
        }
        setGrid(newGrid);

        dispatch(incrementClickCount());
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

