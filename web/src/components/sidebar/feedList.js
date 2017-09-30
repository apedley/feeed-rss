import _ from 'lodash';
import React from 'react'
import { Menu, Label } from 'semantic-ui-react';

function feedList(props) {

  const renderFeedItems = (feeds) => {
    return _.map(feeds, feed => (
      <Menu.Item key={feed.id}>
        <Label>{feed.unread}</Label> 
        { feed.title }
      </Menu.Item>
    ))
  }


  return (
    <div>
      { renderFeedItems(props.feeds )}
    </div>
  )
}

export default feedList
