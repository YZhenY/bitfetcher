import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import socketActions from './actions/socketActions.js';

// const socket = new WebSocket('ws://localhost:5000');
// // Connection opened
// socket.addEventListener('open', function (event) { 
    // let msg = JSON.stringify({ 
    //   event: 'subscribe', 
    //   channel: 'ticker', 
    //   symbol: 'tBTCUSD' 
    // })
//     socket.send(msg);
// });

// // Listen for messages
// socket.addEventListener('message', function (event) {
//     console.log('Message from server ', event.data);
// });



class App extends Component {
  constructor(props) {
    super();

  }
  
  componentWillMount() { // HERE WE ARE INITALIZING THE SOCKET
    this.props.socketActions.socketConnect();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.ticker}</h1>
        </header>
        <button onClick={this.handleClick} >Link to socket</button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ticker: state.ticker
  };
}
function mapDispatchToProps(dispatch) {
  return {
    socketActions: bindActionCreators(socketActions, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

