import { useState } from "react";

const generateBoard = (size) => {
  const newBoard = [];
  for (let i = 0; i < size; i++) {
    newBoard.push([...Array(size)]);
  }
  return newBoard;
};

const rotatedMatrix = (board) => {
  const rotated = [];
  let col = 0;
  while (col < board.length) {
    const newRow = [];
    for (let row = 0; row < board.length; row++) {
      newRow.push(board[row][col]);
    }
    rotated.push(newRow);
    col++;
  }
  return rotated;
};

/*

00 01 02
10 11 12
20 21 22

*/

const diagonalToRow = (board) => {
  const newRows = [[], []];
  let ptr1 = 0;
  let ptr2 = board.length - 1;
  while (ptr1 < board.length) {
    newRows[0].push(board[ptr1][ptr1]);
    newRows[1].push(board[ptr1][ptr2]);
    ptr1++;
    ptr2--;
  }
  return newRows;
};

const checkRow = (board) => {
  for (let row of board) {
    const rowSet = new Set(row);
    if (rowSet.size === 1 && !rowSet.has(undefined)) {
      return true;
    }
  }
  return false;
};

const checkWinner = (board) => {
  if (checkRow(board)) {
    return true;
  }

  if (checkRow(rotatedMatrix(board))) {
    return true;
  }

  if (checkRow(diagonalToRow(board))) {
    return true;
  }

  return false;
};

export default function App() {
  const [board, setBoard] = useState(generateBoard(3));
  const [currPlayer, setCurrPlayer] = useState("x");

  const handleClick = (row, col) => {
    board[row][col] = currPlayer;
    setBoard([...board]);
    if (checkWinner(board)) {
      console.log(currPlayer + " wins");
      setBoard(generateBoard(3));
      setCurrPlayer("x");
    } else {
      setCurrPlayer(currPlayer === "x" ? "o" : "x");
    }
  };
  return (
    <div>
      {board.map((row, rk) => {
        return (
          <div
            key={rk}
            style={{
              display: "flex",
            }}
          >
            {row.map((col, ck) => {
              return (
                <div
                  key={ck}
                  onClick={() => handleClick(rk, ck)}
                  style={{
                    border: "solid #BC1FE3 1px",
                    height: "50px",
                    width: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {col}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
