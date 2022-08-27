import { createContext } from "react";
import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
  isDelegatedToken: false,
  isDelegatedLP: false,
  onVote: () => {},
  onRegister: () => {},
  onUnregister: () => {},
  onDelegateToken: () => {},
  onDelegateLP: () => {},
  onRemoveTokenDelegation: () => {},
  onRemoveLPDelegation: () => {},
});

export default Context;
