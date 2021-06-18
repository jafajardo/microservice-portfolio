import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  currentUser,
  retrieveHoldings,
  retrieveSpecificPortfolio,
} from '../../actions';
import HoldingContainer from '../holding/Holding-Container';

class Portfolio extends Component {
  componentDidMount() {
    const { portfolioId } = this.props.match.params;
    //this.props.currentUser();
    //this.props.retrieveSpecificPortfolio(this.props.match.params.portfolioId);
    this.props.retrieveHoldings(portfolioId);
  }

  render() {
    return (
      <HoldingContainer
        portfolioId={this.props.match.params.portfolioId}
        holdings={this.props.holding.holdings}
      ></HoldingContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    holding: state.holding,
  };
};

export default connect(mapStateToProps, {
  currentUser,
  retrieveHoldings,
  retrieveSpecificPortfolio,
})(Portfolio);
