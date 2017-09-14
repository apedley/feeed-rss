import React, { Component } from 'react'
import CategoryList from './categoryList';
import FeedList from './feedList';

class Sidebar extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <div>
        <FeedList />
      </div>
    )
  }
}


export default Sidebar;