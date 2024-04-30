import React, { useState, useEffect } from "react";

const squareStyle = {
  width: "60px",
  height: "60px",
  backgroundColor: "#ddd",
  margin: "4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "20px",
  color: "black",
};

const boardStyle = {
  backgroundColor: "#eee",
  width: "240px",
  alignItems: "center",
  justifyContent: "center",
  display: "flex",
  flexWrap: "wrap",
  border: "3px #eee solid",
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
};

const instructionsStyle = {
  marginTop: "5px",
  marginBottom: "5px",
  fontWeight: "bold",
  fontSize: "16px",
};

const buttonStyle = {
  marginBottom: "16px",
  width: "80px",
  height: "40px",
  backgroundColor: "#8acaca",
  color: "white",
  fontSize: "16px",
};

const Square = ({ playerMark, squareId, handleSquareClick }) => {
  return (
    <div
      className="square"
      style={squareStyle}
      onClick={() => handleSquareClick(squareId)}
    >
      {playerMark}
    </div>
  );
};

const Board = ({
  board,
  isXnext,
  winner,
  gameOver,
  handleSquareClick,
  handleReset,
}) => {
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>
        <span>
          {!gameOver && !winner ? "Next Player: " + (isXnext ? "X" : "O") : ""}
        </span>
      </div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>
        <span>
          {gameOver && !winner
            ? "Game Over"
            : winner
              ? "Winner: " + winner
              : ""}
        </span>
      </div>
      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>
      <div style={boardStyle}>
        {board.map((playerMark, idx) => (
          <Square
            key={idx}
            squareId={idx}
            playerMark={playerMark}
            handleSquareClick={handleSquareClick}
          />
        ))}
      </div>
    </div>
  );
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boardSize = 9;

const App = () => {
  let initialState = {
    board: Array(boardSize).fill(null),
    isXnext: true,
    gameOver: false,
    winner: null,
  };

  const [board, setBoard] = useState(initialState.board);
  const [isXnext, setIsXnext] = useState(initialState.isXnext);
  const [isGameOver, setIsGameOver] = useState(initialState.isGameOver);
  const [winner, setWinner] = useState(initialState.winner);

  const getWinner = () => {
    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  useEffect(() => {
      // check for winner
      let winner = getWinner();
      if (winner) {
        console.log('Winner is:', winner);
        setIsGameOver(() => true);

        // update board with winner
        setWinner(() => winner);
      }
  }, [ board, setWinner]);

  const squareClicked = (squareID) => {
      // check if the square is already filled or game is over
      if (board[squareID] || isGameOver){
        return;
      }

      // update the board
      setBoard((prevBoard) => {
        let newBoard = [...prevBoard];
        // Atlernate who had a turn
        newBoard[squareID] = isXnext ? 'X': 'O';
        return newBoard;
      });
      setIsXnext((prevIsXnext) => !prevIsXnext);
  };

  const resetGame = () => {
      // Reset all control states
      setBoard(() =>{
        return Array(boardSize).fill(null);
      } );
      setWinner(() => null);
      setIsGameOver(() => false);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board
          board={board}
          isXnext={isXnext}
          winner={winner}
          gameOver={isGameOver}
          handleSquareClick={squareClicked}
          handleReset={resetGame}
        />
      </div>
    </div>
  );
};

export default App;
