import BigNumber from 'bignumber.js'

export interface Proposal {
  description?: string,
  state?: string,
  id: number,
  targets: string[],
  signatures: string[],
  inputs: string[][],
  forVotes: number,
  againstVotes: number,
  start?: number,
  end?: number,
  hash: string,
  more?: string
}


export interface ContextValues {
  proposals?: Proposal[],
  onVote: (proposal: number, side: boolean) => void,
}
