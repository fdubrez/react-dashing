import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard'
import NumberWidget from './components/NumberWidget'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {}
    }
    this.onReceiveEvent = this.onReceiveEvent.bind(this)
  }
  onReceiveEvent (e) {
    console.log("Receive ", e.data)
    const json = JSON.parse(e.data)
    let last
    if (this.state.data.hasOwnProperty(json.id) && this.state.data.current) {
      last = this.state.data.current
    }
    let data = {
      ...this.state.data
    }

    data[json.id] = {
      current: json.current,
      last
    }
    this.setState({
      data
    })  
  }
  componentDidMount() {
    const source = new EventSource("http://localhost:9090/events/")
    source.onmessage = e => {
      this.onReceiveEvent(e)
    }
  }
  render() {
    return (
      <div className="App">
        <Dashboard>
          <NumberWidget title='Vélos disponibles' data={this.state.data} id='bicycle-availables-champslibres' moreInfo="Station champs libres"/>
        </Dashboard>
      </div>
    );
  }
}

export default App;
