import React, { Component } from 'react';
import { Segment, Item } from 'semantic-ui-react';

class TradeItem extends Component {
    constructor(props) {
        super();

    }

  render() {
    return (
      <Item className="Trade-item-container">
            <div className="Trade-item-column Trade-item-price">
                {this.props.details[3]}
            </div>
            <div className="Trade-item-column Trade-item-amount">
                {this.props.details[2]}
            </div>
            <div className="Trade-item-column Trade-item-time">
                {this.props.details[1]}
            </div>
      </Item>
    );
  }
}

export default (TradeItem);

