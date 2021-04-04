import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
    parentOneNftId: '',
    parentTwoNftId: '',
    isBreeding: false,
    onBreeding: () => { },
    setBurnAmount: () => { },
    setStxpAmount: () => { },
    setParentOneNftId: () => { },
    setParentTwoNftId: () => { },
    burnAmount: '0',
    stxpAmount: '0',
    childName: '',
    setChildName: () => { },
    lpTokenAmount: '0',
    setLpTokenAmount: () => { },
    getBreedingFee: () => '0',
    strainCrafterAddress: '',
    parentsCanBreed: false,
})

export default Context