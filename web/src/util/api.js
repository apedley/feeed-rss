import axios from 'axios';
import feedlyConfig from "../util/feedly";
import { ADD_ALERT } from '../actions/types'


export function makeRequest(resource, data = {}) {
  const token = localStorage.getItem('access_token');
  let url = `http://localhost:8080/request?feedlyEndpoint=${resource}&token=${token}`;

  
  for (let key in data) {
    const value = encodeURIComponent(data[key]);
    url += `&${key}=${value}`;
  }
  return axios.get(url);
}

export function getCategories() {
  return makeRequest(feedlyConfig.resources.CATEGORY_LIST)
    .then(response => {
      return response.data;
    });
}

export function getFeeds() {
  return makeRequest(feedlyConfig.resources.SUBSCRIPTIONS)
    .then(response => {
      
      return response.data;
    });
}


export function getUnreadCounts() {
  return makeRequest(feedlyConfig.resources.UNREAD_COUNT)
    .then(response => {
      return response.data.unreadcounts;
    });
}

export function handleApiError(err, dispatch) {
    console.error(err);
    dispatch({
      type: ADD_ALERT,
      payload: {
        code: err.response.status,
        message: err.message,
        level: 3
      },
      error: true
    })
}

