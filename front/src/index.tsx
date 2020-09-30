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
function reorient() // After travelling in the history stack
{
    const positionLastShown = Number( // If none, then zero
      sessionStorage.getItem( 'positionLastShown' ));
    let position = window.history.state; // Absolute position in stack
    if( position === null ) // Meaning a new entry on the stack
    {
        position = positionLastShown + 1; // Top of stack

        // (1) Stamp the entry with its own position in the stack
        window.history.replaceState( position, /*no title*/'' );
    }

    // (2) Keep track of the last position shown
    sessionStorage.setItem( 'positionLastShown', String(position) );

    // (3) Discover the direction of travel by comparing the two
    const direction = Math.sign( position - positionLastShown );
    console.log( 'Travel direction is ' + direction );
      // One of backward (-1), reload (0) or forward (1)
}

window.addEventListener( 'pageshow', reorient );
window.addEventListener( 'popstate', reorient );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
