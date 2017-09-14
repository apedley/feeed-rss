import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions/auth';

class Header extends Component {
  render() {
    return (
      <div>
        neader
      </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
};


export default connect(mapStateToProps, actions)(Header);