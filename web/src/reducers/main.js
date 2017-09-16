import {
  SELECTED_STREAM_FINISHED,
  SELECTED_STREAM_LOADING,
  SELECT_ITEM,
  CLEAR_SELECTED_ITEM,
  API_ERROR,
  ADD_ALERT,
  REMOVE_ALERT
} from "../actions/types";


const initialState = {
  error: null,
  selectedStream: null,
  streamLoading: false,
  selectedItem: null,
  alerts: []
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SELECTED_STREAM_FINISHED:
      return { ...state, selectedStream: action.payload, streamLoading: false };
    case SELECTED_STREAM_LOADING:
      return { ...state, selectedItem: null, streamLoading: true };
    case SELECT_ITEM:
      return { ...state, selectedItem: action.payload };
    case CLEAR_SELECTED_ITEM:
      return { ...state, selectedItem: null };
    case API_ERROR:
      return { ...state, error: action.payload.response.data.error };
    case ADD_ALERT:
      const newAlerts = [ ...state.alerts, action.payload ]
      return { ...state, alerts: newAlerts  }
    case REMOVE_ALERT:
      const fewerAlerts = state.alerts.slice(1);
      return { ...state, alerts: fewerAlerts }
    default:
      return state;
  }
}
