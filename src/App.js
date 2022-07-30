import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';

const rowStyle = {
  display: 'flex',
};

const squareStyle = {
  width: '60px',
  height: '60px',
  backgroundColor: '#ddd',
  margin: '4px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  color: 'white',
};
const boardStyle = {
  backgroundColor: '#eee',
  width: '208px',
  alignItems: 'center',
  justifyContent: 'center',
  display: 'flex',
  flexDirection: 'column',
  border: '3px solid #eee',
};

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const instructionsStyle = {
  marginTop: '5px',
  marginBottom: '5px',
  fontWeight: 'bold',
  fontSize: '16px',
};

const buttonStyle = {
  marginTop: '15px',
  marginBottom: '16px',
  width: '80px',
  height: '40px',
  backgroundColor: '#8acaca',
  color: 'white',
  fontSize: '16px',
};

// add props to the Square component: value and onClick
function Square({ value, onClick }) {
  return (
    <div className='square' onClick={onClick} style={squareStyle}>
      {value}
    </div>
  );
}

function Board() {
  // initialize the squares array with 9 null values
  const [squares, setSquares] = useState(Array(9).fill(null));
  // initialize xIsNext to true
  const [xIsNext, setXIsNext] = useState(true);

  // create a function that will handle the click event on the square
  const handleOnClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? 'X' : 'O';
    setSquares([...squares]);
    setXIsNext(!xIsNext);
  };

  // create a function that will handle the reset button
  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  // createa a variable to store the winner
  const winner = calculateWinner(squares);

  let gameStatus;

  // if there is a winner, display the winner
  // if there is no winner, display the next player
  if (winner) gameStatus = winner;

  if (xIsNext) gameStatus = 'X';
  else gameStatus = 'O';

  return (
    <div style={containerStyle} className='gameBoard'>
      <div id='statusArea' className='status' style={instructionsStyle}>
        Next player: <span>{gameStatus}</span>
      </div>
      <div id='winnderArea' className='winner' style={instructionsStyle}>
        Winner: <span>{winner}</span>
      </div>

      <button style={buttonStyle} onClick={handleReset}>
        Reset
      </button>
      <div style={boardStyle}>
        <div className='board-row' style={rowStyle}>
          {/* pass the index of the square to the onClick function */}
          <Square value={squares[0]} onClick={() => handleOnClick(0)} />
          <Square value={squares[1]} onClick={() => handleOnClick(1)} />
          <Square value={squares[2]} onClick={() => handleOnClick(2)} />
        </div>
        <div className='board-row' style={rowStyle}>
          {/* pass the index of the square to the onClick function */}
          <Square value={squares[3]} onClick={() => handleOnClick(3)} />
          <Square value={squares[4]} onClick={() => handleOnClick(4)} />
          <Square value={squares[5]} onClick={() => handleOnClick(5)} />
        </div>
        <div className='board-row' style={rowStyle}>
          {/* pass the index of the square to the onClick function */}
          <Square value={squares[6]} onClick={() => handleOnClick(6)} />
          <Square value={squares[7]} onClick={() => handleOnClick(7)} />
          <Square value={squares[8]} onClick={() => handleOnClick(8)} />
        </div>
      </div>
    </div>
  );
}

// create a function that will calculate the winner
const calculateWinner = (squares) => {
  // create a list of winning combinations
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // loop through the winning combinations
  for (let i = 0; i < winningCombinations.length; i++) {
    // create a variable to store the winning combination
    const [a, b, c] = winningCombinations[i];
    // if the squares at the index of the winning combination are the same, return the winner
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // if there is no winner, return null
  return null;
};

function App() {
  return (
    <div className='game'>
      <div className='game-board'>
        <Board />
      </div>
    </div>
  );
}

export default App;
