
import axios from 'axios';

import {
  LIST_CATEGORIES, API_ERROR, TOGGLE_FEEDS
} from './types';

export function listCategories() {
  return function (dispatch) {
    const token = localStorage.getItem('access_token');
    const url = 'http://localhost:8080/request?feedlyResource=categoryList&token=' + token;
    axios.get(url)
      .then(res => {
        dispatch({ type: LIST_CATEGORIES, data: res.data });
      })
      .catch(err => {
        dispatch({ type: API_ERROR, data: err });
      })
  }
}
