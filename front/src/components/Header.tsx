
import React, { useCallback, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Container from '@material-ui/core/Container';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";

import { store } from "store/store";
import {
  LogOut
} from "store/actions";

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme: Theme) =>
  createStyles({
    secondaryBar: {
      zIndex: 0,
    },
    menuButton: {
      marginLeft: -theme.spacing(1),
    },
    link: {
      textDecoration: 'none',
      color: lightColor,
      '&:hover': {
        color: theme.palette.common.white,
      },
    },
    button: {
      borderColor: lightColor,
    },
    headerTitle: {
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.2em'
      }
    },
    scrollTop: {
      position: 'fixed',
      zIndex: 10,
      bottom: theme.spacing(3),
      right: theme.spacing(3),
    },
  });

const routes = {
  "/":
    { label: "マイページ" },
  "/company/search":
    { label: "話をしたい" },
  // "/listen":
  //   { label: "みんなの相談" }
};

const sanitizeRoute = (route: string) => route in routes && route;

interface HeaderProps extends WithStyles<typeof styles> {
}

interface ScrollTopProps extends WithStyles<typeof styles> {
  window?: () => Window;
  children: React.ReactElement;
}

const ScrollTop = withStyles(styles)((props: ScrollTopProps) => {
  const { children, window } = props;
  const { classes } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const anchor = ((event.target as HTMLDivElement).ownerDocument || document).querySelector(
      '#root',
    );
    if (anchor) {
      anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.scrollTop}>
        {children}
      </div>
    </Zoom>
  );
});

function Header(props: HeaderProps) {
  const { state, dispatch } = useContext(store);

  const { classes } = props;
  const location = useLocation();

  const logOut = useCallback(() => {
    dispatch(LogOut());
    window.location.href = "/sign_in";
  }, [dispatch]);

  return (
    <>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1" className={classes.headerTitle}>建前なしの就活サイト</Typography>
            </Grid>
            {state.isAuthenticated ?
              <Grid item>
                <Button
                  color="inherit"
                  onClick={logOut}
                >
                  ログアウト
                </Button>
              </Grid>
              : null}
          </Grid>
        </Toolbar>
      </AppBar>
      { state.isAuthenticated ?
        <>
          <AppBar
            component="div"
            className={classes.secondaryBar}
            color="primary"
            position="static"
            elevation={0}
          >
            <Container maxWidth="md">
              <Tabs value={sanitizeRoute(location.pathname)} textColor="inherit">
                {Object.entries(routes).map(([key, item]) => (
                  <Tab textColor="inherit" label={item.label} value={key} href={key} key={key} />
                ))}
              </Tabs>
            </Container>
          </AppBar>

          <ScrollTop {...props}>
            <Fab color="secondary" size="small" aria-label="scroll back to top">
              <KeyboardArrowUpIcon />
            </Fab>
          </ScrollTop>
        </>
        : null}
    </>
  );
}

export default withStyles(styles)(Header);
