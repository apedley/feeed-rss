import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import _ from 'lodash';

import CategoryList from './categoryList';

class CategoryListContainer extends Component {
  constructor(props) {
    super(props);

  }
  componentDidMount() {
    
  }
  

  render() {
    return (
      <div>
        <CategoryList categories={this.props.categories} />
      </div>
    )
  }

}

const getCategories = (state) => state.subscriptions.categories
const getFeeds = (state) => state.subscriptions.feeds

const someSelector = createSelector(
  [getCategories, getFeeds],
  (categories, feeds) => {
    
    const categoryProps = _.map(categories, (category) => {
      
      const includedFeeds = _.filter(feeds, function(feed) {
        return _.includes(feed.categories, category.id)
      })

      const newCat = {
        label: category.label,
        feeds: includedFeeds,
        unread: category.unread,
        id: category.id
      }
      return newCat;
    });
    
    return categoryProps
  }
)

const mapStateToProps = (state, ownProps) => {
  return {
    // categories: assembleCategories(state.subscriptions)
    categories: someSelector(state)
  }
}

export default connect(mapStateToProps)(CategoryListContainer)