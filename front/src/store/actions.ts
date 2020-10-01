export enum ActionType {
  LogIn = "auth/log_in",
  SaveLogIn = "auth/save_log_in",
  LogOut = "auth/log_out",
}

export interface ILogInPayload {
  email: string;
  password: string;
}

export interface ISaveLogInPayload {
  user: {
    id: string;
  };
}

interface ILogIn {
  type: ActionType.LogIn;
  payload: ILogInPayload;
}

interface ISaveLogIn {
  type: ActionType.SaveLogIn;
  payload: ISaveLogInPayload;
}

interface ILogOut {
  type: ActionType.LogOut;
}

export type Actions = ILogIn | ISaveLogIn | ILogOut;

export const LogIn = (payload: ILogInPayload): ILogIn => ({
  type: ActionType.LogIn,
  payload
});

export const SaveLogIn = (payload: ISaveLogInPayload): ISaveLogIn => ({
  type: ActionType.SaveLogIn,
  payload,
});

export const LogOut = (): ILogOut => ({
  type: ActionType.LogOut,
});
