import {
  SELECTED_STREAM_FINISHED,
  SELECTED_STREAM_LOADING,
  SELECT_ITEM,
  CLEAR_SELECTED_ITEM,
  ADD_ALERT,
  REMOVE_ALERT
} from "./types";

import { makeRequest, handleApiError } from '../util/api';
import feedlyConfig from "../util/feedly";
import _ from "lodash";

export function selectStream(entity) {
  return (dispatch, getState) => {
    dispatch({
      type: SELECTED_STREAM_LOADING
    });
    makeRequest(
      feedlyConfig.resources.STREAM_CONTENTS_WITH_ID,
      {fetchId: entity.id }
    ).then(response => {
      const stream = response.data;
      if (!stream.title) {
        stream.title = stream.id.substr(stream.id.lastIndexOf("/") + 1);
      }

      _.each(stream.items, item => {
        item.displayed = false;
      });
      dispatch({
        type: SELECTED_STREAM_FINISHED,
        payload: stream
      });
    })
    .catch(err => {
      handleApiError(err, dispatch)
      
    })
  };
}

const externalRedirect = item => {
  const url = item.alternate[0].href;
  return window.open(url);
};

export function toggleItem(item, external = false) {
  return (dispatch, getState) => {
    // debugger;
    item.displayed = !item.displayed;

    if (external || !item.content) {
      return externalRedirect(item);
    }

    if (!item.content.content) {
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

export function sendAlert(code, message, level) {
  return (dispatch, getState) => {
    
    dispatch({
      type: ADD_ALERT,
      payload: {
        code, message, level
      }
    })
  }
}

export function removeAlert() {
  return (dispatch, getState) => {
    dispatch({
      type: REMOVE_ALERT
    })
  }
}