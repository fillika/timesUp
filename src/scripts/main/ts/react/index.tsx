import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '../store';
import imgSvg from 'Images/webpack-logo.svg';
import imgPng from 'Images/download.png';

const App: React.FC = () => {
  return (
    <div>
      <div>
        <form>
          <input type='text' placeholder='name' value='Проект номер 1' />
          <div>
            <button>Start/Stop</button>
          </div>
        </form>
      </div>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
