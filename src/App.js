import { useState } from "react";

const generateBoard = (size) => {
  const newBoard = [];
  for (let i = 0; i < size; i++) {
    newBoard.push([...Array(size)]);
  }
  return newBoard;
};

export default function App() {
  const [board, setBoard] = useState(generateBoard(3));
  const [currPlayer, setCurrPlayer] = useState("x");

  const handleClick = (row, col) => {
    board[row][col] = currPlayer;
    setBoard([...board]);
    // continue here
    setCurrPlayer(currPlayer === "x" ? "o" : "x");
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
                    border: "solid white 1px",
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
