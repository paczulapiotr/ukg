import { useContext } from "react";
import { Authorization, authContext } from "./authContext";
import instance from "../../services/api";
import { AuthorizedResponse } from "./types";
import { mapAuthToContext } from "./utility";
import { AuthApi } from "@/services/auth";
import {
  ApiErrorCodes,
  hasErrorCode,
  updateAxiosIntercepters,
} from "@/utility/axios";

type UseAuthResult = {
  auth: Authorization;
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => Promise<void>;
  notAuthorized: () => void;
  refreshToken: (refToken?: string, accessToken?: string) => Promise<void>;
  register: (
    fullName: string,
    username: string,
    password: string,
    repeatPassword: string
  ) => Promise<void>;
};

export type LoginResult =
  | "success"
  | "incorrect_credentials"
  | "internal_error";

export const useAuth = (): UseAuthResult => {
  const { ctx, setCtx } = useContext(authContext);

  const login = async (
    username: string,
    password: string
  ): Promise<LoginResult> => {
    let result: LoginResult = "internal_error";
    let response: AuthorizedResponse | null = null;
    try {
      const { data, status } = await instance.post<AuthorizedResponse>(
        "auth/login",
        {
          username,
          password,
        }
      );

      if (status >= 200 && status < 300) {
        response = data;
        result = "success";
      }
    } catch (err: any) {
      console.log("Error while logging in", err);
      if (err?.response?.status === 401) {
        result = "incorrect_credentials";
      }
    } finally {
      if (result === "success" && response) {
        updateAxiosIntercepters(response.token);
        setAuth(response);
      } else {
        setCtx(() => ({ isAuthorized: false, isLoading: false }));
      }

      return result;
    }
  };

  const logout = async () => {
    try {
      await instance.post("auth/logout");
    } finally {
      updateAxiosIntercepters();
      setCtx(() => ({ isAuthorized: false, isLoading: false }));
    }
  };

  const register = async (
    fullName: string,
    username: string,
    password: string,
    repeatPassword: string
  ) => {
    try {
      await instance.post("auth/register", {
        username,
        fullName,
        password,
        repeatPassword,
      });
    } catch (err: any) {
      if (hasErrorCode(err, ApiErrorCodes.UserAlreadyExists)) {
        throw ApiErrorCodes.UserAlreadyExists;
      } else if (hasErrorCode(err, ApiErrorCodes.PasswordsNotMatching)) {
        throw ApiErrorCodes.PasswordsNotMatching;
      } else if (hasErrorCode(err, ApiErrorCodes.PasswordsFormatIncorrect)) {
        throw ApiErrorCodes.PasswordsFormatIncorrect;
      }

      throw ApiErrorCodes.UserCreationError;
    }
  };

  const refreshToken = async (refToken?: string, accessToken?: string) => {
    try {
      const authorization = await AuthApi.refreshToken(
        refToken ?? ctx.refreshToken?.token,
        accessToken ?? ctx.accessToken?.token
      );
      updateAxiosIntercepters(authorization.accessToken?.token);
      setCtx(() => authorization);
    } catch (err) {
      setCtx(() => ({ isAuthorized: false, isLoading: false }));
    }
  };

  const notAuthorized = () => {
    setCtx((auth) => ({ ...auth, isLoading: false }));
  };

  const setAuth = (response: AuthorizedResponse) => {
    setCtx(() => mapAuthToContext(response));
  };

  return { login, logout, register, refreshToken, auth: ctx, notAuthorized };
};
