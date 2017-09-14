import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/auth';

import { Redirect } from 'react-router-dom';

class Signin extends Component {
  componentWillMount() {
    if (!this.props.authenticated) {
      window.location = 'http://localhost:8080/auth'
    }
  }

  render() {
    return (
      <Redirect to="/main" />
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
};


export default connect(mapStateToProps, actions)(Signin);
