import "./App.css";
import "./index.css";
import React, { useState } from "react";

function checkSubset(parentArray, subsetArray) {
  return subsetArray.every((el) => {
    return parentArray.includes(el);
  });
}

function App() {
  const [squaresX, setNumbersX] = useState([]);
  const [numbersO, setNumbersO] = useState([]);
  const [winner, setWinner] = useState(null);
  const [turnsRemaining, setTurnsRemaining] = useState(8);
  const [marker, setMarker] = useState("X");
  const [playerX, setPlayerX] = useState(true);

  function updatePlayerSquares(squareId, playerX) {
    function setNumbersX(nArray, id) {
      nArray.push(...id);
    }
    function setNumbersO(nArray, id) {
      nArray.push(...id);
    }

    if (playerX) {
      setNumbersX(squaresX, [squareId]);
    } else {
      setNumbersO(numbersO, [squareId]);
    }
    return [squaresX, numbersO];
  }

  function checkForWinner(squaresArray) {
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

  function handleTurn(e) {
    setMarker(marker === "X" ? "O" : "X");
    e.currentTarget.innerHTML = marker;
    const currentPlayer = playerX ? "X" : "O";

    // add square ID of clicked square to player's array
    const [xSquares, oSquares] = updatePlayerSquares(
      parseInt(e.currentTarget.id),
      playerX
    );

    // check for win condition
    const currentSquaresArray = playerX ? xSquares : oSquares;
    if (checkForWinner(currentSquaresArray)) {
      setWinner(currentPlayer);
      document
        .querySelectorAll("button")
        .forEach((button) => (button.disabled = true));
    } else {
      setWinner(null);
    }

    // switch players and subtract 1 turn
    setPlayerX(!playerX);
    setTurnsRemaining(turnsRemaining - 1);
    e.currentTarget.disabled = true;
  }

  function resetBoard() {
    setNumbersX([]);
    setNumbersO([]);
    setWinner(null);
    setTurnsRemaining(8);
    setMarker("X");
    setPlayerX(true);
    document.querySelectorAll("button").forEach((button) => {
      button.disabled = false;
      button.innerHTML = "";
    });
  }

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
          <>
            <div className="winner-text">The winner is {winner}!</div>
            <div className="play-again" onClick={resetBoard}>
              Click to play again
            </div>
          </>
        ) : null}
      </header>
    </div>
  );
}

export default App;
