import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Container, Menu } from 'semantic-ui-react';
import { currentUser, signout } from '../actions';

class Header extends Component {
  componentDidMount() {
    this.props.currentUser();
  }

  renderMenu() {
    if (!this.props.auth.currentUser) {
      return (
        <>
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/signup">Sign up</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/signin">Sign in</Link>
            </Menu.Item>
          </Menu.Menu>
        </>
      );
    } else {
      return (
        <>
          <Menu.Menu position="right">
            <Menu.Item>
              <Link to="/" onClick={this.props.signout}>
                Signout
              </Link>
            </Menu.Item>
          </Menu.Menu>
        </>
      );
    }
  }

  renderDashboard() {
    if (this.props.auth.currentUser) {
      return (
        <Menu.Item>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
      );
    }

    return null;
  }

  render() {
    return (
      <>
        <Menu fixed="top" inverted>
          <Container>
            <Menu.Item header>
              <Link
                to={
                  this.props.auth.currentPortfolio
                    ? `/portfolio/${this.props.auth.currentPortfolio.id}`
                    : '/'
                }
              >
                Foliotracker
              </Link>
            </Menu.Item>
            {this.renderDashboard()}
            {this.renderMenu()}
          </Container>
        </Menu>

        {/* <div className="ui menu">
          <div className="header item">
            <Link
              to={
                this.props.auth.currentPortfolio
                  ? `/portfolio/${this.props.auth.currentPortfolio.id}`
                  : '/'
              }
            >
              Portfolio Tracker
            </Link>
          </div>
          <div className="right menu">{this.renderMenu()}</div>
        </div> */}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { currentUser, signout })(Header);
