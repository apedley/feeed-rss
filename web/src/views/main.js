import React, { Component } from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Sidebar from '../components/sidebar'
// import * as categoryActions from '../actions/categories';
import * as authActions from '../actions/auth';
import * as feedActions from '../actions/feeds';

import CategoryList from '../components/categoryList';

import { Row, Col } from 'reactstrap';

class MainView extends Component {
  componentWillMount() {
    // this.props.actions.categoryActions.listCategories();
    this.props.actions.feedActions.listFeeds();
  }
  render() {
    return (
      <Row>
        <Col xs={{ size: 12 }} sm={{ size: 12 }} md={{ size: 3 }}>
          <Sidebar categories={this.props.categories} feeds={this.props.feeds} />
        </Col>
        <Col>
          Main
        </Col>
      </Row>
    )
  }
}


function mapStateToProps(state) {
  return {
    // categories: state.categories.list,
    feeds: state.feeds.list,
    categories: state.feeds.categories,
    error: state.feeds.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      authActions: bindActionCreators(authActions, dispatch),
      // categoryActions: bindActionCreators(categoryActions, dispatch),
      feedActions: bindActionCreators(feedActions, dispatch)
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainView);
// export default connect(mapStateToProps, categoryActions)(MainView);