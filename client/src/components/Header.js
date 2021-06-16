import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { currentUser, signout } from '../actions';

class Header extends Component {
  componentDidMount() {
    this.props.currentUser();
  }

  renderMenu() {
    if (!this.props.auth.currentUser) {
      return (
        <>
          <Link className="item" to="/signup">
            Sign up
          </Link>
          <Link className="item" to="/signin">
            Sign in
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link className="item" to="/" onClick={this.props.signout}>
            Signout
          </Link>
        </>
      );
    }
  }

  render() {
    return (
      <div className="ui menu">
        <div className="header item">
          <Link to="/">Portfolio Tracker</Link>
        </div>
        <div className="right menu">{this.renderMenu()}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { currentUser, signout })(Header);
