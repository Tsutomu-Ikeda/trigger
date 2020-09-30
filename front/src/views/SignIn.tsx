import React, { useCallback, useContext } from "react";
import Typography from "@material-ui/core/Typography";

import { store } from "../store/store";
import {
  LogIn,
} from "../store/actions";
import { useQuery } from "../libs/Url";

export default function SignIn() {
  const {
    dispatch
  } = useContext(store);
  const query = useQuery();

  const logIn = useCallback(
    () => {
      dispatch(LogIn());
      window.location.href = query.get("redirect_to") || "/";
    }, [dispatch, query]);

  return (
    <div>
      <Typography color="inherit" variant="h5" component="h2">
        ログイン画面
     </Typography>

      <button type="button" onClick={logIn}>
        ログイン
      </button>
    </div>
  );
}
