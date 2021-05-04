import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store, { TState } from '../store';

const title = 'React from TS';

const App: React.FC = () => {
  const counter = useSelector((state: TState) => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      {title}
      <p>Вы кликнули {counter} раз (Typescript)</p>
      <p>
        <button onClick={() => dispatch({ type: 'PLUS' })}>Click</button>
      </p>
    </div>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('ts-second-react')
);
