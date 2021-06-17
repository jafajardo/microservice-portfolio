import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Placeholder } from 'semantic-ui-react';
import { retrieveShareStat } from '../../actions';

class Holding extends Component {
  componentDidMount() {
    this.props.retrieveShareStat(this.props.symbol);
  }

  render() {
    const stat = this.props.shareStat[this.props.symbol];
    if (stat) {
      return (
        <Table.Row>
          <Table.Cell>{this.props.name}</Table.Cell>
          <Table.Cell>{this.props.symbol}</Table.Cell>
          <Table.Cell>{stat.priceBid}</Table.Cell>
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
  };
};

export default connect(mapStateToProps, { retrieveShareStat })(Holding);
