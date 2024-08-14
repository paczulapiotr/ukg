import useGetApiStatus from "@/queries/useGetStatus";
import { PropsWithChildren, useEffect } from "react";
import { useAuth } from "./useAuth";
import { updateAxiosIntercepters } from "@/utility/axios";
import { Authorization } from "./authContext";

const localStorageKey = "auth";
type Props = PropsWithChildren;

const AuthLogic = ({ children }: Props) => {
  const { data: status } = useGetApiStatus();
  const { auth, refreshToken, notAuthorized } = useAuth();

  useEffect(() => {
    updateAxiosIntercepters(auth.accessToken?.token);
  }, [auth.accessToken?.token]);

  useEffect(() => {
    if (status?.version == null) return;

    const savedContextString = localStorage.getItem(localStorageKey);
    if (savedContextString != null) {
      var savedAuth = JSON.parse(savedContextString) as Authorization;
      refreshToken(savedAuth.refreshToken?.token, savedAuth.accessToken?.token);
    } else {
      notAuthorized();
    }
  }, [status?.version]);

  // handle refreshing token
  useEffect(() => {
    const interval = setInterval(() => {
      const expiration = auth.accessToken?.expiration;
      if (expiration) {
        const currentTime = new Date().getTime() / 1000;
        const expirationTime = new Date(expiration).getTime() / 1000;
        if (expirationTime - currentTime < 50) {
          refreshToken(auth.refreshToken?.token);
        }
      }
    }, 15_000);

    return () => {
      clearInterval(interval);
    };
  }, [auth.refreshToken?.token, auth.accessToken?.expiration]);

  useEffect(() => {
    if (auth.isAuthorized) {
      localStorage.setItem(localStorageKey, JSON.stringify(auth));
    } else if (auth.isAuthorized === false && auth.isLoading === false) {
      localStorage.removeItem(localStorageKey);
    }
  }, [auth]);

  return children;
};

export default AuthLogic;
