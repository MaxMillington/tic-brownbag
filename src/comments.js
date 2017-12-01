// api.openweathermap.org/data/2.5/weather?id=5392171


// San Jose 5392171
// LALA Land 5368361
// Boston 4317656





// componentDidMount() {
//   console.log('Game did mount')
//   this.getWeather()
//   setInterval(this.getWeather, 10000)
// }



// componentDidMount() {
//   console.log('Board did mount')
//   this.interval = setInterval(() => { console.log('party') }, 1000)
// }
//
// componentWillMount() {
//   console.log('Board will mount')
// }

// componentWillReceiveProps(nextProps) {
//   console.log('Board receiving new props')
//
//   if(nextProps.weatherByCity) {
//     const status = nextProps.weatherByCity.temp > 70 ? `It's warm yo` : 'Brrr it be cold'
//     this.setState({ status })
//   }
// }


// shouldComponentUpdate(nextProps, nextState) {
//   console.log('Board is wondering if it should update')
//   if(this.state.status === nextState.status) {
//     console.log('these states are the same')
//     return false
//   }
//   return true
// }

// componentWillUnmount() {
//   console.log('Board about to unmount')
//   clearInterval(this.interval)
// }