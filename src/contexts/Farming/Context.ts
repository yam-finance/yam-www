import { createContext } from "react";

import { ContextValues } from "./types";

const Context = createContext<ContextValues>({
  farmingStartTime: 1600545500000,
  onApprove: () => {},
  onHarvestYAMYUSD: () => {},
  onRedeemYAMYUSD: () => {},
  onStakeYAMYUSD: () => {},
  onUnstakeYAMYUSD: () => {},
  onHarvestYAMETH: () => {},
  onRedeemYAMETH: () => {},
  onStakeYAMETH: () => {},
  onUnstakeYAMETH: () => {},
});

export default Context;
