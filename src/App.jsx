import Die from '../components/Die'
import './App.css'
import { useState, useRef, useEffect } from 'react'
import Confetti from 'react-confetti'
import { nanoid } from 'nanoid'

function App() {
  const [dice, setDice] = useState(() => generateAllNewDice())
  const isGameWon = dice.every((die) => die.isHeld && die.value === dice[0].value)
  const newGameButtonRef = useRef(null)

  useEffect(() => {
    if (isGameWon) {
      newGameButtonRef.current.focus()
    }
  }, [isGameWon])

  function generateAllNewDice() {
    return new Array(10)
            .fill(0)
            .map(() => ({
              id: nanoid(),
              value: Math.ceil(Math.random() * 6),
              isHeld: false
          }))
  }

  function rollDice() {
    if (isGameWon) {
      setDice(generateAllNewDice())

      return
    }

    setDice((oldDice) => oldDice.map((die) => 
      die.isHeld
        ? die
        : { ...die, value: Math.ceil(Math.random() * 6) }
  ))
  }

  function holdDie(id) {
    setDice((oldDice) => (
      oldDice.map((dieObj) => {
        if (dieObj.id === id) {
          return {
            ...dieObj,
            isHeld: !dieObj.isHeld
          }
        }

        return dieObj;
      })
    ))
  }
  
  const dieElements = dice.map((dieObj) => (
      <Die key={dieObj.id} value={dieObj.value} isHeld={dieObj.isHeld} holdDie={() => holdDie(dieObj.id)} />
  ))

  return (
    <>
      <main>
        {isGameWon && <Confetti />}
        <div aria-live="polite" className="sr-only">
          {isGameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
        </div>
        <div className='tenzies-outer-container'>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className='die-container'>
            {dieElements}
          </div>

          <button className='roll-button' onClick={rollDice} ref={newGameButtonRef}>{isGameWon ? 'New Game' : 'Roll'}</button>
        </div>
      </main>
    </>
  )
}

export default App
