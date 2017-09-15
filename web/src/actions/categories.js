
import { makeRequest } from "./api";
import feedlyConfig from "../util/feedly";
import _ from "lodash";
import {
  API_ERROR,
  LIST_CATEGORIES_FINISHED,
  LIST_CATEGORIES_LOADING,
  TOGGLE_CATEGORY_VISIBILITY
} from "./types";

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
        dispatch({
          type: API_ERROR,
          payload: err,
          error: true
        });
      });
  };
}
export function toggleVisibility(category) {
  return {
    type: TOGGLE_CATEGORY_VISIBILITY,
    payload: category.id
  };
}
