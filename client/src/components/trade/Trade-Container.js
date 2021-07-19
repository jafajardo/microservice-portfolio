import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import TradeColumn from './Trade-Column';
import history from '../../history';

class TradeContainer extends Component {
  renderTradeColumns() {
    const { trades } = this.props;

    if (trades && trades.length > 0) {
      const sortedTrades = trades.sort((a, b) => new Date(a) + new Date(b));
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
    const { portfolioId } = this.props;
    return (
      <>
        <Button
          negative
          floated="left"
          compact
          style={{ marginBottom: '8px' }}
          onClick={() => history.push(`/portfolio/${portfolioId}`)}
        >
          Back To Portfolio
        </Button>
        <Button
          positive
          floated="right"
          compact
          style={{ marginBottom: '8px' }}
          onClick={() => history.push(`/portfolio/${portfolioId}/newHolding`)}
        >
          Add New Holding
        </Button>
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
      </>
    );
  }
}

export default TradeContainer;
