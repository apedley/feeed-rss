

import { makeRequest } from './api';
import feedlyConfig from '../util/feedly';
import {
  LIST_FEEDS_FINISHED, LIST_FEEDS_LOADING, API_ERROR, TOGGLE_FEEDS
} from './types';

// const getUnreadCount = (streamId, counts) => {
//   var marks = _.filter(counts, stream => {
//     return stream.id === streamId;
//   });
//   return marks.length > 0 ? marks[0].count : 0;
// }

export function getFeeds() {
  let feeds = {};
  return (dispatch, getState) => {
    dispatch({
      type: LIST_FEEDS_LOADING
    });
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