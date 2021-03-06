import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Routes from './Routes/index';

import './assets/css/style.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <div>
      <Routes />
      {' '}
    </div>
  </Provider>,
  document.getElementById('index'),
);
