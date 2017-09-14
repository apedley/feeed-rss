import { combineReducers } from 'redux';
import auth from './auth';
import categories from './categories';
import feeds from './feeds';

const rootReducer = combineReducers ({
  auth,
  categories,
  feeds
});

export default rootReducer;