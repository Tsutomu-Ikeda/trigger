import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import * as serviceWorker from './serviceWorker';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#222",
      dark: "#A30000",
      contrastText: "#fff",
    },
    secondary: {
      main: "#4f93ff",
      dark: "#3e73c7",
      contrastText: "#fff",
    },
    background: {
      default: "#eee",
      paper: "#eee",
    },
  },
});

ReactDOM.render(
  // <React.StrictMode>
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>,
  // </React.StrictMode>
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
