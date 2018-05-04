import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import socketActions from '../actions/socketActions.js';

import { Segment } from 'semantic-ui-react';

const mySubscribeData = [{ 
  event: 'subscribe', 
  channel: 'ticker', 
  symbol: 'tBTCUSD' 
},{ 
  event: 'subscribe', 
  channel: 'ticker', 
  symbol: 'tETHUSD' 
}]

class TickerBox extends Component {
  constructor(props) {
    super();

  }
  
  componentWillMount() { // HERE WE ARE INITALIZING THE SOCKET
    this.props.socketActions.socketConnect({subscribeData:mySubscribeData});
  }

  render() {
    return (
      <div className="TickerBox">
          <Segment className="TickerBox-item">{JSON.stringify(this.props.ticker)}</Segment>
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
)(TickerBox);

