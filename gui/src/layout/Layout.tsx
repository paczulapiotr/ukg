import React from "react";
import { useAuth } from "../auth/AuthProvider/useAuth";
import { AuthorizedLayout } from "./AuthorizedLayout";
import UnauthorizedLayout from "./UnauthorizedLayout/UnauthorizedLayout";
import LoadingPage from "@/pages/common/LoadingPage";

const MainLayout: React.FC = () => {
  const { auth } = useAuth();
  const { isAuthorized, isLoading } = auth;

  return isLoading ? (
    <LoadingPage />
  ) : isAuthorized ? (
    <AuthorizedLayout />
  ) : (
    <UnauthorizedLayout />
  );
};

export default MainLayout;
