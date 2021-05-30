/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

import {Provider} from 'react-redux';
// import {createStore, applyMiddleware} from 'redux';
// import thunk from 'redux-thunk';
import reducers from './src/helpers/redux/reducers';
import {configureStore} from '@reduxjs/toolkit';

const store = configureStore({
  reducer: reducers,
  devTools: true,
});

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => Root);
