import React from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../actions/feeds";
import _ from "lodash";
import { Label, Menu, Accordion, Icon, List } from "semantic-ui-react";

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
          <Label>{feed.unread}</Label> }
          {feed.title}
        </Menu.Item>
      );
      // return (
      //   <li key={feed.id}>
      //     {feed.title}
      //   </li>
      // )
    });
  };
  const renderCategories = (feeds, marks, catList) => {
    let categories = [];

    _.each(feeds, feed => {
      feed.unread = getUnreadCount(feed.id, marks);

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
      category.visible = false;
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
      // return (
      //   <List.Item key={category.id}>
      //     <List.Icon name="folder" />
      //     <List.Content>
      //     <List.Header>
      //       {category.label}
      //     </List.Header>
      //     </List.Content>
      //   </List.Item>
      // )
      const iconName = category.visible ? "caret down" : "caret right";

      const categoryHeaderStyles = {
        cursor: "pointer"
      };
      return (
        <Menu vertical fluid key={category.id}>
          {/*          <Menu.Item icon={iconName} className="category-menu-item">
            <Label color="blue">{category.unread}</Label>
              
              <span className="category-menu-title" onClick={ () => { props.selectStream(category) } } >
                {category.label}
              </span>
            
      </Menu.Item>*/}
          <Menu.Item style={categoryHeaderStyles}>
            <Menu.Header
              onClick={e => {
                props.selectStream(category, e);
              }}
            >
              <Icon name={iconName} />
              <Label color="blue" className="menu-header-label">
                {category.unread}
              </Label>
              {category.label}
            </Menu.Header>
          </Menu.Item>

          {category.visible ? renderFeeds(category.feeds) : ""}
        </Menu>
      );
      // const title = (
      //     <Accordion.Title>
      //       <Icon name='dropdown' />
      //       {category.label}
      //     </Accordion.Title>
      // );

      // const content = (
      //     <Accordion.Content>
      //       <ul>
      //       { renderFeeds(category.feeds) }
      //       </ul>
      //     </Accordion.Content>
      // );

      // return [title, content];
    });
  };
  // return (
  //   <Accordion fluid>
  //     {renderCategories(props.subscriptions, props.marks, props.categories)}
  //   </Accordion>
  // )
  return (
    <div>
      {renderCategories(props.subscriptions, props.marks, props.categories)}
    </div>
  );
}
// class FeedList extends Component {

//   toggleCategory(category) {
//     this.props.actions.feedActions.toggleFeeds(this.props.categories, category.id);
//   }

//   renderCategories() {

//     const renderFeeds = (feeds) => {
//       return _.map(feeds, feed => {
//         return (
//           <ListGroupItem key={feed.id}>
//             {feed.title} ({feed.unread})
//           </ListGroupItem>
//         )
//       })
//     }

//     const toggleCategory = (category) => {
//       category.display = !category.display;
//     }

//     return _.map(this.props.categories, (category) => {
//       if (category.display) {}
//       return (
//         <div key={category.id}>
//         <h3 className="listGroupHeader" onClick={ () => this.toggleCategory(category) } >
//           {category.label} ({category.unread})
//         </h3>
//         <ListGroup>
//           { category.display ? renderFeeds(category.feeds) : '' }
//         </ListGroup>
//         </div>
//       )

//     });
//   }
//   render() {
//     return (
//       <div>
//         {this.renderCategories()}
//       </div>
//     )
//   }
// }

// function mapStateToProps(state) {
//   return {
//     feeds: state.feeds,
//     categories: state.feeds.categories
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     actions: {
//       feedActions: bindActionCreators(actions, dispatch)
//     }
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(FeedList);
