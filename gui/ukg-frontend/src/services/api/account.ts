import { instance } from "./instance";

export const login = async (username: string, password: string) => {
  const res = await instance.post("account/login", { username, password });

  return res;
};

export const logout = async () => {
  const res = await instance.post("account/logout");

  return res;
};

export const info = async () => {
  const res = await instance.get("account");

  return res;
};
