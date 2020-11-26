import BigNumber from "bignumber.js";

export interface ContextValues {
  countdown?: number;
  earnedBalance?: BigNumber;
  tvl?: number;
  apr?: number;
  farmingStartTime: number;
  isApproved?: boolean;
  isApproving?: boolean;
  isHarvesting?: boolean;
  isRedeeming?: boolean;
  isStaking?: boolean;
  isUnstaking?: boolean;
  onApprove: () => void;
  onHarvestYAMYUSD: () => void;
  onRedeemYAMYUSD: () => void;
  onStakeYAMYUSD: (amount: string) => void;
  onUnstakeYAMYUSD: (amount: string) => void;
  onHarvestYAMETH: () => void;
  onRedeemYAMETH: () => void;
  onStakeYAMETH: (amount: string) => void;
  onUnstakeYAMETH: (amount: string) => void;
  earnedBalanceYAMYUSD?: BigNumber;
  stakedBalanceYAMYUSD?: BigNumber;
  earnedBalanceYAMETH?: BigNumber;
  stakedBalanceYAMETH?: BigNumber;
}
