import BigNumber from 'bignumber.js'
import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
  getPoolLPAddress: () => '',
  setConfirmTxModalIsOpen: () => {},
  onHarvest: () => {},
  onRedeem: () => {},
  onStake: () => {},
  onUnstake: () => {},
  getIncentivizerAddress: () => '',
  getEarnedBalances: () => new BigNumber(0),
})

export default Context