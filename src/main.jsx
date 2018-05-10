import 'fetch-polyfill';
import 'babel-polyfill';

import React from 'react';
import { render } from 'react-dom';
import RedBox from 'redbox-react';
import { loadingBarReducer, loadingBarMiddleware } from 'react-redux-loading-bar';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createDebounce from 'redux-debounced';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux';

import { omit } from 'lodash';

import { AppContainer } from './components/AppContainer';

import { appReducers } from './reducers';

import { APPLICATION_CLEAR_MODULE_DATA } from './actions/application/application';

import { BASE_URL } from './config';

const history = createHistory({
  basename: BASE_URL,
});

/* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production' &&
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;
/* eslint-disable no-underscore-dangle */

const appReducer = combineReducers({
  ...appReducers,
  router: routerReducer,
  loadingBar: loadingBarReducer,
});

const rootReducer = (state, action) => {
  if (action.type === APPLICATION_CLEAR_MODULE_DATA) {
    const { moduleName } = action;
    state = omit(state, moduleName); // eslint-disable-line no-param-reassign
  }

  return appReducer(state, action);
};

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(
    routerMiddleware(history),
    loadingBarMiddleware(),
    thunk,
    createDebounce(),
  )),
);

const AppWithProvider = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <AppContainer />
    </ConnectedRouter>
  </Provider>
);

const root = document.getElementById('root');

if (process.env.NODE_ENV !== 'production') {
  try {
    render(<AppWithProvider />, root);
  } catch (e) {
    render(<RedBox error={e} />, root);
  }
} else {
  render(<AppWithProvider />, root);
}
