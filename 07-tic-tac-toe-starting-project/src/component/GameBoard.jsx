export default function GameBoard({ onSelectBlock, board }) {
  // const [gameBoard, setGameBoard] = useState(initialGameBoard);

  // function handleSelectBlock(rowIndex, colIndex) {
  //   // if (gameBoard[rowIndex][colIndex] === null)
  //     setGameBoard((prevGameBoard) => {
  //       const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
  //       updatedBoard[rowIndex][colIndex] = activePlayer;
  //       return updatedBoard;
  //     });
  //     onSelectBlock();

  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  onClick={() => onSelectBlock(rowIndex, colIndex)}
                  disabled={playerSymbol !== null}
                >
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
