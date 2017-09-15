
import axios from 'axios';
import { makeRequest } from './api'
import feedlyConfig from '../util/feedly';
import _ from 'lodash';
import {
  TOGGLE_FEEDS, API_ERROR, LIST_CATEGORIES_FINISHED, LIST_CATEGORIES_LOADING, TOGGLE_CATEGORY_VISIBILITY
} from './types';

export function listCategories() {
  return (dispatch, getState) => {
    makeRequest(feedlyConfig.resources.CATEGORY_LIST)
      .then(response => {
        const categories = response.data;

        _.each(categories, c => {
          c.visible = true;
        })
        dispatch({ type: LIST_CATEGORIES_FINISHED, payload: categories })
      })
      .catch(err => {

        dispatch({
          type: API_ERROR,
          payload: err,
          error: true
        });
      })
  }
  // return makeFeedlyRequest(feedlyConfig.resources.CATEGORY_LIST, LIST_CATEGORIES_LOADING, LIST_CATEGORIES_FINISHED, LIST_CATEGORIES_FAILED);
}
export function toggleVisibility(category) {

  return {
    type: TOGGLE_CATEGORY_VISIBILITY,
    payload: category.id
  }
}