import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button } from 'semantic-ui-react';
import { createTrade } from '../../actions';
import history from '../../history';

class NewHolding extends Component {
  state = {
    currency: 'AUD',
    tradeType: 'buy',
  };

  handleOnSubmit = (e) => {
    e.preventDefault();
    const { id: portfolioId } = this.props.auth.currentPortfolio;
    this.props.createTrade({ ...this.state, portfolioId });
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { id: portfolioId } = this.props.auth.currentPortfolio;
    return (
      <Form error className="ui container" onSubmit={this.handleOnSubmit}>
        <Form.Field>
          <label>Company code or symbol</label>
          <input
            placeholder="Company code or symbol"
            name="symbol"
            onChange={this.handleOnChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Trade Date</label>
          <input
            type="date"
            placeholder={new Date().toString()}
            name="date"
            onChange={this.handleOnChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Trade Type</label>
          <select name="tradeType" onChange={this.handleOnChange}>
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
          />
        </Form.Field>
        <Form.Field>
          <label>Share price</label>
          <input
            placeholder="1.23"
            name="sharePrice"
            onChange={this.handleOnChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Brokerage</label>
          <input
            placeholder="9.99"
            name="brokerage"
            onChange={this.handleOnChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Currency</label>
          <select name="curreny" onChange={this.handleOnChange}>
            <option value="AUD" defaultValue>
              AUD
            </option>
          </select>
        </Form.Field>

        <Button
          negative
          onClick={() => history.push(`/portfolio/${portfolioId}`)}
        >
          Cancel
        </Button>
        <Button type="submit" positive>
          Save Trade
        </Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { createTrade })(NewHolding);
