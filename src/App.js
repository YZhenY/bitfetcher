import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BFX from 'bitfinex-api-node';

const bfx = new BFX({
  ws: {
    autoReconnect: false,
    seqAudit: true,
    packetWDDelay: 10 * 1000
  }
})

var ws = bfx.ws();

ws.on('error', (err) => console.log(err))
ws.on('open', () => {
  ws.onTrade({ pair: 'BTCUSD' }, (trade) => {
    if (Array.isArray(trade[0])) {
      console.log(`recv snapshot of ${trade.length} trades`)
    } else {
      console.log(`trade: ${JSON.stringify(trade)}`)
    }
  })
})

ws.open()


class App extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <button onClick={this.handleClick} >Link to socket</button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
