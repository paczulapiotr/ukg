import { AuthorizedResponse } from "@/auth/AuthProvider/types";
import instance from "./api";
import { mapAuthToContext } from "@/auth/AuthProvider/utility";
import { Authorization } from "@/auth/AuthProvider/authContext";

const refreshToken = async (refToken?: string): Promise<Authorization> => {
  try {
    const { status, data } = await instance.post<AuthorizedResponse>(
      "auth/refresh-token",
      {
        refreshToken: refToken,
      }
    );
    if (status !== 200) throw new Error("Failed to refresh token");
    return mapAuthToContext(data);
  } catch (err) {
    throw err;
  }
};

export const AuthApi = {
  refreshToken,
};
