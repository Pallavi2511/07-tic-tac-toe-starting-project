import { useState } from "react";
import GameBoard from "./component/GameBoard";
import Player from "./component/Player";
import Log from "./component/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./component/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [playerName, setPlayerName] = useState({
    X: "Player1",
    O: "Player2",
  });
  const [gameTurns, setGameTurns] = useState([]);
  // const [activePlayer, setActivePlayer] = useState("X");

  const activePlayer = derivedActivePlayer(gameTurns);

  let gameBoard = [...initialGameBoard.map((array) => [...array])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }
  let winner;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareBlock =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareBlock =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareBlock =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareBlock &&
      firstSquareBlock === secondSquareBlock &&
      firstSquareBlock === thirdSquareBlock
    ) {
      winner = playerName[firstSquareBlock];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectBlock(rowIndex, colIndex) {
    // setActivePlayer((currActivePlayer) =>
    //   currActivePlayer === "X" ? "O" : "X"
    // );

    setGameTurns((prevTurns) => {
      // let currentPlayer = "X";
      // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
      //   currentPlayer = "O";
      // }

      const currentPlayer = derivedActivePlayer(prevTurns);

      const updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurn;
    });
  }

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayerName((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectBlock={handleSelectBlock} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
