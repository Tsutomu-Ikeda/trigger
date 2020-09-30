import React from 'react';
import { useContext } from "react";
import { Redirect } from 'react-router-dom';

import { useLocation } from "react-router-dom";

import { store } from "../store/store";

const AuthRequired = ({ children }: { children: JSX.Element }) => {
  const { state } = useContext(store);
  const location = useLocation();

  return state.isAuthenticated
    ? children
    : <Redirect
      to={`/sign_in?redirect_to=${encodeURIComponent(`${location.pathname}${location.search}${location.hash}`)}`}
    />;
}

export default AuthRequired;
