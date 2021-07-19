import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Placeholder } from 'semantic-ui-react';
import { retrieveTrades } from '../../actions';
import TradeContainer from '../trade/Trade-Container';

class HoldingDetails extends Component {
  componentDidMount() {
    const { symbol, portfolioId } = this.props.match.params;
    this.props.retrieveTrades(symbol, portfolioId);
  }

  render() {
    const { symbol, portfolioId } = this.props.match.params;
    if (
      this.props.trade &&
      this.props.trade[symbol] &&
      this.props.trade[symbol].length > 0
    ) {
      return (
        <TradeContainer
          trades={this.props.trade[symbol]}
          portfolioId={portfolioId}
        />
      );
    } else {
      return (
        <Placeholder>
          <Placeholder.Line />
        </Placeholder>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    trade: state.trade,
  };
};

export default connect(mapStateToProps, { retrieveTrades })(HoldingDetails);
