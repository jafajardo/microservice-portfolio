import React, { Component } from 'react';
import { Table, Icon, Modal, Button } from 'semantic-ui-react';

class TradeColumn extends Component {
  state = {
    open: false,
  };

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

  twoDecimalPlacesNumber(num) {
    return num.toFixed(2);
  }

  render() {
    const { date, tradeType, quantity, sharePrice, brokerage } = this.props;
    return (
      <>
        <Table.Row>
          <Table.Cell>{this.formatDate(date)}</Table.Cell>
          <Table.Cell>{this.capitalizeFirstLetter(tradeType)}</Table.Cell>
          <Table.Cell>{quantity}</Table.Cell>
          <Table.Cell>{sharePrice}</Table.Cell>
          <Table.Cell>{this.twoDecimalPlacesNumber(brokerage)}</Table.Cell>
          <Table.Cell>
            {this.twoDecimalPlacesNumber(sharePrice * quantity + brokerage)}
          </Table.Cell>
          <Table.Cell>
            <Icon
              name="edit outline"
              onClick={() => this.setState({ open: true })}
            />
          </Table.Cell>
        </Table.Row>
        <Modal
          dimmer="blurring"
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          <Modal.Header>Use Google's location service?</Modal.Header>
          <Modal.Content>
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </Modal.Content>
          <Modal.Actions>
            <Button negative onClick={() => this.setState({ open: false })}>
              Disagree
            </Button>
            <Button positive onClick={() => this.setState({ open: false })}>
              Agree
            </Button>
          </Modal.Actions>
        </Modal>
      </>
    );
  }
}

export default TradeColumn;
