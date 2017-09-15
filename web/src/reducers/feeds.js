import {
  LIST_FEEDS,
  API_ERROR,
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
        list: []
      }
    case LIST_FEEDS_LOADING:
      return state;
    case LIST_FEEDS_FINISHED:
      return { ...state, feeds: action.payload.feeds, unreadCounts: action.payload.unreadCounts }
    default:
      return state
  }
}