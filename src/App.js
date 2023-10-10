import "./App.css";
import "./index.css";
import React, { useState } from "react";

function App() {
  const [squaresX, setNumbersX] = useState([]);
  const [numbersO, setNumbersO] = useState([]);
  const [winner, setWinner] = useState(null);
  const [turnsRemaining, setTurnsRemaining] = useState(8);
  const [marker, setMarker] = useState("X");
  const [playerX, setPlayerX] = useState(true);

  function updatePlayerSquares(squareId, player) {
    function addSquareId(n, id) {
      n.push(...id);
    }
    function setNumbersX(n, id) {
      return addSquareId(n, id);
    }
    function setNumbersO(n, id) {
      return addSquareId(n, id);
    }

    const squareIdArray = [squareId];
    if (player) {
      setNumbersX(squaresX, squareIdArray);
      squaresX.map((str) => {
        return parseInt(str);
      });
    } else {
      setNumbersO(numbersO, squareIdArray);
      numbersO.map((str) => {
        return parseInt(str);
      });
    }
    return [squaresX, numbersO];
  }

  function checkForWinner(squaresArray) {
    function checkSubset(parentArray, subsetArray) {
      return subsetArray.every((el) => {
        return parentArray.includes(el);
      });
    }

    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const isThereAWinner = winConditions.map((conditionArray) => {
      return checkSubset(squaresArray, conditionArray);
    });
    return isThereAWinner.includes(true);
  }

  const handleTurn = (e) => {
    setMarker(marker === "X" ? "O" : "X");
    e.currentTarget.innerHTML = marker;
    const currentPlayer = playerX ? "X" : "O";

    // add square ID of clicked square to player's array
    const idInteger = parseInt(e.currentTarget.id);
    const [aSquares, bSquares] = updatePlayerSquares(idInteger, playerX);

    // check for win condition
    const currentSquaresArray = playerX ? aSquares : bSquares;
    if (checkForWinner(currentSquaresArray)) {
      setWinner(currentPlayer);
    } else {
      setWinner(null);
    }

    // switch players and subtract 1 turn
    setPlayerX(!playerX);
    setTurnsRemaining(turnsRemaining - 1);
    e.currentTarget.disabled = true;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h4>Tic Tac Toe</h4>
        <div className="game-board">
          <button id="0" onClick={handleTurn} disabled={false}></button>
          <button id="1" onClick={handleTurn} disabled={false}></button>
          <button id="2" onClick={handleTurn} disabled={false}></button>
          <button id="3" onClick={handleTurn} disabled={false}></button>
          <button id="4" onClick={handleTurn} disabled={false}></button>
          <button id="5" onClick={handleTurn} disabled={false}></button>
          <button id="6" onClick={handleTurn} disabled={false}></button>
          <button id="7" onClick={handleTurn} disabled={false}></button>
          <button id="8" onClick={handleTurn} disabled={false}></button>
        </div>
        {winner ? (
          <div style={{ margin: 0 }}>The winner is {winner}!</div>
        ) : null}
      </header>
    </div>
  );
}

export default App;
