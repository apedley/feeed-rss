import {
  LIST_FEEDS,
  API_ERROR,
  LIST_FEEDS_FINISHED,
  LIST_FEEDS_LOADING,
  LOAD_FEEDS_SUCCESS,

  SUBSCRIBING_TO_FEED,
  SUBSCRIBING_TO_FEED_FINISHED,
  SUBSCRIBING_TO_FEED_FAILED
} from '../actions/types'

const initialState = {
  error: null,
  feeds: []
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

    case SUBSCRIBING_TO_FEED_FINISHED:
      return { ...state, feeds: [ ...state.feeds, ...action.payload ] }
    case LOAD_FEEDS_SUCCESS:
      return { list: action.feeds, unreadInfo: action.unreadInfo } ;
    default:
      return state
  }
}