import React, { Component } from 'react'
import Square from './Square'
import PropTypes from 'prop-types'
import './Game.css'

class Board extends Component {
  constructor(props) {
    super(props)
    this.interval = null
    this.state = { status: '' }
  }

  renderSquare = (i) => {
    return (
      <Square
        index={i}
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  componentDidMount() {
    console.log('Board did mount')
  }

  componentWillMount() {
    console.log('Board will mount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('Board receiving new props')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Board is wondering if it should update')
    return true
  }

  componentWillUnmount() {
    console.log('Board about to unmount')
  }

  render() {
    console.log('Board rendered')
    return (
      <div>
        <div className="status-message">{this.state.status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    )
  }
}


Board.propTypes = {
  squares: PropTypes.array,
  onClick: PropTypes.func,
  weatherByCity: PropTypes.object
}

export default Board