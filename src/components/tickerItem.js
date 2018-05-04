import React, { Component } from 'react';
import { Segment, Item } from 'semantic-ui-react';

// BID,
//           BID_SIZE,
//           ASK,
//           ASK_SIZE,
//           DAILY_CHANGE,
//           DAILY_CHANGE_PERC,
//           LAST_PRICE,
//           VOLUME,
//           HIGH,
//           LOW

class TickerItem extends Component {
    constructor(props) {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (e) {
        this.props.clickHandler(e, this.props.pair);
    }

  render() {
    return (
      <Item className="Ticker-item-container">
            <div onClick={this.handleClick} className="Ticker-item-column Ticker-item-pair">
                {this.props.pair}
            </div>
            <div onClick={this.handleClick} className="Ticker-item-column Ticker-item-last-price">
                {this.props.details[6]}
            </div>
            <div onClick={this.handleClick} className="Ticker-item-column Ticker-item-daily-change-perc">
                {`${this.props.details[5]*100}%`}
            </div>
            <div onClick={this.handleClick} className="Ticker-item-column Ticker-item-high">
                {this.props.details[8]}
            </div>
            <div onClick={this.handleClick} className="Ticker-item-column Ticker-item-low">
                {this.props.details[9]}
            </div>
      </Item>
    );
  }
}

export default (TickerItem);

