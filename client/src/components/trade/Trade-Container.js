import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import TradeColumn from './Trade-Column';

class TradeContainer extends Component {
  renderTradeColumns() {
    const { trades } = this.props;

    if (trades && trades.length > 0) {
      const sortedTrades = trades.sort((a, b) => new Date(a) + new Date(b));
      return trades.map((trade) => {
        return (
          <TradeColumn
            key={trade.id}
            date={trade.date}
            tradeType={trade.tradeType}
            quantity={trade.quantity}
            sharePrice={trade.sharePrice}
            brokerage={trade.brokerage}
          />
        );
      });
    }
    return null;
  }

  render() {
    return (
      <Table striped singleLine selectable compact="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Type</Table.HeaderCell>
            <Table.HeaderCell>QTY</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Brokerage</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{this.renderTradeColumns()}</Table.Body>
      </Table>
    );
  }
}

export default TradeContainer;
