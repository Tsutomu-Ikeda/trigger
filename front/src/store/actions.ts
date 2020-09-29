export enum ActionType {
  LogIn = "auth/log_in",
  LogOut = "auth/log_out",
}

interface ILogIn {
  type: ActionType.LogIn;
}

interface ILogOut {
  type: ActionType.LogOut;
}

export type Actions =
  | ILogIn
  | ILogOut;


export const LogIn = (): ILogIn => ({
  type: ActionType.LogIn,
});

export const LogOut = (): ILogOut => ({
  type: ActionType.LogOut,
});
