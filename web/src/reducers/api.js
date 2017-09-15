import {
  FEEDLY_REQUEST_FAILED,
  FEEDLY_REQUEST_LOADING,
  FEEDLY_REQUEST_FINISHED,
  TOGGLE_FEEDS
} from '../actions/types'
import _ from 'lodash'

// export default (state = { data: {}, loading: false }, action = {}) => {
const initialState = {
  responses: {}
}
export default function(state = initialState, action) {
  switch(action.type) {
    // case FEEDLY_REQUEST_LOADING:
    //   return state;
    // case FEEDLY_REQUEST_FINISHED:
    //   const newResponses = { ...state.responses, [action.resource]: action.payload }
    //   return { ...state, responses: newResponses }
    // case FEEDLY_REQUEST_FAILED:
    //   return { ...state, error: action.payload }
    // case TOGGLE_FEEDS:
    //   const newState = { ...state };
    //   newState.responses.categoryList.forEach(cat => { 
    //     if (cat.id === action.id) { 
    //       cat.visible = cat.visible ? !cat.visible : true;
    //     }
    //   });
    //   return newState
      
    default:
      return state;
  }
}