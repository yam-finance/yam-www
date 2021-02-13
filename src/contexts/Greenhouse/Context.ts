import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
    parentOneNftId: '',
    parentTwoNftId: '',
    isBreeding: false,
    onBreeding: () => { },
    setBurnAmount: () => { },
    setParentOneNftId: () => { },
    setParentTwoNftId: () => { },
    burnAmount: '0',
})

export default Context