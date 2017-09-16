
import { makeRequest, handleApiError, categoriesRequest } from '../util/api';
import feedlyConfig from "../util/feedly";
import _ from "lodash";
import {
  LIST_CATEGORIES_FINISHED,
  LIST_CATEGORIES_LOADING,
  TOGGLE_CATEGORY_VISIBILITY,
  LOAD_CATEGORIES_SUCCESS
} from "./types";
const loadCategoriesSuccess = (categories) => ({
  type: LOAD_CATEGORIES_SUCCESS,
  categories
})

export function getCategories() {
  return (dispatch, getState) => {
    categoriesRequest()
      .then(categories => {
        dispatch(loadCategoriesSuccess(categories))
      })
  }
}
export function listCategories() {
  return (dispatch, getState) => {
    dispatch({
      type: LIST_CATEGORIES_LOADING
    });
    makeRequest(feedlyConfig.resources.CATEGORY_LIST)
      .then(response => {
        const categories = response.data;

        _.each(categories, c => {
          c.visible = true;
        });
        dispatch({ type: LIST_CATEGORIES_FINISHED, payload: categories });
      })
      .catch(err => {
        handleApiError(err, dispatch)
        
      });
  };
}


export function toggleVisibility(category) {
  
  return {
    type: TOGGLE_CATEGORY_VISIBILITY,
    payload: category.id
  };
}
