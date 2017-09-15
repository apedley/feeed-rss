import {
  SELECT_STREAM,
  SELECTED_STREAM_LOADING, SELECTED_ITEM_LOADING, SELECT_ITEM, CLEAR_SELECTED_ITEM, API_ERROR
} from '../actions/types'

import { toast } from 'react-toastify'
const initialState = {
  error: null,
  selectedStream: null,
  streamLoading: false,
  selectedItem: null
}
export default function (state = initialState, action) {
  
  switch (action.type) {
    case SELECT_STREAM:
      return { ...state, selectedStream: action.payload, streamLoading: false }
    case SELECTED_STREAM_LOADING:
      return { ...state, selectedItem: null, streamLoading: true }
    case SELECT_ITEM:
      return { ...state, selectedItem: action.payload }
    case API_ERROR:
      return { ...state, error: action.payload }
    case CLEAR_SELECTED_ITEM:
      return { ...state, selectedItem: null }
    default:
      return state;
  }
}