import { createContext } from "react";

import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
  isDelegated: false,
  onVote: () => {},
  onRegister: () => {},
  onDelegateStaked: () => {},
  onDelegateUnstaked: () => {},
  onRemoveDelegation: () => {},
});

export default Context;
