import React, { Component } from 'react'
import { Menu, Icon, Label, List } from 'semantic-ui-react';
import _ from 'lodash';
import FeedList from './feedList';

export default class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hiddenCategoryIds: []
    }
  }

  toggleVisibility(e, category) {
    // e.stopPropagation();
    debugger;
  }

  streamClicked(stream, event) {
    event.stopPropagation();
    this.props.selectStream(stream);
  }
  
  renderCategories(categories) {
    return _.map(categories, category => {
      return (
        <Menu vertical fluid key={category.id} >
          <Menu.Item header onClick={ (e) => { this.toggleVisibility(e, category) } }>
          
            <Label color="blue" className="menu-header-label"  onClick={ this.streamClicked.bind(this, { id: category.id }) }>
              { category.unread }
            </Label>
            {category.label}
          </Menu.Item>
            { < FeedList feeds={ category.feeds } />}
        </Menu>
      )
    });
  }

  render() {
    return (
    <div>
      { this.renderCategories(this.props.categories) }
      {/* { this.props.categories.map( category => this.renderCategory(category) ) } */}
    </div>
    )
  }
  
}
