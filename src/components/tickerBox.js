import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import socketActions from '../actions/socketActions.js';
import TickerItem from './tickerItem.js';

import { Segment, Item } from 'semantic-ui-react';

const symbolList = ["btcusd","ltcusd","ltcbtc","ethusd","ethbtc","etcbtc","etcusd","rrtusd","rrtbtc","zecusd","zecbtc","xmrusd","xmrbtc","dshusd","dshbtc","btceur","btcjpy","xrpusd","xrpbtc","iotusd","iotbtc","ioteth","eosusd","eosbtc","eoseth","sanusd","sanbtc","saneth","omgusd","omgbtc","omgeth","bchusd","bchbtc","bcheth","neousd","neobtc","neoeth","etpusd","etpbtc","etpeth","qtmusd","qtmbtc","qtmeth","avtusd","avtbtc","avteth","edousd","edobtc","edoeth","btgusd","btgbtc","datusd","datbtc","dateth","qshusd","qshbtc","qsheth","yywusd","yywbtc","yyweth","gntusd","gntbtc","gnteth","sntusd","sntbtc","snteth","ioteur","batusd","batbtc","bateth","mnausd","mnabtc","mnaeth","funusd","funbtc","funeth","zrxusd","zrxbtc","zrxeth","tnbusd","tnbbtc","tnbeth","spkusd","spkbtc","spketh","trxusd","trxbtc","trxeth","rcnusd","rcnbtc","rcneth","rlcusd","rlcbtc","rlceth","aidusd","aidbtc","aideth","sngusd","sngbtc","sngeth","repusd","repbtc","repeth","elfusd","elfbtc","elfeth","btcgbp","etheur","ethjpy","ethgbp","neoeur","neojpy","neogbp","eoseur","eosjpy","eosgbp","iotjpy","iotgbp","iosusd","iosbtc","ioseth","aiousd","aiobtc","aioeth","requsd","reqbtc","reqeth","rdnusd","rdnbtc","rdneth","lrcusd","lrcbtc","lrceth","waxusd","waxbtc","waxeth","daiusd","daibtc","daieth","cfiusd","cfibtc","cfieth","agiusd","agibtc","agieth","bftusd","bftbtc","bfteth","mtnusd","mtnbtc","mtneth","odeusd","odebtc","odeeth","antusd","antbtc","anteth","dthusd","dthbtc","dtheth","mitusd","mitbtc","miteth","stjusd","stjbtc","stjeth","xlmusd","xlmeur","xlmjpy","xlmgbp","xlmbtc","xlmeth","xvgusd","xvgeur","xvgjpy","xvggbp","xvgbtc","xvgeth","bciusd","bcibtc"];

var mySubscribeData = [{ 
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

    this.handleClick = this.handleClick.bind(this);
  }
  
  componentWillMount() { // HERE WE ARE INITALIZING THE SOCKET
    this.props.socketActions.socketConnect({subscribeData:mySubscribeData});
  }

  handleClick (e, pair) {
    this.props.socketActions.socketSend({subscribeData: [{
      event: 'subscribe', 
      channel: 'trades', 
      symbol: `t${pair}` 
    }]})
  }

  render() {
    return (
      <Segment className="TickerBox">
      <Item.Group>
        <Item className="TickerBox-Header">
        {["NAME",
        "PRICE",
        "CHANGE",
        "HIGH",
        "LOW"].map(col => {
          return (
            <div className={`Ticker-item-column`}>{col}</div>
          )
        })}
        </Item>
        {
          Object.keys(this.props.listings.ticker).map( (item, index) => {
            if (this.props.tickers[item] && this.props.listings.ticker[item]) {
              return (
                <TickerItem  clickHandler={this.handleClick} key={index} pair={this.props.listings.ticker[item]} details={this.props.tickers[item]}/>
              )
            }
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

