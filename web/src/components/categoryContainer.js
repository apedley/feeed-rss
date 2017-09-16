import React, { Component } from 'react'
import { Menu, Icon, Label, List } from 'semantic-ui-react';
import _ from 'lodash';

// const FeedItem = (props) => {
//   return (

//   )
// }
export default class CategoryContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true
    }
  }
  toggleVisibility(e) {
    // debugger;
    e.stopPropagation();
    this.setState({
      visible: !this.state.visible
    })
  }

  streamClicked(stream, event) {
    this.props.selectStream(stream);
  }

  renderFeedItems() {
    if (!this.state.visible) return;

    return _.map(this.props.feeds, feed => {
      return (
        <Menu.Item key={feed.id} onClick={this.streamClicked.bind(this, feed)}>
        <Label>{feed.unread}</Label> 
  { feed.title.trim().length < 37 ? feed.title.trim() : feed.title.trim().substr(0, 35).trim() + '...' }
        { feed.title }
      </Menu.Item>
      )
    })
  }
  render() {
    return (
      <Menu vertical fluid>
        <Menu.Item header onClick={ this.toggleVisibility.bind(this) }>
        
          <Label color="blue" className="menu-header-label"  onClick={ this.streamClicked.bind(this, { id: this.props.id }) }>
            { this.props.unread }
          </Label>
          {this.props.label}
        </Menu.Item>
          { this.renderFeedItems() }
      </Menu>
    )
  }
}
