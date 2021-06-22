import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Placeholder } from 'semantic-ui-react';
import { retrieveShareStat, retrieveTrades } from '../../actions';
import { TradeTypes } from '@jafajardo-portfolio/common';

class HoldingColumn extends Component {
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

  calculateGains(currentValue, symbol) {
    const trades = this.props.trade[symbol];

    if (trades?.length > 0) {
      let buyValue = 0;
      let sellValue = 0;

      const buyTrades = trades.filter(
        (trade) => trade.tradeType === TradeTypes.Buy
      );

      const sellTrades = trades.filter(
        (trade) => trade.tradeType === TradeTypes.Sell
      );

      buyValue = buyTrades.reduce((value, currentValue) => {
        return value + currentValue.quantity * currentValue.sharePrice;
      }, 0);

      sellValue = sellTrades.reduce((value, currentValue) => {
        return value + currentValue.quantity * currentValue.sharePrice;
      }, 0);

      const currentCapital = buyValue - sellValue;

      const gains = (currentValue / currentCapital - 1) * 100;

      return gains.toFixed(2);
    }
    return 0;
  }

  render() {
    const { symbol } = this.props;
    const stat = this.props.shareStat[symbol];
    const quantity = this.calculateQuantity(symbol);

    let value = 0;
    if (stat) {
      value = stat.priceBid * quantity;
    }

    let capitalGains = 0;
    if (stat && quantity) {
      capitalGains = this.calculateGains(value, symbol);
    }

    if (stat) {
      return (
        <Table.Row>
          <Table.Cell>
            <Link
              to={`/portfolio/${this.props.portfolio}/${this.props.symbol}`}
            >
              {this.props.name}
            </Link>
          </Table.Cell>
          <Table.Cell>{symbol}</Table.Cell>
          <Table.Cell>{stat.priceBid}</Table.Cell>
          <Table.Cell>{quantity}</Table.Cell>
          <Table.Cell>{value}</Table.Cell>
          <Table.Cell>{`${capitalGains}%`}</Table.Cell>
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
  HoldingColumn
);
