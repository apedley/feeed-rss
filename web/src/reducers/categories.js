import { LIST_CATEGORIES_FAILED, LIST_CATEGORIES_FINISHED, LIST_CATEGORIES_LOADING, API_ERROR, TOGGLE_CATEGORY_VISIBILITY } from '../actions/types'
import _ from 'lodash';

const initialState = {
  error: null
}
export default function(state = initialState, action) {
  switch(action.type) {
    case LIST_CATEGORIES_FINISHED:
      
      return { ...state, data: action.payload }
    case LIST_CATEGORIES_LOADING: 
      return state;
    case LIST_CATEGORIES_FAILED:
      return { ...state, error: action.payload }
    case TOGGLE_CATEGORY_VISIBILITY:
      const newCategories = state.data.map(cat => {
        if (cat.id === action.payload) {
          cat.visible = !cat.visible;
        }
        return cat;
      });
      return { ...state, data: newCategories }
    case API_ERROR:
      return { ...state, list: [], error: { title: action.data.message, message: action.data.stack } }
    default:
      return state;
  }
}