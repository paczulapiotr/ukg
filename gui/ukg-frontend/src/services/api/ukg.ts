import { instance } from "./instance";

export const list = async (
  pesel?: string,
  name?: string,
  page: number = 1,
  pageSize: number = 10
) => {
  const res = await instance.get("ukg/list", {
    params: { pesel, name, page, pageSize },
  });

  return res;
};

export const add = async () => {
  const res = await instance.post("ukg/add");

  return res;
};

export const get = async (id: string) => {
  const res = await instance.get(`ukg/${id}`);

  return res;
};
