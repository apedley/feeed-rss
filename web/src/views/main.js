import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Redirect } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'


import Sidebar from '../components/sidebar.old'
import AlertsOverlay from '../components/alertsOverlay'
import * as categoryActions from '../actions/categories';
import * as feedActions from '../actions/feeds';
import * as authActions from '../actions/auth';
import * as mainActions from '../actions/main';

import FeedDisplay from '../components/feedDisplay';


class MainView extends Component {
  toggleCategory(category) {
    // debugger;
    // this.props.actions.categoryActions.toggleVisibility(category);
  
  }

  selectStream(entity, e) {
    if (e && e.target.tagName === 'I') {
      this.toggleCategory(entity);
    } else {
    this.props.actions.mainActions.selectStream(entity);
    }
  }

  toggleItem(item, newWindow = false) {
    
    this.props.actions.mainActions.toggleItem(item, newWindow);
  }


  componentWillMount() {
    this.props.actions.categoryActions.listCategories();
    // this.props.actions.categoryActions.getCategories();
    // this.props.actions.feedActions.getFeeds();
    // this.props.actions.feedActions.betterGetFeeds();
    this.props.actions.feedActions.getFeedsWithMarkers();
    if (this.props.match.params.streamId) {
      const streamId = decodeURIComponent(this.props.match.params.streamId)
      this.props.actions.mainActions.selectStream({ id: streamId });
    }


    // this.props.actions.mainActions.sendAlert('100', 'just a test', 3);
    // this.props.actions.feedActions.subscribe({ id: "feed/http://facebook.github.io/react/feed.xml"})
  }

  componentDidMount() {
    // this.props.actions.feedActions.subscribe({ id: "feed/http://facebook.github.io/react/feed.xml"})
  }

  
  render() {
    if (!this.props.authenticated) {
      return (
        <Redirect to="/signin" />
      )
    }
    return (
      <Grid className="main-view-grid">
        <Grid.Column width={5}>
          <Sidebar categories={this.props.categories} subscriptions={this.props.subscriptions} marks={this.props.unreadCount} authenticated={this.props.authenticated} toggleCategory={this.toggleCategory.bind(this)} selectStream={this.selectStream.bind(this)}  />
        </Grid.Column>
        <Grid.Column width={11}>

          <AlertsOverlay />
          <FeedDisplay feed={this.props.selectedStream} loading={this.props.streamLoading} toggleItem={this.toggleItem.bind(this)} />
        </Grid.Column>
      </Grid>
    )
  }
}


function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    categories: state.categories,
    subscriptions: state.feeds.list,
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