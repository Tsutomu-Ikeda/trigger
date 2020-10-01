import React, { createContext, useEffect } from "react";
import { useReducerAsync } from "use-reducer-async";

import { signIn } from "libs/ServerClient";
import {
  Actions,
  ActionType,
  SaveLogIn
} from "./actions";

interface IStoreState {
  isAuthenticated: boolean;
  user?: {
    id: string;
  };
}

interface IAppContext {
  state: IStoreState;
  dispatch: React.Dispatch<Actions>;
}

const localState = (
  (value: string | null) => (value && JSON.parse(value) as IStoreState)
)(localStorage.getItem("state"));

const initialState: IStoreState = localState || {
  isAuthenticated: false,

};

const store = createContext<IAppContext>({
  state: initialState,
  dispatch: () => null
});

const { Provider } = store;

const reducer = (state: IStoreState, action: Actions) => {
  switch (action.type) {
    case ActionType.SaveLogIn:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case ActionType.LogOut:
      return {
        ...state,
        isAuthenticated: false,
        user: undefined,
      };
    default:
      return state;
  }
};

const asyncActionHandlers = {
  "auth/log_in": ({ dispatch }: { dispatch: React.Dispatch<Actions> }) => async (action: any) => {
    const { email, password } = action.payload;

    dispatch(SaveLogIn({ user: await signIn(email, password)}));
  },
};

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducerAsync(reducer, initialState, asyncActionHandlers);

  useStoreSideEffect(state, dispatch);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

const useStoreSideEffect = (
  state: IStoreState,
  dispatch: React.Dispatch<Actions>
) => {
  // fetch(`https://api.magicthegathering.io/v1/cards/${state.id}`)
  //   .then(async (res) => {
  //     const data: { card: ICardDetails } = await res.json();
  //     dispatch(SetCardDetails(data.card));
  //   })
  //   .catch((err) => {
  //     // do some error handling!
  //     console.error(`Failed to load card with ID: ${state.id}`);
  //   });
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(state));
  }, [state]);
};

export { store, AppProvider };
