import React from "react";
import { useAuth } from "../auth/AuthProvider/useAuth";
import { AuthorizedLayout } from "./AuthorizedLayout";
import UnauthorizedLayout from "./UnauthorizedLayout/UnauthorizedLayout";

const MainLayout: React.FC = () => {
  const {
    auth: { isAuthorized, isLoading },
  } = useAuth();

  return isLoading ? (
    <p>{"Ładowanie..."}</p>
  ) : isAuthorized ? (
    <AuthorizedLayout />
  ) : (
    <UnauthorizedLayout />
  );
};

export default MainLayout;
