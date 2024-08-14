import { AuthorizedResponse } from "@/auth/AuthProvider/types";
import instance from "./api";
import { mapAuthToContext } from "@/auth/AuthProvider/utility";
import { Authorization } from "@/auth/AuthProvider/authContext";

const failedAuthResponse: Authorization = {
  isAuthorized: false,
  isLoading: false,
};

const refreshToken = async (
  refToken: string | undefined,
  accessToken: string | undefined
): Promise<Authorization> => {
  if (refToken == null) return failedAuthResponse;

  try {
    const { status, data } = await instance.post<AuthorizedResponse>(
      "auth/refresh-token",
      {
        refreshToken: refToken,
        accessToken,
      }
    );
    if (status !== 200) throw new Error("Failed to refresh token");
    return mapAuthToContext(data);
  } catch (err) {
    return failedAuthResponse;
  }
};

export const AuthApi = {
  refreshToken,
};
