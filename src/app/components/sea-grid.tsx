
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

        if (isTargetHit(cellName) === true) {
            newGrid[row][col] = 'yellow';
            showAllShips();
            dispatch(setGameIsRunning(false));
            return;
        }
        else {
            newGrid[row][col] = 'rgb(65, 91, 221)';
        }
        setGrid(newGrid);

        dispatch(incrementClickCount());
    };

    const showAllShips = () => {
        const newGrid = grid.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                const cellName = createCellName(rowIndex + 1, colIndex + 1);
                return isTargetHit(cellName) ? 'yellow' : cell;
            })
        );
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
                            onClick={() => isGameRunning ? checkTheHit(rowIndex, colIndex) : null} // If the game is not running, do not allow the user to click.
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

