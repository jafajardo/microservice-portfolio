import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Placeholder } from 'semantic-ui-react';
import { retrieveShareStat, retrieveTrades } from '../../actions';
import { TradeTypes } from '@jafajardo-portfolio/common';

class Holding extends Component {
  componentDidMount() {
    this.props.retrieveShareStat(this.props.symbol);
    this.props.retrieveTrades(this.props.symbol, this.props.portfolio);
  }

  calculateQuantity(symbol) {
    const trades = this.props.trade[symbol];

    if (trades?.length > 0) {
      let buyQuantity = 0;
      let sellQuantity = 0;

      const buyTrades = trades.filter(
        (trade) => trade.tradeType === TradeTypes.Buy
      );

      const sellTrades = trades.filter(
        (trade) => trade.tradeType === TradeTypes.Sell
      );

      buyQuantity = buyTrades.reduce((quantity, currentValue) => {
        return quantity + currentValue.quantity;
      }, 0);

      sellQuantity = sellTrades.reduce((quantity, currentValue) => {
        return quantity + currentValue.quantity;
      }, 0);

      return buyQuantity - sellQuantity < 0 ? 0 : buyQuantity - sellQuantity;
    }
    return 0;
  }

  render() {
    const { symbol } = this.props;
    const stat = this.props.shareStat[symbol];
    const quantity = this.calculateQuantity(symbol);

    if (stat) {
      return (
        <Table.Row>
          <Table.Cell>
            <Link to={`/holding/${this.props.id}`}>{this.props.name}</Link>
          </Table.Cell>
          <Table.Cell>{symbol}</Table.Cell>
          <Table.Cell>{stat.priceBid}</Table.Cell>
          <Table.Cell>{quantity}</Table.Cell>
          <Table.Cell>{stat.priceBid * quantity}</Table.Cell>
        </Table.Row>
      );
    } else {
      return (
        <Table.Row>
          <Table.Cell>
            <Placeholder>
              <Placeholder.Line />
            </Placeholder>
          </Table.Cell>
        </Table.Row>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    shareStat: state.shareStat,
    trade: state.trade,
  };
};

export default connect(mapStateToProps, { retrieveShareStat, retrieveTrades })(
  Holding
);
