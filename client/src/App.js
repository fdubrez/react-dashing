import React, { Component } from 'react';
import './App.css';
import Dashboard from './components/Dashboard'
import Widget from './components/Widget'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    const source = new EventSource("http://localhost:9090/events/")
    source.onmessage = e => {
      console.log(e.data)
      this.setState({
        data: [
          ...this.state.data,
          e.data
        ]
      })
    }
  }
  render() {
    const items = this.state.data.map((d, index) => <li key={index}>{d}</li>) 
    return (
      <div className="App">
        <Dashboard>
          <Widget title='Un bien beau widget'>
            <h3>1000K</h3>
            </Widget>
          <Widget title='Un bien beau widget'/>
          <Widget title='Un bien beau widget'/>
        </Dashboard>
        <ul>
          {items}
        </ul>
      </div>
    );
  }
}

export default App;
