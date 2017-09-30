import { makeRequest, handleApiError, getFeeds, getUnreadCounts, getCategories } from '../util/api';
import feedlyConfig from "../util/feedly";
import {
  LOAD_FEEDS_SUCCESS,
  FETCH_SUBSCRIPTIONS_SUCCESS,
  FETCH_FEEDS_SUCCESS,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_UNREAD_COUNTS_SUCCESS,
  API_ERROR
} from './types.js'

const fetchFeedsSuccess = (feeds) => ({
  type: FETCH_FEEDS_SUCCESS,
  feeds
})

const fetchUnreadCountsSuccess = (unreadCounts) => ({
  type: FETCH_UNREAD_COUNTS_SUCCESS,
  unreadCounts
})

const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  categories
})

const fetchSubscriptionsSuccess = ( feeds, categories, unreadCounts ) => ({
  type: FETCH_SUBSCRIPTIONS_SUCCESS,
  feeds,
  categories,
  unreadCounts
})

const feedError = (error) => ({
  type: API_ERROR,
  error
})

export function fetchUnreadCounts() {
  return (dispatch) => {
    return getUnreadCounts()
      .then( unreadCounts => {
        return dispatch(fetchUnreadCountsSuccess(unreadCounts))
      })
  }
}

export function fetchCategories() {
  return (dispatch) => {
    return getCategories()
      .then( categories => {
        
        return dispatch(fetchCategoriesSuccess(categories))
      })
  }
}

export function fetchFeeds() {
  return (dispatch) => {
    return getFeeds()
      .then( feeds => {
        return dispatch(fetchFeedsSuccess(feeds))
      })
  }
}

export function fetchSubscriptions() {
  return (dispatch) => {
    return Promise.all([
      getFeeds(),
      getCategories(),
      getUnreadCounts()
    ]).then(results => {
      let [feeds, categories, unreadCounts] = results;
      return dispatch(fetchSubscriptionsSuccess( feeds, categories, unreadCounts ))
    })
  }
}
