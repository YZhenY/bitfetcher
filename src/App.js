import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import socketActions from './actions/socketActions.js';
import TickerBox from './components/tickerBox.js';
import TradeBox from './components/tradeBox.js';

import './App.css';
import 'semantic-ui-css/semantic.min.css';

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
    // this.props.socketActions.socketConnect();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Flipchart magic</h1>
        </header>
        <TickerBox />
        <TradeBox />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    ticker: state.tickers
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

