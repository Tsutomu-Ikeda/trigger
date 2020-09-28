
import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
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
  });

interface HeaderProps extends WithStyles<typeof styles> {
  onDrawerToggle: () => void;
}

function Header(props: HeaderProps) {
  const { classes, onDrawerToggle } = props;
  const location = useLocation();

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                建前なしの就活サイト
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Hidden smUp>
              <Grid item>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={onDrawerToggle}
                  className={classes.menuButton}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
            </Hidden>
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
          <Tab textColor="inherit" label="トップ" value="/" href="/" />
          <Tab textColor="inherit" label="マッチング" value="/matching" href="/matching" />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

export default withStyles(styles)(Header);
