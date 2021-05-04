import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import imgSvg from 'Images/webpack-logo.svg';
import imgPng from 'Images/download.png';

const App: React.FC = () => {
  return <div>Hello from React</div>;
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('ts-main-react')
);
