import React, { createContext, useReducer, useEffect } from "react";

import { Actions, ActionType } from "./actions";

interface IStoreState {
  isAuthenticated: boolean;
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
    case ActionType.LogIn:
      return {
        ...state,
        isAuthenticated: true
      };
    case ActionType.LogOut:
      return {
        ...state,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

const AppProvider = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
