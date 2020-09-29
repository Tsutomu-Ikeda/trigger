import React, { useCallback, useContext } from "react";

import { store } from "../store/store";
import {
  LogIn,
} from "../store/actions";
import { useQuery } from "../components/Url";

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
      <button type="button" onClick={logIn}>
        ログイン
      </button>
    </div>
  );
}
