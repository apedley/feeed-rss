
import {
  SAVE_TOKEN,
  DELETE_TOKEN,
  USE_TOKEN,
  SKIP_TOKEN
} from './types';
export function saveToken({
  access_token,
  refresh_token
}) {

  return function (dispatch) {

    dispatch({
      type: SAVE_TOKEN
    });

    localStorage.setItem('access_token', access_token);
    localStorage.setItem('refresh_token', refresh_token);
  }
}

export function deleteToken() {

  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  return {
    type: DELETE_TOKEN
  }
}

export function useToken() {
  if (localStorage.getItem('access_token')) {
    return {
      type: USE_TOKEN
    }
  } else {
    return {
      type: SKIP_TOKEN
    }
  }
}