import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from 'Redux/reducers/rootReducer';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

export const mainTheme = createTheme({
  palette: {
    primary: {
      main: '#282c35',
    },
    secondary: {
      main: '#6a5acd',
    },
    error: {
      main: '#dc3545',
    },
    warning: {
      main: '#fcc521',
    },
    success: {
      main: '#28a745',
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={mainTheme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById('app')
);
