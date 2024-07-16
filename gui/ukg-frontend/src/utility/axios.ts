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
