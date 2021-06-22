import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class TradeColumn extends Component {
  formatDate(dateString) {
    const date = new Date(dateString);
    const monthArray = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day} ${monthArray[month]} ${year}`;
  }

  capitalizeFirstLetter(word) {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
  }

  render() {
    const { date, tradeType, quantity, sharePrice, brokerage } = this.props;
    return (
      <Table.Row>
        <Table.Cell>{this.formatDate(date)}</Table.Cell>
        <Table.Cell>{this.capitalizeFirstLetter(tradeType)}</Table.Cell>
        <Table.Cell>{quantity}</Table.Cell>
        <Table.Cell>{sharePrice}</Table.Cell>
        <Table.Cell>{brokerage}</Table.Cell>
        <Table.Cell>{sharePrice * quantity}</Table.Cell>
      </Table.Row>
    );
  }
}

export default TradeColumn;
