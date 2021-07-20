import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Icon, Modal, Button, Form } from 'semantic-ui-react';
import { updateTrade } from '../../actions';

class TradeColumn extends Component {
  state = {
    open: false,
    currency: 'AUD',
    tradeType: 'buy',
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  formatDate(dateString, type) {
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
    const numericMonthArray = [
      '01',
      '02',
      '03',
      '04',
      '05',
      '06',
      '07',
      '08',
      '09',
      '10',
      '11',
      '12',
    ];
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();

    console.log(
      `${year}-${numericMonthArray[month]}-${day < 10 ? '0' + day : day}`
    );
    return type === 'input'
      ? `${year}-${numericMonthArray[month]}-${day < 10 ? '0' + day : day}`
      : `${day} ${monthArray[month]} ${year}`;
  }

  capitalizeFirstLetter(word) {
    return `${word[0].toUpperCase()}${word.slice(1)}`;
  }

  twoDecimalPlacesNumber(num) {
    return num.toFixed(2);
  }

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { id: portfolioId } = this.props.auth.currentPortfolio;
    this.props.updateTrade({ ...this.state, portfolioId });
    this.setState({ open: false });
  };

  render() {
    const {
      tradeId,
      date,
      tradeType,
      currency,
      quantity,
      sharePrice,
      brokerage,
    } = this.props;

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
              onClick={() =>
                this.setState({
                  tradeId,
                  open: true,
                  date,
                  currency,
                  tradeType,
                  quantity,
                  sharePrice,
                  brokerage,
                })
              }
            />
          </Table.Cell>
        </Table.Row>

        <Modal
          dimmer="blurring"
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          <Modal.Header>Edit Trade</Modal.Header>
          <Modal.Content>
            <Form error className="ui container" onSubmit={this.handleOnSubmit}>
              <Form.Field>
                <label>Trade Date</label>
                <input
                  type="date"
                  placeholder={new Date().toString()}
                  name="date"
                  onChange={this.handleOnChange}
                  value={this.formatDate(this.state.date, 'input')}
                />
              </Form.Field>
              <Form.Field>
                <label>Trade Type</label>
                <select
                  name="tradeType"
                  onChange={this.handleOnChange}
                  value={this.state.tradeType}
                >
                  <option value="buy" defaultValue>
                    Buy
                  </option>
                </select>
              </Form.Field>
              <Form.Field>
                <label>Quantity</label>
                <input
                  placeholder="Quantity"
                  name="quantity"
                  onChange={this.handleOnChange}
                  value={this.state.quantity}
                />
              </Form.Field>
              <Form.Field>
                <label>Share price</label>
                <input
                  placeholder="1.23"
                  name="sharePrice"
                  onChange={this.handleOnChange}
                  value={this.state.sharePrice}
                />
              </Form.Field>
              <Form.Field>
                <label>Brokerage</label>
                <input
                  placeholder="9.99"
                  name="brokerage"
                  onChange={this.handleOnChange}
                  value={this.state.brokerage}
                />
              </Form.Field>
              <Form.Field>
                <label>Currency</label>
                <select
                  name="curreny"
                  onChange={this.handleOnChange}
                  value={this.state.currency}
                >
                  <option value="AUD" defaultValue>
                    AUD
                  </option>
                </select>
              </Form.Field>
              <Button negative onClick={() => this.setState({ open: false })}>
                Cancel
              </Button>
              <Button type="submit" positive>
                Save Trade
              </Button>
            </Form>
          </Modal.Content>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { updateTrade })(TradeColumn);
