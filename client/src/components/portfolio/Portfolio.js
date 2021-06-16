import React, { Component } from 'react';
import { connect } from 'react-redux';
import { retrieveHoldings } from '../../actions';
import HoldingContainer from '../holding/Holding-Container';

class Portfolio extends Component {
  componentDidMount() {
    this.props.retrieveHoldings(this.props.match.params.portfolioId);
  }

  render() {
    return (
      <HoldingContainer
        holdings={this.props.holding.holdings}
      ></HoldingContainer>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.auth,
    holding: state.holding,
  };
};

export default connect(mapStateToProps, { retrieveHoldings })(Portfolio);
