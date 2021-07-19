import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import { store } from 'Redux/reducers/rootReducer';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
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

console.log(theme);

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ThemeProvider>,
  document.getElementById('app')
);
