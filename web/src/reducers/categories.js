import { LIST_CATEGORIES_FINISHED, LIST_CATEGORIES_LOADING, API_ERROR, TOGGLE_CATEGORY_VISIBILITY, LOAD_CATEGORIES_SUCCESS } from '../actions/types'


const initialState = {
  error: null
}
export default function(state = initialState, action) {
  switch(action.type) {
    case LIST_CATEGORIES_FINISHED:
      
      return { ...state, data: action.payload }
    case LIST_CATEGORIES_LOADING: 
      return state;
    
    // case TOGGLE_CATEGORY_VISIBILITY:
    //   const newCategories = state.data.map(cat => {
    //     if (cat.id === action.payload) {
    //       cat.visible = !cat.visible;
    //     }
    //     return cat;
    //   });
    //   return { ...state, data: newCategories }
    case LOAD_CATEGORIES_SUCCESS:
    
      return action.categories
    case API_ERROR:
      // return { ...state, list: [], error: { title: action.data.message, message: action.data.stack } }
      return { ...state, data: [] }
    default:
      return state;
  }
}