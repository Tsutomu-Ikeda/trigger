
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import {
  useLocation
} from "react-router-dom";

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
        fontSize: '1.1em'
      }
    },
  });

const routes = [{
  path: "/",
  label: "マイページ",
}, {
  path: "/matching",
  label: "話をしたい",
}, {
  path: "/listen",
  label: "みんなの相談",
}, {
  path: "/money",
  label: "収益",
}];

interface HeaderProps extends WithStyles<typeof styles> {
}

function Header(props: HeaderProps) {
  const { classes } = props;
  const location = useLocation();
  return (
    <>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1" className={classes.headerTitle}>建前なしの就活サイト</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs />
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" className={classes.iconButtonAvatar}>
                <Avatar src="/static/images/avatar/1.jpg" alt="My Avatar" />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={location.pathname} textColor="inherit">
          {routes.map((item) => (
            <Tab textColor="inherit" label={item.label} value={item.path} href={item.path} key={item.path} />
          ))}
        </Tabs>
      </AppBar>
    </>
  );
}

export default withStyles(styles)(Header);
