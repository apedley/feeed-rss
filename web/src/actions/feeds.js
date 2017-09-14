
import axios from 'axios';
import _ from 'lodash';

import {
  LIST_FEEDS, API_ERROR, TOGGLE_FEEDS
} from './types';

const getUnreadCount = (streamId, counts) => {
  var marks = _.filter(counts, stream => {
    return stream.id === streamId;
  });
  return marks.length > 0 ? marks[0].count : 0;
}

export function listFeeds() {
  return function (dispatch) {
    const token = localStorage.getItem('access_token');
    const url = 'http://localhost:8080/request?feedlyResource=subscriptions&token=' + token;
    axios.get(url)
    .then(res => {
        const feeds = res.data; 
        const unreadUrl = 'http://localhost:8080/request?feedlyResource=unreadCount&token=' + token;
        axios.get(unreadUrl)
          .then(res => {
            const unreadCounts = res.data.unreadcounts;
            let categories = [];
            _.each(feeds, (feed) => {
              feed.unread = getUnreadCount(feed.id, unreadCounts)
              feed.categories.forEach( (cat) => {
                categories.push(cat);
              });
            })
    
            categories = _.uniqBy(categories, (cat) => {
              return cat.id;
            });
            
            _.each(categories, category => {
              category.display = false;
              category.unread = getUnreadCount(category.id, unreadCounts);
              category.feeds = feeds.filter(feed => {
                return _.reduce(feed.categories, (result, cat) => {
                  return result || cat.id === category.id;
                }, false);
              })
            })
    
    
            const data = { feeds, categories }
    
            dispatch({ type: LIST_FEEDS, data: data });

          }).catch(err => {
            dispatch({ type: API_ERROR, data: err });
          })
      })
      .catch(err => {
        dispatch({ type: API_ERROR, data: err });
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