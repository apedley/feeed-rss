import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import { toast } from 'react-toastify'

import Sidebar from '../components/sidebar'
import * as categoryActions from '../actions/categories';
import * as feedActions from '../actions/feeds';
import * as authActions from '../actions/auth';
import * as mainActions from '../actions/main';

import FeedDisplay from '../components/feedDisplay';


class MainView extends Component {
  toggleCategory(category) {

    this.props.actions.categoryActions.toggleVisibility(category);
  }

  selectStream(entity, e) {
    if (e && e.target.tagName === 'I') {
      this.toggleCategory(entity);
    } else {
    this.props.actions.mainActions.selectStream(entity);
    }
  }

  toggleItem(item, newWindow = false) {
    // debugger;
    this.props.actions.mainActions.toggleItem(item, newWindow);
  }


  componentWillMount() {
    this.props.actions.categoryActions.listCategories();
    this.props.actions.feedActions.getFeeds();

    if (this.props.match.params.streamId) {
      const streamId = decodeURIComponent(this.props.match.params.streamId)
      this.props.actions.mainActions.selectStream({ id: streamId });
    }

  }

  
  render() {
    if (!this.props.authenticated) {
      return (
        <Redirect to="/signin" />
      )
    }
    return (
      <Grid className="main-view-grid">
        <Grid.Column width={4}>
          <Sidebar categories={this.props.categories} subscriptions={this.props.subscriptions} marks={this.props.unreadCount} authenticated={this.props.authenticated} toggleCategory={this.toggleCategory.bind(this)} selectStream={this.selectStream.bind(this)}  />
        </Grid.Column>
        <Grid.Column width={12}>

        
          <FeedDisplay feed={this.props.selectedStream} loading={this.props.streamLoading} toggleItem={this.toggleItem.bind(this)} />
        </Grid.Column>
      </Grid>
    )
  }
}


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    categories: state.categories.data,
    subscriptions: state.feeds.feeds,
    unreadCount: state.feeds.unreadCounts,
    selectedStream: state.main.selectedStream,
    streamLoading: state.main.streamLoading,
    selectedItem: state.main.selectedItem
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      authActions: bindActionCreators(authActions, dispatch),
      categoryActions: bindActionCreators(categoryActions, dispatch),
      feedActions: bindActionCreators(feedActions, dispatch),
      mainActions: bindActionCreators(mainActions, dispatch),
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainView);