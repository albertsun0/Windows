import React, { useState, useEffect } from "react";

/*
    Tetris grid
    x = block


*/

function Tetris() {
  const [board, setBoard] = useState<number[][]>([
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

  // check if a tile can move in specified direction
  const checkCanMove = (dr: number, dc: number) => {
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[0].length; c++) {
        if (board[r][c] == 2) {
          if (
            !(
              r + dr < board.length &&
              c + dc < board[0].length &&
              c + dc >= 0 &&
              board[r + dr][c + dc] !== 1
            )
          ) {
            return false;
          }
        }
      }
    }
    return true;
  };

  const moveBlocks = (dr: number, dc: number) => {
    let newBoard = board.map((arr) => {
      return arr.map((i) => {
        if (i === 2) {
          return 0;
        }
        return i;
      });
    });

    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[0].length; c++) {
        if (board[r][c] === 2) {
          newBoard[r + dr][c + dc] = 2;
        }
      }
    }
    return newBoard;
  };

  const placeBlocks = () => {
    //drop blocks until cannot anymore.
    while (checkCanMove(1, 0)) {
      setBoard(moveBlocks(1, 0));
    }
    let newBoard = board.map((arr) => {
      return arr.map((i) => {
        if (i === 2) {
          return 1;
        }
        return i;
      });
    });
    setBoard(newBoard);
  };

  const tick = () => {
    // check that we can move down
    let canDrop = checkCanMove(1, 0);
    if (!canDrop) {
      placeBlocks();
    } else {
      let newBoard = moveBlocks(1, 0);
      setBoard(newBoard);
    }
  };

  const moveWithKey = (dr: number, dc: number) => {
    let canMove = checkCanMove(dr, dc);
    if (canMove) {
      let newBoard = moveBlocks(dr, dc);
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

  const place = () => {};

  const [currentPiece, setCurrentPiece] = useState<number>(0);

  const getColor = (value: number, row: number, col: number) => {
    if (value === 0) {
      return (row + col) % 2 === 0 ? "bg-gray-900" : "bg-black";
    }
    return "bg-orange-400";
  };

  return (
    <div className="bg-black w-full h-full flex flex-row text-white font-mono p-4">
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
      <div className="px-4">
        <button onClick={tick}>tick</button>
      </div>
    </div>
  );
}

export default Tetris;
