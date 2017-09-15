import React, { Component } from 'react'
import { connect } from 'react-redux';
import striptags from 'striptags';
import _ from 'lodash';
import { Icon, Label, Menu, Table, Loader, Item, Header } from 'semantic-ui-react'
import SanitizeHTML from 'sanitize-html';
import RawHtml from 'react-raw-html';
import { Parser } from 'html-to-react';
import ContentDisplay from './contentDisplay';

class FeedDisplay extends Component {
  constructor(props) {  
    super(props);
    this.htmlToReactParser = new Parser();
  }
  
  renderItems(items) {
    const selectedItem = this.props.selectedItem;

    return _.map(items, item => {
      const published = new Date(item.published);

      const titleStyles = {
        lineHeight: '1.5em',
        fontSize: '1.5em',
        width: '80%'
      }

      const itemStyles = {
        cursor: 'pointer'
      }
      // debugger;
      
      const info = (
        <Item key={item.id}>
          <Item.Content style={itemStyles} onClick={() => { this.props.toggleItem(item) } }>
            
          <Label className="right floated" >
            {published.toDateString()}
          </Label>
            <Item.Header style={titleStyles} > 
              {item.title}
            </Item.Header>
            <Icon name="external square" link onClick={(e) => { e.stopPropagation(); window.open(item.alternate[0].href) } }/>
            <Item.Meta onClick={() => { this.props.toggleItem(item) } }>
              {item.author} 
            </Item.Meta>
            <Item.Description >
              { item.displayed === false && item.summary ? this.renderContent(item.summary.content, true, 250) : '' }
            </Item.Description>
          </Item.Content>
        </Item>
      )

      if (!selectedItem || selectedItem.id !== item.id ) {
        return info;
      }

      const content = selectedItem.content;
      
      return [
        info,
        this.renderContent(content.content)
      ]
    });
  }

  renderContent(content = '', noTags = false, maxCharacters = 0) {
    return (
      <div className="external-html">
        <ContentDisplay content={content} noTags={noTags} maxCharacters = {maxCharacters} />
      </div>
    )
  }

  render() {
    if (!this.props.feed) {
      return (
        <div>
          none
        </div>
      )
    }
    if (this.props.loading) {
      return (
        <Loader active inline='centered' />
      )
    }
    
    const feed = this.props.feed;

    const headerStyles = {
      color: '#555',
      textTransform: 'uppercase'
    }
    return (
      <div>
        <Header textAlign='center' as="h2" style={headerStyles}>
          { feed.title }
        </Header>
          <Item.Group divided>
            { this.renderItems(feed.items) }
            </Item.Group>
      </div>
    )
  }


}

function mapStateToProps(state) {
  return {
    categories: state.categories.data,
    subscriptions: state.feeds.feeds,
    unreadCount: state.feeds.unreadCounts,
    selectedStream: state.main.selectedStream,
    streamLoading: state.main.streamLoading,
    selectedItem: state.main.selectedItem
  };
};

export default connect(mapStateToProps)(FeedDisplay);