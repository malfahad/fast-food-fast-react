import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import configureStore from './store';

import Routes from './Routes/index';

ReactDOM.render(
  <Provider store={configureStore()}>
    <div>
      <Routes />
      {' '}
    </div>
  </Provider>,
  document.getElementById('index'),
);
