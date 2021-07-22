import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import TradeColumn from './Trade-Column';

class TradesTable extends Component {
  renderTradeColumns() {
    const { trades } = this.props;

    if (trades && trades.length > 0) {
      const sortedTrades = trades.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        if (dateA < dateB) {
          return -1;
        } else if (dateA > dateB) {
          return 1;
        }
        return 0;
      });

      return sortedTrades.map((trade) => {
        return (
          <TradeColumn
            key={trade.id}
            tradeId={trade.id}
            date={trade.date}
            currency={trade.currency}
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
      <div style={{ margin: '1em 0' }}>
        <Table striped singleLine selectable compact="very">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Type</Table.HeaderCell>
              <Table.HeaderCell>QTY</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Brokerage</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
              <Table.HeaderCell>Options</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderTradeColumns()}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default TradesTable;
