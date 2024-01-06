import React, { useState, useEffect, useRef } from "react";

/*
    Tetris grid
    x = block


*/

function Tetris() {
  const placedBlock = 1;
  const movingBlock = 2;
  const empty = 0;

  const [board, _setBoard] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 0 = empty
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 1 = placed
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0], // 2 = current piece
    [0, 0, 0, 0, 2, 2, 0, 0, 0, 0], // four buffer rows for I piece
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // 20 rows on tetris board
  ]);

  const boardRef = useRef(board);

  const setBoard = (data: number[][]) => {
    boardRef.current = data;
    _setBoard(data);
  };

  // check if a tile can move in specified direction
  const checkCanMove = (dr: number, dc: number, curBoard: number[][]) => {
    let hasBlock = false;
    for (let r = 0; r < curBoard.length; r++) {
      for (let c = 0; c < curBoard[0].length; c++) {
        if (curBoard[r][c] === 2) {
          hasBlock = true;
          if (
            !(
              r + dr < curBoard.length &&
              c + dc < curBoard[0].length &&
              c + dc >= 0 &&
              curBoard[r + dr][c + dc] !== 1
            )
          ) {
            return false;
          }
        }
      }
    }
    return hasBlock;
  };

  const moveBlocks = (dr: number, dc: number, curBoard: number[][]) => {
    let newBoard = curBoard.map((arr) => {
      return arr.map((i) => {
        if (i === 2) {
          return 0;
        }
        return i;
      });
    });

    for (let r = 0; r < curBoard.length; r++) {
      for (let c = 0; c < curBoard[0].length; c++) {
        if (curBoard[r][c] === 2) {
          newBoard[r + dr][c + dc] = 2;
        }
      }
    }
    return newBoard;
  };

  const spawnBlock = (b: number[][]) => {
    let newBoard = b.map((row, r) => {
      return row.map((i, c) => {
        if (r === 3 && c === 4) {
          return movingBlock;
        }
        return i;
      });
    });
    return newBoard;
  };

  const placeBlocks = () => {
    //drop blocks
    let b = boardRef.current;
    while (checkCanMove(1, 0, b)) {
      console.log("loop");
      b = moveBlocks(1, 0, b);
    }
    let newBoard = b.map((arr) => {
      return arr.map((i) => {
        if (i === 2) {
          return 1;
        }
        return i;
      });
    });
    newBoard = spawnBlock(newBoard);
    setBoard(newBoard);
  };

  const tick = () => {
    console.log("tick");
    // check that we can move down
    let canDrop = checkCanMove(1, 0, boardRef.current);
    if (canDrop) {
      let newBoard = moveBlocks(1, 0, boardRef.current);
      setBoard(newBoard);
    } else {
      placeBlocks();
    }
    setTimeout(tick, 500);
  };

  const startGame = () => {
    const intervalID = setTimeout(tick, 500);
  };

  const moveWithKey = (dr: number, dc: number) => {
    let canMove = checkCanMove(dr, dc, board);
    if (canMove) {
      let newBoard = moveBlocks(dr, dc, board);
      setBoard(newBoard);
    }
  };

  const keyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        break;
      case "ArrowDown":
        moveWithKey(1, 0);
        break;
      case "ArrowLeft":
        moveWithKey(0, -1);
        break;
      case "ArrowRight":
        moveWithKey(0, 1);
        break;
      case " ":
        console.log("drop");
        placeBlocks();
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", keyPress);
    return () => {
      window.removeEventListener("keydown", keyPress);
    };
  });

  const [currentPiece, setCurrentPiece] = useState<number>(0);

  const getColor = (value: number, row: number, col: number) => {
    if (value === 0) {
      return (row + col) % 2 === 0 ? "bg-gray-800" : "";
    }
    if (value === 2) {
      return "bg-blue-400";
    }
    return "bg-orange-400";
  };

  return (
    <div className="w-full h-full flex flex-row text-white font-mono p-4">
      <div className="flex flex-col">
        {board.map((row, ri) => {
          if (ri > 3)
            return (
              <div className="flex flex-row">
                {row.map((tile, ci) => {
                  return (
                    <div className={`w-3 h-3  ${getColor(tile, ri, ci)}`}></div>
                  );
                })}
              </div>
            );
        })}
      </div>
      <div className="px-4 text-sm text-gray-200 space-y-2">
        <div>00000000</div>
        <div
          onClick={startGame}
          className="border border-gray-400 px-1 hover:cursor-pointer"
        >
          Press Start
        </div>
      </div>
    </div>
  );
}

export default Tetris;
