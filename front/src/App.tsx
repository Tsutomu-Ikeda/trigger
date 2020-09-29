import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import NotFound from "./views/NotFound";
import Top from "./views/Top";
import Matching from "./views/Matching";
import SignIn from "./views/SignIn";

import { AppProvider } from "./store/store";

import Header from './components/Header';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    minHeight: 40,
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    minHeight: "calc(100vh - 132px)",
    backgroundColor: theme.palette.background.paper,
  },
}));

const routes = [{
  path: "/",
  component: Top,
}, {
  path: "/matching",
  component: Matching,
// }, {
//   path: "/listen",
//   component: Listen,
}, {
  path: "/sign_in",
  component: SignIn,
}];

export default function App() {
  const classes = useStyles();

  return (
    <AppProvider>
      <React.Fragment>
        <CssBaseline />
        <Router>
          <Header />
          <div className={classes.app}>
            <main className={classes.main}>
              <Switch>
                <Route path="*/index.html">
                  <Redirect to="." />
                </Route>
                {routes.map((item) => (
                  <Route path={item.path} component={item.component} key={item.path} exact />
                ))}
                <Route>
                  <NotFound />
                </Route>
              </Switch>
            </main>
          </div>
        </Router>
      </React.Fragment>
    </AppProvider>
  );
}
