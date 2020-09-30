import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import NotFound from "./views/NotFound";
import Company from "./views/Company";
import CompanyDetail from "./views/CompanyDetail";
import Top from "./views/Top";
import SignIn from "./views/SignIn";
import { MatchingCreate } from "./views/Matching";

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
  footer: {
    padding: theme.spacing(2),
    height: 80,
  },
}));

const routes = [{
  path: "/",
  component: Top,
}, {
  path: "/company/search",
  component: Company,
}, {
  path: "/company/:id",
  component: CompanyDetail,
  exact: false,
}, {
  path: "/matching/create",
  component: MatchingCreate,
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
          <Container maxWidth="md" style={{ marginTop: "20px" }}>
            <div className={classes.app}>
              <main className={classes.main}>
                <Switch>
                  <Route path="*/index.html">
                    <Redirect to="." />
                  </Route>
                  {routes.map((item) => (
                    <Route path={item.path} component={item.component} key={item.path} exact={item.exact || true} />
                  ))}
                  <Route>
                    <NotFound />
                  </Route>
                </Switch>
              </main>
            </div>
          </Container>
        </Router>
        <footer className={classes.footer}>
        </footer>
      </React.Fragment>
    </AppProvider >
  );
}
