import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Message,
  Grid,
  Header,
  Segment,
} from 'semantic-ui-react';
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
      <Grid
        textAlign="center"
        style={{ height: '80vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: '450px' }}>
          <Header as="h2" style={{ color: '#3eaaaf' }} textAlign="center">
            Sign-in to your account
          </Header>
          <Form
            size="large"
            error={this.props.auth.error ? true : undefined}
            className="ui container"
            onSubmit={this.handleOnSubmit}
          >
            <Segment raised>
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                name="email"
                onChange={this.handleOnChange}
              />

              <Form.Input
                type="password"
                fluid
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                name="password"
                onChange={this.handleOnChange}
              />

              <Button fluid className="btn" size="large">
                Sign in
              </Button>
            </Segment>
          </Form>
          {this.renderErrorMessage()}
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { signin })(Signin);
