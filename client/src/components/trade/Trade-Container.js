import React, { Component } from 'react';
import { Button } from 'semantic-ui-react';
import history from '../../history';
import TradesTable from './Trade-TradesTable';
import TradeChart from './Trade-Chart';

class TradeContainer extends Component {
  render() {
    const { symbol, trades, portfolioId, shareStats } = this.props;

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

        <TradeChart symbol={symbol} shareStats={shareStats} />
        <TradesTable trades={trades} />
      </>
    );
  }
}

export default TradeContainer;
