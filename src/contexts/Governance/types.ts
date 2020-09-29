import BigNumber from 'bignumber.js'

export interface Proposal {
  description?: string,
  state?: string,
  id: number,
  start?: number,
  end?: number,
  hash: string
}


export interface ContextValues {
  proposals?: Proposal[],
  onVote: (proposal: number, side: boolean) => void,
}
