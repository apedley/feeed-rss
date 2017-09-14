import { LIST_FEEDS, API_ERROR, TOGGLE_FEEDS } from '../actions/types'

const initialState = {
  error: null
}
export default function(state = initialState, action) {
  switch(action.type) {
    case LIST_FEEDS:
      return { ...state, list: action.data.feeds, categories: action.data.categories }
    case API_ERROR:
      return { ...state, list: [], error: { title: action.data.message, message: action.data.stack } }
    case TOGGLE_FEEDS:
      return { ...state, categories: action.payload }
  }
  return state;
}