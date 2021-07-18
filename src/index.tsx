import React from 'react';
import { render } from 'react-dom';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
