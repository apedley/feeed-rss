import { LIST_CATEGORIES, API_ERROR, TOGGLE_FEEDS } from '../actions/types'

const initialState = {
  error: null
}
export default function(state = initialState, action) {
  switch(action.type) {
    case LIST_CATEGORIES:
      return { ...state, list: action.data }
    case API_ERROR:
      return { ...state, list: [], error: { title: action.data.message, message: action.data.stack } }
  }
  return state;
}