import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/square.jsx"
import {TURNS} from "./constants.js"
import {checkWinner} from "./logic/board.js"


function App() {

  const [board, setBoard] = useState(
    Array(9).fill(null)
  )
  
  const [turn, setTurn] = useState(TURNS.X)
  // null no hay ganado, false es un empate
  const [winner, setWinner] = useState(null) 

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  const checkEndGame = (newBoard) => {
    // revisa el array del tablero y si todos los campos son distintos a null y no hubo ganador significa que hubo empate
    return newBoard.every((square) => square !== null)
  }

  const updateBoard = (index) => {
    if (board[index] || winner) return
    // actualizamos el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    // se cambia el turno entre X u O
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    // revisar si hay ganador 
    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <>  
    <main className="board">
      <h1>tic tac toe</h1>
      <button onClick={resetGame}>Reiniciar el Juego</button>
      <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
              >
              {board[index]}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected ={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected ={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

          {
          winner !== null && (
            <section className="winner">
              <div className="text">
                <h2>
                  {
                  winner === false
                  ? "Empate:"
                  : "Gano:"
                  }

                </h2>
                  <header className="win">
                    {winner && <Square>{winner}</Square>}
                  </header>
                  <footer>
                    <button onClick={resetGame}>Empezar de nuevo</button>
                  </footer>
              </div>
            </section>
          )
        }
      </main>
    </>
  )
}

export default App
