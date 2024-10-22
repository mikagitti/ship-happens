enum ShipDirectionEnum {
     up = 1,
     down = 2,
     left = 3,
     right = 4,
}

export function getShipOnMap(
     squareCount: number = 5,
     shipLength: number = 3
): string[] {
     const direction = Math.floor(Math.random() * 4) + 1;
     const startX = Math.floor(Math.random() * squareCount) + 1;
     const startY = Math.floor(Math.random() * squareCount) + 1;

     let coordinates: { x: number; y: number }[] = [];

     switch (direction) {
          case ShipDirectionEnum.right:
               if (startX + shipLength - 1 <= squareCount) {
                    for (let i = 0; i < shipLength; i++) {
                         coordinates.push({ x: startX + i, y: startY });
                    }
               } else {
                    for (let i = 0; i < shipLength; i++) {
                         coordinates.push({ x: squareCount - i, y: startY });
                    }
               }
               break;
          case ShipDirectionEnum.left:
               if (startX - shipLength >= 0) {
                    for (let i = 0; i < shipLength; i++) {
                         coordinates.push({ x: startX - i, y: startY });
                    }
               } else {
                    for (let i = 0; i < shipLength; i++) {
                         coordinates.push({ x: i + 1, y: startY });
                    }
               }
               break;
          case ShipDirectionEnum.down:
               if (startY + shipLength - 1 <= squareCount) {
                    for (let i = 0; i < shipLength; i++) {
                         coordinates.push({ x: startX, y: startY + i });
                    }
               } else {
                    for (let i = 0; i < shipLength; i++) {
                         coordinates.push({ x: startX, y: squareCount - i });
                    }
               }
               break;
          case ShipDirectionEnum.up:
               if (startY - shipLength >= 0) {
                    for (let i = 0; i < shipLength; i++) {
                         coordinates.push({ x: startX, y: startY - i });
                    }
               } else {
                    for (let i = 0; i < shipLength; i++) {
                         coordinates.push({ x: startX, y: i + 1 });
                    }
               }
               break;
     }

     const gridCoordinations: string[] = [];
     gridCoordinations.push(
          ...coordinates.map((coord) => createCellName(coord.x, coord.y))
     );

     return gridCoordinations;
}

function getRowLetter(x: number) {
     const row: string = String.fromCharCode(64 + x);
     return { row };
}

/**Compine X and Y coordinates and makes name like D3 */
export function createCellName(xCoord: number, yCoord: number) {
     const { row }: { row: string } = getRowLetter(xCoord);
     return `${row}${yCoord}`;
}
