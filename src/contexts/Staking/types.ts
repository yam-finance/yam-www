import BigNumber from 'bignumber.js'
import { SingleStake } from 'constants/poolValues';

export interface ContextValues {
  setConfirmTxModalIsOpen: (isOpen: boolean) => void,
  earnedStxpPoolBalance?: BigNumber,
  isHarvesting?: boolean,
  isRedeeming?: boolean,
  isStaking?: boolean,
  isUnstaking?: boolean,
  onHarvest: () => void,
  onRedeem: (amount: string) => void,
  onStake: (duration: string, amount: string) => void,
  onUnstake: (amount: string) => void,
  getIncentivizerAddress: () => string,
  totalStaked?: BigNumber,
  strnTokenAddress: string,
  endTime?: BigNumber,
  withdrawStakeAmount?: BigNumber
  lastExpiringStake?: SingleStake
  userStakes?: SingleStake[]
}