import React, { Component } from 'react'
import Square from './Square'
import PropTypes from 'prop-types'
import './Game.css'

class Board extends Component {
  constructor(props) {
    super(props)
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

  componentWillMount() {
    console.log('will mount')
  }

  componentWillReceiveProps(nextProps) {
    console.log('receiving new props')

    if(nextProps.weatherByCity) {
      const status = nextProps.weatherByCity.temp > 70 ? `It's warm yo` : 'Brrr it be cold'
      this.setState({ status })
    }
  }

  render() {
    console.log('rendering')
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