import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/header';
import { Redirect } from 'react-router-dom';
import OptionsMenu from '../components/options';
import { Grid } from 'semantic-ui-react'

import Sidebar from '../components/sidebar/sidebar';

import * as subscriptions from '../actions/subscriptions';


class HomeView extends Component {

  
  componentWillMount() {
    this.props.actions.subscriptionsActions.fetchSubscriptions();
  }

  selectStream(stream) {
    debugger;
  }

  render() {
    
    return (
      <Grid>
        <Grid.Column width={5}>
          <Sidebar />
        </Grid.Column>
        <Grid.Column>
          maisjfdiosj
        </Grid.Column>
      </Grid>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      subscriptionsActions: bindActionCreators(subscriptions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeView);