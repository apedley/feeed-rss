
import axios from 'axios';
import _ from 'lodash';
import { makeRequest } from './api';
import feedlyConfig from '../util/feedly';
import {
  LIST_FEEDS_FAILED, LIST_FEEDS_FINISHED, LIST_FEEDS_LOADING, API_ERROR, TOGGLE_FEEDS,  LIST_FEEDS
} from './types';

const getUnreadCount = (streamId, counts) => {
  var marks = _.filter(counts, stream => {
    return stream.id === streamId;
  });
  return marks.length > 0 ? marks[0].count : 0;
}

export function getFeeds() {
  let feeds = {};
  return (dispatch, getState) => {
    makeRequest(feedlyConfig.resources.SUBSCRIPTIONS)
      .then(response => {
        feeds = response.data;
        
        makeRequest(feedlyConfig.resources.UNREAD_COUNT)
          .then(response => {
            const unreadCounts = response.data.unreadcounts;
            
            dispatch({ type: LIST_FEEDS_FINISHED, payload: { feeds, unreadCounts } })
          })
      })
      .catch(err => {
        console.error(err);
        dispatch({
          type: API_ERROR,
          payload: err,
          error: true
        });
      })
  }
}

// export function listFeeds() {
//   return function (dispatch) {
//     const token = localStorage.getItem('access_token');
//     const url = 'http://localhost:8080/request?feedlyResource=subscriptions&token=' + token;
//     axios.get(url)
//     .then(res => {
//         const feeds = res.data; 
//         const unreadUrl = 'http://localhost:8080/request?feedlyResource=unreadCount&token=' + token;
//         axios.get(unreadUrl)
//           .then(res => {
//             const unreadCounts = res.data.unreadcounts;
//             let categories = [];
//             _.each(feeds, (feed) => {
//               feed.unread = getUnreadCount(feed.id, unreadCounts)
//               feed.categories.forEach( (cat) => {
//                 categories.push(cat);
//               });
//             })
    
//             categories = _.uniqBy(categories, (cat) => {
//               return cat.id;
//             });
            
//             _.each(categories, category => {
//               category.display = false;
//               category.unread = getUnreadCount(category.id, unreadCounts);
//               category.feeds = feeds.filter(feed => {
//                 return _.reduce(feed.categories, (result, cat) => {
//                   return result || cat.id === category.id;
//                 }, false);
//               })
//             })
    
    
//             const data = { feeds, categories }
    
//             dispatch({ type: LIST_FEEDS, data: data });

//           }).catch(err => {
//             dispatch({ type: API_ERROR, payload: err, error: true });
//           })
//       })
//       .catch(err => {
//         dispatch({ type: API_ERROR, payload: err, error: true });
//       })
//   }
// }

export function toggleFeeds(categories, id) {
  categories.forEach(category => {
    if (category.id === id) {
      category.display = !category.display;
    }
  })

  return {
    type: TOGGLE_FEEDS,
    payload: categories
  }
}