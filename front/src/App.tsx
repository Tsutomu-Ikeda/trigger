import React from "react";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import NotFound from "./views/NotFound";

import Top from "./views/Top";
import Matching from "./views/Matching";
import Listen from "./views/Listen";
import Money from "./views/Money";

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
  sidebar: {
    background: "#ccc",
  },
  footer: {
    padding: theme.spacing(2),
    height: 80,
  },
  links: {
    padding: theme.spacing(1, 0),
  },
}));

const routes = [{
  path: "/",
  component: Top,
}, {
  path: "/matching",
  component: Matching,
}, {
  path: "/listen",
  component: Listen,
}, {
  path: "/money",
  component: Money,
}];

export default function App() {
  const classes = useStyles();

  return (
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
          <footer className={classes.footer}>
            <div className={classes.links}>
              <Container maxWidth="sm">
                <Typography align="center" color="textSecondary">
                  <Link color="inherit" href="/">
                    トップへ戻る
            </Link>
                </Typography>
              </Container>
            </div>
          </footer>
        </div>
      </Router>
    </React.Fragment>
  );
}
