import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
    strainNftCollection: [],
    isCreating: false,
    isDestroying: false,
    isLoading: false,
    onCreateNft: () => { },
    onDestroyNft: () => { },
    onRetrieve: () => Promise.resolve({ nftId: '' }),
    setConfirmTxModalIsOpen: () => { },
})

export default Context