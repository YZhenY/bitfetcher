import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import socketActions from './actions/socketActions.js';
import TickerBox from './components/tickerBox.js';
import TradeBox from './components/tradeBox.js';

import {Dropdown, Button} from 'semantic-ui-react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';



class App extends Component {
  constructor(props) {
    super();
    //for dropdown
    var symbolList = ["btcusd","ltcusd","ltcbtc","ethusd","ethbtc","etcbtc","etcusd","rrtusd","rrtbtc","zecusd","zecbtc","xmrusd","xmrbtc","dshusd","dshbtc","btceur","btcjpy","xrpusd","xrpbtc","iotusd","iotbtc","ioteth","eosusd","eosbtc","eoseth","sanusd","sanbtc","saneth","omgusd","omgbtc","omgeth","bchusd","bchbtc","bcheth","neousd","neobtc","neoeth","etpusd","etpbtc","etpeth","qtmusd","qtmbtc","qtmeth","avtusd","avtbtc","avteth","edousd","edobtc","edoeth","btgusd","btgbtc","datusd","datbtc","dateth","qshusd","qshbtc","qsheth","yywusd","yywbtc","yyweth","gntusd","gntbtc","gnteth","sntusd","sntbtc","snteth","ioteur","batusd","batbtc","bateth","mnausd","mnabtc","mnaeth","funusd","funbtc","funeth","zrxusd","zrxbtc","zrxeth","tnbusd","tnbbtc","tnbeth","spkusd","spkbtc","spketh","trxusd","trxbtc","trxeth","rcnusd","rcnbtc","rcneth","rlcusd","rlcbtc","rlceth","aidusd","aidbtc","aideth","sngusd","sngbtc","sngeth","repusd","repbtc","repeth","elfusd","elfbtc","elfeth","btcgbp","etheur","ethjpy","ethgbp","neoeur","neojpy","neogbp","eoseur","eosjpy","eosgbp","iotjpy","iotgbp","iosusd","iosbtc","ioseth","aiousd","aiobtc","aioeth","requsd","reqbtc","reqeth","rdnusd","rdnbtc","rdneth","lrcusd","lrcbtc","lrceth","waxusd","waxbtc","waxeth","daiusd","daibtc","daieth","cfiusd","cfibtc","cfieth","agiusd","agibtc","agieth","bftusd","bftbtc","bfteth","mtnusd","mtnbtc","mtneth","odeusd","odebtc","odeeth","antusd","antbtc","anteth","dthusd","dthbtc","dtheth","mitusd","mitbtc","miteth","stjusd","stjbtc","stjeth","xlmusd","xlmeur","xlmjpy","xlmgbp","xlmbtc","xlmeth","xvgusd","xvgeur","xvgjpy","xvggbp","xvgbtc","xvgeth","bciusd","bcibtc"];
    var symbolSelection = [];
    symbolList.map(symbol => {
      symbolSelection.push({key:symbol.toUpperCase(), value:symbol.toUpperCase(), text: symbol.toUpperCase()})
    })
    this.symbolSelection = symbolSelection;

    this.disconnectWS = this.disconnectWS.bind(this);
    this.addSymbol = this.addSymbol.bind(this);
    
  }

  disconnectWS() {
    this.props.socketActions.socketClose();
  }

  addSymbol(e) {
    
    this.props.socketActions.socketSend({subscribeData: [{
      event: 'subscribe', 
      channel: 'ticker', 
      symbol: `t${e.target.children[0]['textContent']}` 
    }]})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">BitFetcher</h1>
          <h2 className="App-sub-title">Your data in just a bit!</h2>
          <span className="App-section">
            <Button onClick={this.disconnectWS}>Disconnect WebSocket</Button>
            <Dropdown placeholder='Select Pair' fluid search selection options={this.symbolSelection} onChange={this.addSymbol} />
          </span>
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

