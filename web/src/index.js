import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react'

import reduxThunk from 'redux-thunk';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import reducers from './reducers';

import HomeView from './views/home';
import AboutView from './views/about';
import CategoryView from './views/categories';
import MainView from './views/main';

import SaveToken from './components/saveToken';
import DeleteToken from './components/deleteToken';
import Signin from './components/signin';

import { USE_TOKEN } from './actions/types';





const store = createStore(reducers,
 compose(
  applyMiddleware(reduxThunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

const token = localStorage.getItem('access_token')

if (token) {
  store.dispatch({ type: USE_TOKEN })
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Container fluid>

        <Switch>
          <Route path="/about" component={AboutView} />
          <Route path="/signin" component={Signin}  />
          <Route path="/savetoken" component={SaveToken} />
          <Route path="/signout" component={DeleteToken} />
          <Route path="/categories" component={CategoryView} />
          <Route path="/feeed/:streamId?" component={MainView} />
          <Route path="/" component={HomeView} />
        </Switch>
      </Container>
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));

