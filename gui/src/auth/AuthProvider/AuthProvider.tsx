import { PropsWithChildren, useState } from "react";
import { Authorization, authContext, defaultValue } from "./authContext";
import AuthLogic from "./AuthLogic";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [ctx, setCtx] = useState<Authorization>(defaultValue.ctx);

  return (
    <authContext.Provider value={{ ctx, setCtx }}>
      <AuthLogic>{children}</AuthLogic>
    </authContext.Provider>
  );
};

export default AuthProvider;
