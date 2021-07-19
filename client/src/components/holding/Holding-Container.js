import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Table, Button } from 'semantic-ui-react';
import HoldingColumn from './Holding-Column';
import history from '../../history';
// import { retrieveTrades } from '../../actions';

class HoldingContainer extends Component {
  componentDidMount() {
    // this.props.currentUser();
    // this.props.retrieveSpecificPortfolio(this.props.portfolioId);
    //this.props.retrieveHoldings(this.props.portfolioId);
  }

  renderHoldings() {
    if (this.props.holdings && this.props.holdings.length > 0) {
      const { holdings } = this.props;
      return holdings.map((holding) => (
        <HoldingColumn
          key={`${holding.id}`}
          id={holding.id}
          portfolio={holding.portfolio}
          name={holding.name}
          symbol={holding.symbol}
        ></HoldingColumn>
      ));
    }

    return null;
  }

  render() {
    const { portfolioId } = this.props;
    return (
      <>
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
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Quantity</Table.HeaderCell>
              <Table.HeaderCell>Value</Table.HeaderCell>
              <Table.HeaderCell>Capital Gains</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderHoldings()}</Table.Body>
        </Table>
      </>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     auth: state.auth,
//   };
// };

export default HoldingContainer;
