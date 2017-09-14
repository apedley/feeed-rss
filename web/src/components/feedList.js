import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions/feeds';
import _ from 'lodash';

class FeedList extends Component {

  toggleCategory(category) {
    this.props.actions.feedActions.toggleFeeds(this.props.categories, category.id);
  }
  
  renderCategories() {

    const renderFeeds = (feeds) => {
      return _.map(feeds, feed => {
        return (
          <ListGroupItem key={feed.id}>
            {feed.title} ({feed.unread})
          </ListGroupItem>
        )
      })
    }

    const toggleCategory = (category) => {
      category.display = !category.display;
    }

    return _.map(this.props.categories, (category) => {
      if (category.display) {}
      return (
        <div key={category.id}>
        <h3 className="listGroupHeader" onClick={ () => this.toggleCategory(category) } >
          {category.label} ({category.unread})
        </h3>
        <ListGroup>
          { category.display ? renderFeeds(category.feeds) : '' }
        </ListGroup>
        </div>
      )
      
    });
  }
  render() {
    return (
      <div>
        {this.renderCategories()}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    feeds: state.feeds,
    categories: state.feeds.categories
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      feedActions: bindActionCreators(actions, dispatch)
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FeedList);