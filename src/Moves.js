import React from 'react'
import './Game.css'
import PropTypes from 'prop-types'

const Moves = (props) => {
  const moves = props.history.map((step, move) => {
    const desc = move ? `Go to move # ${move}` : 'Go to game start'
    return (
      <li key={move}>
        <button className="game-button" onClick={() => props.jumpTo(move)}>{desc}</button>
      </li>
    )
  })

  return (
    <div>
      {moves}
    </div>
  )
}

Moves.propTypes = {
  jumpTo: PropTypes.func,
  history: PropTypes.array
}

export default Moves