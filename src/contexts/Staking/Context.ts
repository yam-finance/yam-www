import BigNumber from 'bignumber.js'
import { createContext } from 'react'
import { ContextValues } from './types'

const Context = createContext<ContextValues>({
  setConfirmTxModalIsOpen: () => { },
  onHarvest: () => { },
  onRedeem: () => { },
  onStake: () => { },
  onUnstake: () => { },
  getIncentivizerAddress: () => '',
  strnTokenAddress: '',
  earnedStxpPoolBalance: new BigNumber(0),
  totalStaked: new BigNumber(0),
  endTime: new BigNumber(0),
  withdrawStakeAmount: new BigNumber(0),
  nextExpiringStake: { amount: new BigNumber(0), lockDate: 0, shares: new BigNumber(0) }
})

export default Context