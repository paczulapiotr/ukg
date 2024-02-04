import { PropsWithChildren, useEffect, useState } from "react";
import { Authorization, authContext, defaultValue } from "./authContext";
import instance from "../../services/api";

type Props = {};

const AuthProvider = ({ children }: PropsWithChildren<Props>) => {
  const [ctx, setCtx] = useState<Authorization>(defaultValue.ctx);
  console.log("Auth ctx", ctx);
  useEffect(() => {
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

  return (
    <authContext.Provider value={{ ctx, setCtx }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
