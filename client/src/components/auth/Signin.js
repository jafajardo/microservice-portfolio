import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Message } from 'semantic-ui-react';
import { signin } from '../../actions';

class Signin extends Component {
  state = {
    email: null,
    password: null,
  };

  handleOnSubmit = (e) => {
    e.preventDefault();

    if (this.state.email !== null && this.state.password !== null) {
      this.props.signin(this.state.email, this.state.password);
    }
  };

  handleOnChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  renderErrorMessage = () => {
    if (this.props.auth.error) {
      return <Message error content={this.props.auth.msg} />;
    }

    return null;
  };

  render() {
    return (
      <Form error className="ui container" onSubmit={this.handleOnSubmit}>
        <Form.Field>
          <label>Email</label>
          <input
            placeholder="Email"
            name="email"
            onChange={this.handleOnChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="Password"
            name="password"
            onChange={this.handleOnChange}
          />
        </Form.Field>
        {this.renderErrorMessage()}
        <Button type="submit" className="btn">
          Sign in
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

export default connect(mapStateToProps, { signin })(Signin);
