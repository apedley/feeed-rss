import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/auth';
import { Redirect } from 'react-router-dom';

class DeleteToken extends Component {
  componentWillMount() {
    this.props.deleteToken();
  }
  render() {
    return (
      <Redirect to="/" />
    )
  }
}

export default connect(null, actions)(DeleteToken);