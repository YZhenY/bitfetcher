import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import socketActions from './actions/socketActions.js';
import TickerBox from './components/tickerBox.js';
import TradeBox from './components/tradeBox.js';

import './App.css';
import 'semantic-ui-css/semantic.min.css';



class App extends Component {
  constructor(props) {
    super();

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">BitFetcher</h1>
          <h2 className="App-sub-title">Your data in just a bit!</h2>
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

