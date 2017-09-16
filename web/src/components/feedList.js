import React from "react";

import _ from "lodash";
import { Label, Menu, Icon } from "semantic-ui-react";
import CategoryContainer from './categoryContainer';

const getUnreadCount = (streamId, counts) => {
  if (!counts) {
    return 0;
  }

  var marks = _.filter(counts, stream => {
    return stream.id === streamId;
  });
  return marks.length > 0 ? marks[0].count : 0;
}; 

export default function FeedList(props) {
  const renderFeeds = feeds => {
    return _.map(feeds, feed => {
      return (
        <Menu.Item
          key={feed.id}
          onClick={() => {
            props.selectStream(feed);
          }}
        >
          <Label>{feed.unread}</Label> 
          { feed.title.trim().length < 37 ? feed.title.trim() : feed.title.trim().substr(0, 35).trim() + '...' }
        </Menu.Item>
      );
    });
  };

  const renderCategories = (feeds, marks, catList) => {
    let categories = [];

    _.each(feeds, feed => {
      // feed.unread = getUnreadCount(feed.id, marks);

      feed.categories.forEach(cat => {
        cat.unread = getUnreadCount(cat.id, marks);
        categories.push(cat);
      });
    });

    categories = _.uniqBy(categories, cat => {
      return cat.id;
    });

    categories.forEach(category => {
      var listItem = _.find(catList, c => {
        return c.id === category.id;
      });
      category.visible = true;
      if (listItem && listItem.visible) {
        category.visible = listItem.visible;
      }
      category.feeds = feeds.filter(feed => {
        return _.reduce(
          feed.categories,
          (result, cat) => {
            return result || cat.id === category.id;
          },
          false
        );
      });
    });

    return _.map(categories, category => {
      const unreadCount = category.feeds.reduce((prev, curr) => {
        return prev + curr.unread;
      }, 0);
      
      return (
        <CategoryContainer label={category.label} unread={unreadCount} feeds={category.feeds} key={category.id} selectStream={props.selectStream} id={category.id}/>
      )
    });

    const oldStuff =  _.map(categories, category => {
      const iconName = category.visible ? "caret down" : "caret right";

      const categoryHeaderStyles = {
        cursor: "pointer"
      };

      const unreadCount = category.feeds.reduce((prev, curr) => {
        return prev + curr.unread;
      }, 0);

      return (
        <Menu vertical fluid key={category.id}>

          <Menu.Item style={categoryHeaderStyles}>
            <Menu.Header
              onClick={e => {
                props.selectStream(category, e);
              }}
            >
              <Icon name={iconName} />
              <Label color="blue" className="menu-header-label">
                { unreadCount }
              </Label>
              {category.label}
            </Menu.Header>
          </Menu.Item>

          {category.visible ? renderFeeds(category.feeds) : ""}
        </Menu>
      );

    });
  };
  return (
    <div>
        {renderCategories(props.subscriptions, props.marks, props.categories)}
    </div>
  );
}