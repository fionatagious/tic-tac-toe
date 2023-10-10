import "./App.css";
import React, { useState } from "react";

function App() {
  function checkSubset(parentArray, subsetArray) {
    return subsetArray.every((el) => {
      return parentArray.includes(el);
    });
  }

  const [numbersA, setNumbersA] = useState([]);
  const [numbersB, setNumbersB] = useState([]);
  const [turnsLeft, setTurnsLeft] = useState(8);
  const [marker, setMarker] = useState("X");
  const [playerA, setPlayerA] = useState(true);

  function updatePlayerSquares(squareId) {
    function setNumbersA(numbersA) {
      numbersA.push(...squareIdArray);
    }
    function setNumbersB(numbersB) {
      numbersB.push(...squareIdArray);
    }
    const squareIdArray = [squareId];

    if (playerA) {
      setNumbersA(numbersA);
    } else {
      setNumbersB(numbersB);
    }
    const integersArrayA = numbersA.map((str) => {
      return parseInt(str);
    });
    const integersArrayB = numbersB.map((str) => {
      return parseInt(str);
    });
    return [integersArrayA, integersArrayB];
  }

  function checkForWinner(a, b) {
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

    winConditions.map((conditionArray) => {
      return checkSubset(a, conditionArray);
    });
    winConditions.map((conditionArray) => {
      return checkSubset(b, conditionArray);
    });
  }

  const handleClick = (e) => {
    setMarker(marker === "X" ? "O" : "X");
    e.currentTarget.innerHTML = marker;

    // update player squares
    const [aSquares, bSquares] = updatePlayerSquares(e.currentTarget.id);
    console.log("scores", [aSquares, bSquares]);

    // check for win condition
    if (checkForWinner(aSquares, bSquares)) {
      console.log("win condition met");
    } else {
      console.log("no win");
    }

    // switch players and subtract 1 turn
    setPlayerA(!playerA);
    setTurnsLeft(turnsLeft - 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>Tic Tac Toe!</p>
        <div className="game-board">
          <div id="0" className="square" onClick={handleClick}></div>
          <div id="1" className="square" onClick={handleClick}></div>
          <div id="2" className="square" onClick={handleClick}></div>
          <div id="3" className="square" onClick={handleClick}></div>
          <div id="4" className="square" onClick={handleClick}></div>
          <div id="5" className="square" onClick={handleClick}></div>
          <div id="6" className="square" onClick={handleClick}></div>
          <div id="7" className="square" onClick={handleClick}></div>
          <div id="8" className="square" onClick={handleClick}></div>
        </div>
      </header>
    </div>
  );
}

export default App;
