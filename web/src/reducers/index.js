import { combineReducers } from 'redux';
import auth from './auth';
import categories from './categories';
import feeds from './feeds';
// import api from './api';
import main from './main';

const rootReducer = combineReducers ({
  auth,
  categories,
  feeds,
  // api,
  main
});

export default rootReducer;