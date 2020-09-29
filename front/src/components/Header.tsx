
import React, { useCallback, useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";

import { store } from "../store/store";
import {
  LogOut
} from "../store/actions";

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme: Theme) =>
  createStyles({
    secondaryBar: {
      zIndex: 0,
    },
    menuButton: {
      marginLeft: -theme.spacing(1),
    },
    iconButtonAvatar: {
      padding: 4,
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
  });

const routes = {
  "/":
    { label: "マイページ" },
  "/matching":
    { label: "話をしたい" },
  // "/listen":
  //   { label: "みんなの相談" }
};

const sanitizeRoute = (route: string) => route in routes && route;

interface HeaderProps extends WithStyles<typeof styles> {
}

function Header(props: HeaderProps) {
  const { state, dispatch } = useContext(store);

  const { classes } = props;
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = useCallback(() => dispatch(LogOut()), [dispatch]);

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
                <IconButton
                  color="inherit"
                  className={classes.iconButtonAvatar}
                  onClick={handleMenu}
                >
                  <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>プロフィール</MenuItem>
                  <MenuItem onClick={logOut}>ログアウト</MenuItem>
                </Menu>
              </Grid>
              : null}
          </Grid>
        </Toolbar>
      </AppBar>
      { state.isAuthenticated ?
        <AppBar
          component="div"
          className={classes.secondaryBar}
          color="primary"
          position="static"
          elevation={0}
        >
          <Tabs value={sanitizeRoute(location.pathname)} textColor="inherit">
            {Object.entries(routes).map(([key, item]) => (
              <Tab textColor="inherit" label={item.label} value={key} href={key} key={key} />
            ))}
          </Tabs>
        </AppBar>
        : null}
    </>
  );
}

export default withStyles(styles)(Header);
