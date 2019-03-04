import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux'
import configureStore from './store';

import Login from './components/Login';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Login /> 
  </Provider>
, document.getElementById("index"));