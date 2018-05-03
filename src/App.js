import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import ws from 'ws';

// const w = new ws('ws://localhost:5000/')

// w.on('message', (msg) => console.log(msg))



// w.on('open', () => w.send(msg))

// var socket = new WebSocket('ws://localhost:5000');          // create new WebSocket
// socket.onmessage = function (msg) {console.log(msg)};       // listen to socket messages
// socket.send('hello world');                                 // send message

const socket = new WebSocket('ws://localhost:5000');

// Connection opened
socket.addEventListener('open', function (event) {
    
    let msg = JSON.stringify({ 
      event: 'subscribe', 
      channel: 'ticker', 
      symbol: 'tBTCUSD' 
    })
    socket.send(msg);
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});



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
