// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'

import {useLocalStorageState} from '../utils'

const initSquares = Array(9).fill(null)

function Board({onClick, currentSquares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {currentSquares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState('history', () =>[initSquares])
  const [currentStep, setCurrentStep] = useLocalStorageState('step', 0)

  const currentSquares = history[currentStep]
  const nextValue = calculateNextValue(currentSquares)
  const winner = calculateWinner(currentSquares)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    console.log(square)
    console.log(currentSquares)
    if (currentSquares[square] || winner) {
      return
    }
    const newHistory = history.slice(0, currentStep + 1)
    const squaresCopy = [...currentSquares]
    squaresCopy[square] = nextValue
    setHistory([...newHistory, squaresCopy])
    setCurrentStep(currentStep + 1)
  }

  function restart() {
    setHistory([initSquares])
    setCurrentStep(0)
  }

  const moves = history.map((_, step) => {
    return (
      <li>
        <button
          key={step}
          className="history-button"
          disabled={step === currentStep}
          onClick={() => setCurrentStep(step)}
        >
          {(step === 0 ? 'Go to game start' : `Go to move #${step}`) +
            (step === currentStep ? ' (Current)' : '')}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} currentSquares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
        <button
          className="back"
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          back
        </button>
        <button
          className="forward"
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep === history.length - 1}
        >
          forward
        </button>
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
