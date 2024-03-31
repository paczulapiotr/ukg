import { PropsWithChildren, useEffect, useState } from "react";
import { Authorization, authContext, defaultValue } from "./authContext";
import instance from "../../services/api";
import { AuthorizedResponse } from "./types";
import { mapAuthToContext } from "./utility";

const localStorageKey = "auth";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [ctx, setCtx] = useState<Authorization>(defaultValue.ctx);
  console.log("Auth ctx", ctx);
  useEffect(() => {
    instance.interceptors.request.clear();
    instance.interceptors.request.use(
      (config) => {
        const token = ctx.accessToken?.token;
        config.headers.Authorization = token ? `Bearer ${token}` : undefined;

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, [ctx.accessToken?.token]);

  // handle refreshing token
  useEffect(() => {
    const interval = setInterval(() => {
      const expiration = ctx.accessToken?.expiration;
      if (expiration) {
        const currentTime = new Date().getTime() / 1000;
        const expirationTime = new Date(expiration).getTime() / 1000;
        if (expirationTime - currentTime < 50) {
          refreshToken(ctx.refreshToken?.token).catch((err) =>
            console.error("Error while refreshing token", err)
          );
        }
      }
    }, 15_000);

    return () => {
      clearInterval(interval);
    };
  }, [ctx.refreshToken?.token, ctx.accessToken?.expiration]);

  useEffect(() => {
    const savedContextString = localStorage.getItem(localStorageKey);
    if (savedContextString != null) {
      var savedCtx = JSON.parse(savedContextString) as Authorization;
      setCtx(savedCtx);
    } else {
      setCtx((ctx) => ({ ...ctx, isLoading: false }));
    }
  }, []);

  useEffect(() => {
    if (ctx.isAuthorized) {
      localStorage.setItem(localStorageKey, JSON.stringify(ctx));
    } else if (ctx.isAuthorized === false && ctx.isLoading === false) {
      localStorage.removeItem(localStorageKey);
    }
  }, [ctx]);

  const refreshToken = async (refToken?: string) => {
    try {
      const { status, data } = await instance.post<AuthorizedResponse>(
        "auth/refresh-token",
        {
          refreshToken: refToken,
        }
      );
      if (status !== 200) throw new Error("Failed to refresh token");
      setCtx(mapAuthToContext(data));
    } catch (err) {
      console.log("Error while refreshing token:", err);
    }
  };

  return (
    <authContext.Provider value={{ ctx, setCtx }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
