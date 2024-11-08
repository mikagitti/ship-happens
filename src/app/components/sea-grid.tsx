
import { useState } from 'react';
import './sea-grid-styles.css';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/store';
import { incrementClickCount, setGameIsRunning } from '../../store/gameStatusSlice';

import { createCellName } from '../helpers/coordination';

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
            markAllHits();
            dispatch(setGameIsRunning(false));
        }
        else {
            newGrid[row][col] = 'rgb(65, 91, 221)';
        }
        setGrid(newGrid);

        dispatch(incrementClickCount());
    };

    const markAllHits = () => {
        const newGrid = grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                const cellName = createCellName(rowIndex + 1, colIndex + 1);
                console.log(cellName);
                return isTargetHit(cellName) ? 'yellow' : cell;
            })
        );
        console.log(newGrid);
        setGrid(newGrid);
    };

    return (

        <div className='seaGridSpace'>
            <div className='container'
                style={{
                    gridTemplateColumns: `repeat(${gridCount}, 1fr)`,
                }}>
                {grid.map((row, rowIndex) =>
                    row.map((backgroundColor, colIndex) => (
                        <div className='cellStyle'
                            key={`${rowIndex}-${colIndex}`}
                            onClick={() => checkTheHit(rowIndex, colIndex)}
                            style={{
                                backgroundColor: backgroundColor,
                            }}
                        >
                            {createCellName(rowIndex + 1, colIndex + 1)}

                        </div>

                    ))
                )}
            </div>
        </div >
    );
};

