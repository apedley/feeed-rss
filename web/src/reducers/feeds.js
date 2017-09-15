import {
  LIST_FEEDS,
  API_ERROR,
  TOGGLE_FEEDS,
  LIST_FEEDS_FAILED,
  LIST_FEEDS_FINISHED,
  LIST_FEEDS_LOADING
} from '../actions/types'

const initialState = {
  error: null
}
export default function (state = initialState, action) {
  switch (action.type) {
    case LIST_FEEDS:
      return { ...state,
        list: action.data.feeds,
        categories: action.data.categories
      }
    case API_ERROR:
      return { ...state,
        list: [],
        error: {
          title: action.data.message,
          message: action.data.stack
        }
      }
    case LIST_FEEDS_LOADING:
      return state;
    case LIST_FEEDS_FAILED:

    
      return { ...state,
        error: action.payload
      }
    case LIST_FEEDS_FINISHED:
      return { ...state, feeds: action.payload.feeds, unreadCounts: action.payload.unreadCounts }
  }
  return state;
}