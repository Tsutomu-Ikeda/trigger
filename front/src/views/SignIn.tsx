import React, {
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { store } from "store/store";
import {
  LogIn,
} from "store/actions";
import { useQuery } from "libs/Url";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      width: '100%',
      margin: "10px 0",
      paddingBottom: 0,
      fontWeight: 500
    },
  }),
);

export default function SignIn() {
  const classes = useStyles();
  const {
    state, dispatch
  } = useContext(store);
  const query = useQuery();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logIn = useCallback(
    (email, password) => {
      dispatch(LogIn({ email, password }));
    }, [dispatch]);

  const onSubmitButtonClicked = (e: FormEvent) => {
    e.preventDefault();
    logIn(email, password);
  };

  useEffect(() => {
    if (state.isAuthenticated)
      window.location.href = query.get("redirect_to") || "/";
  }, [state.isAuthenticated, query])

  return state.isAuthenticated ? <Redirect to={query.get("redirect_to") || "/"} /> : <>
    <Typography color="inherit" variant="h5" component="h2">
      ログイン画面
        </Typography>
    <form onSubmit={onSubmitButtonClicked}>
      <TextField
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        variant="outlined"
        className={classes.textField}
      />
      <TextField
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        variant="outlined"
        className={classes.textField}
      />
      <button
        type="submit"
        onClick={onSubmitButtonClicked}
        style={{ margin: "10px 0", float: "right" }}
      >
        ログイン
        </button>
    </form>
  </>;
}
