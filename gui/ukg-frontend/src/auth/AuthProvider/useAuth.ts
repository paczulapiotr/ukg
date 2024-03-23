import { useContext } from "react";
import { Authorization, authContext } from "./authContext";
import instance from "../../services/api";
import { AuthorizedResponse } from "./types";
import { mapAuthToContext } from "./utility";

type UseAuthResult = {
  auth: Authorization;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuth = (): UseAuthResult => {
  const { ctx, setCtx } = useContext(authContext);

  const login = async (username: string, password: string) => {
    try {
      const { data, status } = await instance.post<AuthorizedResponse>(
        "auth/login",
        {
          username,
          password,
        }
      );
      if (status !== 200)
        throw new Error(`Error while logging in with status ${status}`);
      setAuth(data);
    } catch (err) {
      console.log("Error while logging in", err);
      setCtx(() => ({ isAuthorized: false, isLoading: false }));
    }
  };

  const logout = async () => {
    const { status } = await instance.post("auth/logout");
    if (status >= 200 && status < 300) {
      setCtx(() => ({ isAuthorized: false, isLoading: false }));
    }
  };

  const setAuth = (response: AuthorizedResponse) => {
    setCtx(() => mapAuthToContext(response));
  };

  return { login, logout, auth: ctx };
};
