import React, { Component } from 'react'
import { connect } from 'react-redux';
import Header from '../components/header';
import { Redirect } from 'react-router-dom';
import OptionsMenu from '../components/options';

class HomeView extends Component {
  render() {
    if (!this.props.authenticated) {
      return (
        <Redirect to="/about" />
      )
    }
    return (
      <div>
        <Header />
        <OptionsMenu authenticated={this.props.authenticated} />
        hello
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(HomeView);