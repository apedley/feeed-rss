import { combineReducers } from 'redux';
import auth from './auth';
import categories from './categories';
import feeds from './feeds';
import main from './main';

const rootReducer = combineReducers ({
  auth,
  categories,
  feeds,
  main
});

export default rootReducer;