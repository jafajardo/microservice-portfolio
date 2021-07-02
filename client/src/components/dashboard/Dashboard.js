import React, { Component } from 'react';
import { connect } from 'react-redux';

import DashboardPortfolio from './Dashboard-Portfolio';
import { retrievePortfolios } from '../../actions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.retrievePortfolios();
  }

  render() {
    const portfoliosArray = Object.values(this.props.portfolios);
    return (
      <>
        <DashboardPortfolio portfolios={portfoliosArray} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    portfolios: state.portfolio,
  };
};

export default connect(mapStateToProps, { retrievePortfolios })(Dashboard);
