import BigNumber from 'bignumber.js'

export interface Proposal {
  description?: string,
  state?: string,
  start?: number,
  end?: number
}


export interface ContextValues {
  proposals?: Proposal[]
}
