import {
  SELECT_STREAM,
  SELECTED_STREAM_LOADING,
  SELECT_ITEM,
  CLEAR_SELECTED_ITEM,
  API_ERROR
} from "./types";

import {  makeRequest } from "./api";
import feedlyConfig from "../util/feedly";
import _ from "lodash";

export function selectStream(entity) {
  return (dispatch, getState) => {
    dispatch({
      type: SELECTED_STREAM_LOADING
    });
    makeRequest(
      feedlyConfig.resources.STREAM_CONTENTS_WITH_ID,
      entity.id
    ).then(response => {
      const stream = response.data;
      if (!stream.title) {
        stream.title = stream.id.substr(stream.id.lastIndexOf("/") + 1);
      }

      _.each(stream.items, item => {
        item.displayed = false;
      });
      dispatch({
        type: SELECT_STREAM,
        payload: stream
      });
    })
    .catch(err => {
      console.error(err);
      dispatch({
        type: API_ERROR,
        payload: err,
        error: true
      });
    })
  };
}

const externalRedirect = item => {
  const url = item.alternate[0].href;
  return window.open(url);
};

export function toggleItem(item, external = false) {
  return (dispatch, getState) => {
    item.displayed = !item.displayed;

    if (external || !item.content) {
      return externalRedirect(item);
    }
    const currentState = getState();

    if (
      currentState.main.selectedItem &&
      currentState.main.selectedItem.id === item.id
    ) {
      return dispatch({
        type: CLEAR_SELECTED_ITEM
      });
    }

    dispatch({
      type: SELECT_ITEM,
      payload: item
    });
  };
}
