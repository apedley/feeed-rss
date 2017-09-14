import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/auth';
import { Redirect } from 'react-router-dom';

class SaveToken extends Component {
  componentWillMount() {

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const access_token = params.get('access_token');
    const refresh_token = params.get('refresh_token');
    this.props.saveToken({access_token, refresh_token});
  }
  render() {
    return (
      <Redirect to="/" />
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    prop: state.prop
  }
}
export default connect(null, actions)(SaveToken);