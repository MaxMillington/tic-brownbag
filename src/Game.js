import React, { Component } from 'react'
import axios from 'axios'
import Board from './Board'
import Moves from './Moves'
import calculateWinner from './calculateWinner'
import './Game.css'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      doSomethingElse: false
    };
  }

  componentDidMount() {
    console.log('Game did mount')
    this.getWeather()
    setInterval(this.getWeather, 10000)
  }

  getWeather = () => {
    axios.get('http://api.openweathermap.org/data/2.5/forecast?id=5392171&APPID=949819d84cdb88549646b361edff11e9')
      .then((response) => {
        console.log('response', response)
        const tempInFarenheit = (response.data.list[0].main.temp) * (9/5) - 459.67
        const weatherForCity = {
          cityName: response.data.city.name,
          temp: Math.round(tempInFarenheit),
          weather: response.data.list[0].weather[0].description
        }

        this.setState({ weatherForCity: weatherForCity })
      })
      .catch((error) => {
        console.log('darn', error)
      })
  }

  handleClick = (i) => {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo = (step) => {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  doSomethingElse = () => {
    this.setState({ doSomethingElse: !this.state.doSomethingElse})
  }

  render() {
    console.log('Game rendered')
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    let status
    if (winner) {
      status = `Winner: ${winner}`
    } else {
      status = `Next player: ${this.state.xIsNext ? 'X' : 'O'}`
    }

    let weatherMessage
    if (this.state.weatherForCity) {
      const weatherForCity = this.state.weatherForCity
      weatherMessage = `Today's weather in ${weatherForCity.cityName} is ${weatherForCity.weather} and ${weatherForCity.temp} degrees`
    }

    let gameBoard = <Board
      squares={current.squares}
      onClick={(i) => this.handleClick(i)}
      weatherByCity={this.state.weatherForCity}
    />
    if(this.state.doSomethingElse) {
      gameBoard = <div className="something-else-message">You should go play outside and get some fresh air</div>
    }

    return (
      <div className="game">
        <div className="weather-container">
          {weatherMessage}
        </div>
        <div className="game-container">
          <div className="game-board">
            {gameBoard}
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>
              <Moves
                jumpTo={this.jumpTo}
                history={history}
              />
            </ol>
          </div>
        </div>
        <div className="something-else-container">
            <button onClick={this.doSomethingElse}>Do Something Else</button>
        </div>
      </div>
    )
  }
}

export default Game
