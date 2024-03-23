import { createContext } from "react";

export type Token = {
  token: string;
  expiration: string;
};

export type AuthorizedUser = {
  id: string;
  username: string;
  fullName: string;
};

export type Authorization = {
  isLoading: boolean;
  isAuthorized: boolean;
  user?: AuthorizedUser;
  accessToken?: Token;
  refreshToken?: Token;
};

export type AuthContext = {
  ctx: Authorization;
  setCtx: (set: (ctx: Authorization) => Authorization) => void;
};

export const defaultValue: AuthContext = {
  ctx: { isAuthorized: false, isLoading: true },
  setCtx: () => {},
};

export const authContext = createContext<AuthContext>(defaultValue);
