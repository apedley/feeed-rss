import { combineReducers } from 'redux';
import auth from './auth';
import categories from './categories';
import feeds from './feeds';
import main from './main';
import common from './common';
import subscriptions from './subscriptions';

const rootReducer = combineReducers ({
  auth,
  categories,
  feeds,
  main,
  common,
  subscriptions
});

export default rootReducer;