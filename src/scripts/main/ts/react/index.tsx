import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from 'Redux/reducers/rootReducer';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
);
