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
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  componentDidMount() {
    console.log('Board did mount')
    this.interval = setInterval(() => { console.log('party') }, 1000)
  }

  componentWillMount() {
    console.log('Board will mount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('Board receiving new props')

    if(nextProps.weatherByCity) {
      const status = nextProps.weatherByCity.temp > 70 ? `It's warm yo` : 'Brrr it be cold'
      this.setState({ status })
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('Board is wondering if it should update')
    if(this.state.status === nextState.status) {
      console.log('these states are the same')
      return false
    }
    return true
  }

  componentWillUnmount() {
    console.log('Board about to unmount')
    clearInterval(this.interval)
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