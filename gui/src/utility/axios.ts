import instance from "@/services/api";

export const hasErrorCode = (error: any, code: string) => {
  const errors = error?.response?.data?.errors;
  if (Array.isArray(errors) && errors.includes(code)) {
    return true;
  }

  return false;
};

export const ApiErrorCodes = {
  // Auth codes
  UserAlreadyExists: "UserAlreadyExists",
  PasswordsNotMatching: "PasswordsNotMatching",
  PasswordsFormatIncorrect: "PasswordsFormatIncorrect",
  UserCreationError: "UserCreationError",
  PasswordUpdateError: "PasswordUpdateError",

  // Pesel codes
  PeselUniquenessErrorCode: "PeselUniquenessErrorCode",
};

export const updateAxiosIntercepters = (accessToken?: string) => {
  instance.interceptors.request.clear();
  instance.interceptors.request.use(
    (config) => {
      if (accessToken != null) {
        config.headers.Authorization = accessToken
          ? `Bearer ${accessToken}`
          : undefined;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};
