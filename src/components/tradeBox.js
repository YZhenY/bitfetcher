import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import socketActions from '../actions/socketActions.js';
import TradeItem from './tradeItem.js';

import { Segment, Item } from 'semantic-ui-react';

const symbolList = ["btcusd","ltcusd","ltcbtc","ethusd","ethbtc","etcbtc","etcusd","rrtusd","rrtbtc","zecusd","zecbtc","xmrusd","xmrbtc","dshusd","dshbtc","btceur","btcjpy","xrpusd","xrpbtc","iotusd","iotbtc","ioteth","eosusd","eosbtc","eoseth","sanusd","sanbtc","saneth","omgusd","omgbtc","omgeth","bchusd","bchbtc","bcheth","neousd","neobtc","neoeth","etpusd","etpbtc","etpeth","qtmusd","qtmbtc","qtmeth","avtusd","avtbtc","avteth","edousd","edobtc","edoeth","btgusd","btgbtc","datusd","datbtc","dateth","qshusd","qshbtc","qsheth","yywusd","yywbtc","yyweth","gntusd","gntbtc","gnteth","sntusd","sntbtc","snteth","ioteur","batusd","batbtc","bateth","mnausd","mnabtc","mnaeth","funusd","funbtc","funeth","zrxusd","zrxbtc","zrxeth","tnbusd","tnbbtc","tnbeth","spkusd","spkbtc","spketh","trxusd","trxbtc","trxeth","rcnusd","rcnbtc","rcneth","rlcusd","rlcbtc","rlceth","aidusd","aidbtc","aideth","sngusd","sngbtc","sngeth","repusd","repbtc","repeth","elfusd","elfbtc","elfeth","btcgbp","etheur","ethjpy","ethgbp","neoeur","neojpy","neogbp","eoseur","eosjpy","eosgbp","iotjpy","iotgbp","iosusd","iosbtc","ioseth","aiousd","aiobtc","aioeth","requsd","reqbtc","reqeth","rdnusd","rdnbtc","rdneth","lrcusd","lrcbtc","lrceth","waxusd","waxbtc","waxeth","daiusd","daibtc","daieth","cfiusd","cfibtc","cfieth","agiusd","agibtc","agieth","bftusd","bftbtc","bfteth","mtnusd","mtnbtc","mtneth","odeusd","odebtc","odeeth","antusd","antbtc","anteth","dthusd","dthbtc","dtheth","mitusd","mitbtc","miteth","stjusd","stjbtc","stjeth","xlmusd","xlmeur","xlmjpy","xlmgbp","xlmbtc","xlmeth","xvgusd","xvgeur","xvgjpy","xvggbp","xvgbtc","xvgeth","bciusd","bcibtc"];

var mySubscribeData = [{ 
  event: 'subscribe', 
  channel: 'trades', 
  symbol: 'tBTCUSD' 
},{ 
  event: 'subscribe', 
  channel: 'trades', 
  symbol: 'tETHUSD' 
}]

// var mySubscribeData = [];
// symbolList.map(symbol => {
//   var subscribeData = {
//     event: 'subscribe', 
//     channel: 'ticker', 
//     symbol: `t${symbol.toUpperCase()}` 
//   }
//   mySubscribeData.push(subscribeData)
// })

class TradeBox extends Component {
  constructor(props) {
    super();

  }

  render() {
    var items = this.props.tickers[this.props.selection] || [];
    if (!Array.isArray(items)) {
        items = [];
    }
    return (
      <Segment className="TradeBox">
      <Item.Group>
        <Item className="TradeBox-Header">
        {[
        "PRICE",
        "AMOUNT",
        "TIME"].map(col => {
          return (
            <div className={`Ticker-item-column`}>{col}</div>
          )
        })}
        </Item>
        {
            items.map((trade, index) => {
                return (
                    <TradeItem details={trade}/>
                )
            })
        }
        </Item.Group>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    tickers: state.tickers,
    listings: state.subscribedMapping,
    selection: state.selection,
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
)(TradeBox);

