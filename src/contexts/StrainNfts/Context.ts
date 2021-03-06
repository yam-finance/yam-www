import BigNumber from 'bignumber.js'
import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
    strainNftCollection: [],
    isCreating: false,
    isAdding: false,
    isLoading: false,
    isHarvesting: false,
    onCreateNft: () => { },
    onAddNftStake: () => { },
    onDestroyNft: () => { },
    onRetrieve: () => Promise.resolve({ nftId: '' }),
    onHarvest: () => { },
    setConfirmTxModalIsOpen: () => { },
    earnedStrnBalance: new BigNumber(0),
    strnEthLpPoolBalance: new BigNumber(0),
    strnXiotLpPoolBalance: new BigNumber(0),
    findNftById: (nftId) => undefined,
})

export default Context