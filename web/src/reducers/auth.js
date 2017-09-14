import {
  SAVE_TOKEN,
  DELETE_TOKEN,
  USE_TOKEN
} from '../actions/types';


const initialState = {
  authenticated: false
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SAVE_TOKEN:
      return { ...state, authenticated: true };
    case DELETE_TOKEN:
      return { ...state, authenticated: false };
    case USE_TOKEN:
      return { ...state, authenticated: true }
  }
  return state;
}