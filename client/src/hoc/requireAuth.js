import React, { Component } from 'react';
import { connect } from 'react-redux';
import { currentUser } from '../actions';
import history from '../history';

const RequireAuth = (WrappedComponent) => {
  class EnhancedComponent extends Component {
    componentDidMount() {
      this.props.currentUser();
    }

    componentDidUpdate() {
      if (!this.props.auth.currentUser) {
        history.push('/');
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => {
    return {
      auth: state.auth,
    };
  };

  return connect(mapStateToProps, { currentUser })(EnhancedComponent);
};

export default RequireAuth;
