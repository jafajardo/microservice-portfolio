import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table } from 'semantic-ui-react';
import { retrieveShareStat } from '../../actions';

class Holding extends Component {
  componentDidMount() {
    this.props.retrieveShareStat(this.props.symbol);
  }

  render() {
    const stat = this.props.shareStat[this.props.symbol];

    return (
      <Table.Row>
        <Table.Cell>{this.props.name}</Table.Cell>
        <Table.Cell>{this.props.symbol}</Table.Cell>
        <Table.Cell>{stat.priceBid}</Table.Cell>
      </Table.Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    shareStat: state.shareStat,
  };
};

export default connect(mapStateToProps, { retrieveShareStat })(Holding);
