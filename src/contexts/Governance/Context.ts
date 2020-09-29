import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
  onVote: () => {},
})

export default Context
