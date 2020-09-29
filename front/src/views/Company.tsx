import React from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import AuthRequired from "../components/AuthRequired";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  }),
);

export default function Company() {
  const classes = useStyles();

  return (
    <AuthRequired>
      <>
        企業検索ページ
        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="企業名で検索する"
            inputProps={{ 'aria-label': 'search companies' }}
          />
          <IconButton type="submit" className={classes.iconButton} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </>
    </AuthRequired>
  );
}
