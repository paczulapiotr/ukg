import { jwtDecode } from "jwt-decode";
import { AuthorizedResponse } from "./types";
import { Authorization } from "./authContext";

export type JwtPayload = {
  sub: string;
  username: string;
  name: string;
};

export const mapAuthToContext = (
  response: AuthorizedResponse
): Authorization => {
  const { token, refreshToken, tokenExpiration, refreshTokenExpiration } =
    response;
  const jwt = jwtDecode<JwtPayload>(token);

  return {
    isLoading: false,
    isAuthorized: true,
    accessToken: { expiration: tokenExpiration, token },
    refreshToken: {
      expiration: refreshTokenExpiration,
      token: refreshToken,
    },
    user: { id: jwt.sub, fullName: jwt.name, username: jwt.username },
  };
};
