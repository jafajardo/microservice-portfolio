import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import 'semantic-ui-css/semantic.min.css';
import './style.css';
import history from './history';
import { Router } from 'react-router-dom';

import App from './App';
import Header from './components/Header';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Header />
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root')
);
