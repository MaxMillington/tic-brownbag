import React from 'react'
import './Game.css'
import PropTypes from 'prop-types'

const Square = (props) => {
  return (
    <button className="square" onClick={() => props.onClick(props.index)}>
      {props.value}
    </button>
  )
}

Square.propTypes = {
  onClick: PropTypes.func,
  value: PropTypes.string,
  index: PropTypes.number
}

export default Square