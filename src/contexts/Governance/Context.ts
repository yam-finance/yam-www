import { createContext } from "react";

import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
  onVote: () => {},
  onRegister: () => {},
  onDelegateStaked: () => {},
  onDelegateUnstaked: () => {},
  onUndelegate: () => {}
});

export default Context;
