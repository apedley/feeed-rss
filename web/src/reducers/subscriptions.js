import { createSubscriptions } from '../util/formatData';
import {
  LOAD_FEEDS_SUCCESS,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_FEEDS_SUCCESS,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_UNREAD_COUNTS_SUCCESS,
} from '../actions/types.js';
const initialState = {};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_FEEDS_SUCCESS:
      return { ...state, feeds: { data: action.feeds } }
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: { data: action.categories }}
    case FETCH_UNREAD_COUNTS_SUCCESS:
      return { ...state, unreadCounts: { data: action.unreadCounts }}

    case FETCH_SUBSCRIPTIONS_SUCCESS:
    const subscriptions = createSubscriptions(action.feeds, action.categories, action.unreadCounts)
      
      return subscriptions
    default:
      return state;
  }
}
