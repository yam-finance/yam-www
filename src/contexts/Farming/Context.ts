import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
  strnEthPoolAddress: '',
  getPoolLPAddress: () => '',
  setConfirmTxModalIsOpen: () => {},
  onHarvest: () => {},
  onRedeem: () => {},
  onStake: () => {},
  onUnstake: () => {}
})

export default Context