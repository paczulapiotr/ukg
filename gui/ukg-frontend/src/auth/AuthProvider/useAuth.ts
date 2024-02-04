import { useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { Authorization, authContext } from "./authContext";
import instance from "../../services/api";

type UseAuthResult = {
  auth: Authorization;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
};

type AuthorizedResponse = {
  token: string;
  refreshToken: string;
  tokenExpiration: string;
  refreshTokenExpiration: string;
};

type JwtPayload = {
  sub: string;
  username: string;
  name: string;
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
      setCtx(() => ({ isAuthorized: false }));
    }
  };

  const logout = async () => {
    const { status } = await instance.post("auth/logout");
    if (status === 200) {
      setCtx(() => ({ isAuthorized: false }));
    }
  };

  const refreshToken = async () => {
    try {
      const { status, data } = await instance.post<AuthorizedResponse>(
        "auth/refresh-token",
        {
          refreshToken: ctx.refreshToken?.token,
        }
      );
      if (status !== 200) throw new Error("Failed to refresh token");

      setAuth(data);
    } catch (err) {
      console.log("Error while refreshing token:", err);
    }
  };

  const setAuth = (response: AuthorizedResponse) => {
    const { token, refreshToken, tokenExpiration, refreshTokenExpiration } =
      response;
    const jwt = jwtDecode<JwtPayload>(token);

    setCtx(() => ({
      isAuthorized: true,
      accessToken: { expiration: tokenExpiration, token },
      refreshToken: {
        expiration: refreshTokenExpiration,
        token: refreshToken,
      },
      user: { id: jwt.sub, fullName: jwt.name, username: jwt.username },
    }));
  };

  return { login, logout, refreshToken, auth: ctx };
};
